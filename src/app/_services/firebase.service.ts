import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'firebase/firestore';
import { LogService } from './log.service';
import { HttpClient } from '@angular/common/http';

export interface FirebaseUser {
    email: string;
}

export interface User {
    id: string;
    bestScore: number;
    email: string;
    firstName: string;
    lastName: string;
    admin?: boolean;
}

export interface DayResult {
    date: string;
    result: string | null;
}

export type VisitStatus = 'active' | 'closed' | 'complete';

export interface Visit {
    id?: string;
    dayResults: DayResult[];
    goalSet: string;
    salesTrend: string;
    status: VisitStatus;
    userId: string;
    userName: string;
    visitDate: string;
    visitType: string;
    note: string;
    store: string | null;
}

@Injectable()
export class FirebaseService {
    private static readonly FIREBASE_CREDENTIALS = {
        apiKey: 'AIzaSyCaDyAh0QyfEOmcBfVA_lQio8qlDsQxbNI',
        authDomain: 'dmit-visit-tracker.firebaseapp.com',
        databaseURL: 'https://dmit-visit-tracker.firebaseio.com',
        projectId: 'dmit-visit-tracker',
        storageBucket: 'dmit-visit-tracker.appspot.com',
        messagingSenderId: '648342855448',
    };

    private _user: User | null = null;
    private _activeVisit: Visit | undefined;
    private _visitHistory: Visit[] | undefined;
    private _visitTypes: { displayText: string }[] = [];
    private _resultsBoardLastUpdated: string = new Date().toLocaleTimeString();

    constructor(private httpClient: HttpClient) {
        try {
            firebase.initializeApp(FirebaseService.FIREBASE_CREDENTIALS);
            firebase
                .firestore()
                .collection('visitType')
                .get()
                .then((typeDocs) => {
                    typeDocs.forEach((typeDoc) => {
                        this._visitTypes.push(typeDoc.data() as { displayText: string });
                    });
                });
        } catch (error) {
            throw error;
        }
    }

    public set user(user: User) {
        this._user = user;
    }

    public authenticateUser(email, password): Observable<boolean> {
        const userSubject: Subject<boolean> = new Subject();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
                (success) => {
                    userSubject.next(true);
                },
                (error) => {
                    userSubject.next(false);
                },
            );
        return userSubject;
    }

    public clearUserData(): void {
        this.user = null;
        this._activeVisit = undefined;
        this._visitHistory = undefined;
    }

    public createUser(
        email: string,
        password: string,
        username: { firstName: string; lastName: string },
    ): Observable<boolean> {
        const successSubject: Subject<boolean> = new Subject();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(
                (success) => {
                    successSubject.next(true);
                    successSubject.complete();
                    firebase
                        .firestore()
                        .doc(`users/${email}`)
                        .set({
                            email,
                            bestScore: 0,
                            firstName: username.firstName,
                            lastName: username.lastName,
                        });
                    this._user = {
                        id: email,
                        email,
                        firstName: username.firstName,
                        lastName: username.lastName,
                        bestScore: 0,
                    };
                },
                (error) => {
                    successSubject.next(false);
                    successSubject.complete();
                },
            );
        return successSubject;
    }

    public createVisit(visit: Visit): Observable<boolean> {
        visit.userName = `${this._user.firstName} ${this._user.lastName}`;
        visit.goalSet = removeNonDecimalChars(visit.goalSet);
        visit.salesTrend = removeNonDecimalChars(visit.salesTrend);
        const newVisitSubject: Subject<boolean> = new Subject();
        firebase
            .firestore()
            .collection('visits')
            .add(visit)
            .then((newVisit) => {
                newVisitSubject.next(true);
            });
        return newVisitSubject;
    }

    public emailAdminBasicReport(): Observable<boolean> {
        const successSubject: Subject<boolean> = new Subject();
        this.httpClient
            .get(
                `https://us-central1-dmit-visit-tracker.cloudfunctions.net/sendAdminBasicReportAsCSV?email=${
                    this._user.id
                }`,
            )
            .subscribe(
                (response) => {
                    LogService.log(FirebaseService.name, response);
                    successSubject.next(true);
                },
                (error) => {
                    LogService.log(FirebaseService.name, error);
                    successSubject.next(false);
                },
            );
        return successSubject;
    }

    public getActiveVisit(userId: string): Observable<Visit | undefined> {
        const visitsSubject: BehaviorSubject<
            Visit | null | undefined
        > = new BehaviorSubject(!!this._activeVisit ? this._activeVisit : null);
        firebase
            .firestore()
            .collection('visits')
            .where('userId', '==', userId)
            .onSnapshot((visitsSnapshot) => {
                const visitDoc = visitsSnapshot.docs.find(
                    (doc) => doc.data().status === 'active',
                );
                const _activeVisit = !!visitDoc
                    ? { id: visitDoc.id, ...visitDoc.data() }
                    : undefined;

                visitsSubject.next(_activeVisit as Visit);
                this._activeVisit = _activeVisit as Visit;
            });
        return visitsSubject;
    }

    public getResultsBoard(): Observable<{ user: string; score: number }[]> {
        const resultBoardSubject: Subject<
            { user: string; score: number }[]
        > = new Subject();
        firebase
            .firestore()
            .collection('users')
            .orderBy('bestScore', 'desc')
            .onSnapshot((usersSnapshot) => {
                this._resultsBoardLastUpdated = new Date().toLocaleTimeString();
                const resultsBoard = usersSnapshot.docs.map((userDoc) => {
                    return {
                        user: userDoc.data().firstName + ' ' + userDoc.data().lastName,
                        score: userDoc.data().bestScore,
                    };
                });
                resultBoardSubject.next(resultsBoard);
            });
        return resultBoardSubject;
    }

    public getUserProfile(email: string): Observable<User> {
        const userSubject: Subject<User> = new Subject();
        firebase
            .firestore()
            .collection('users')
            .where('email', '==', email)
            .get()
            .then((users) => {
                userSubject.next({
                    id: users.docs[0].id,
                    ...(users.docs[0].data() as User),
                });
                this.initVisitsListener();
            });
        return userSubject;
    }

    public initVisitsListener(): void {
        firebase
            .firestore()
            .collection('visits')
            .where('userId', '==', this._user.id)
            .orderBy('visitDate', 'desc')
            .onSnapshot((visits) => {
                this._visitHistory = [];
                visits.docs.forEach((doc) => {
                    if (
                        doc.data().status === 'complete' ||
                        doc.data().status === 'closed'
                    ) {
                        this._visitHistory.push(doc.data() as Visit);
                    }
                });
            });
    }

    public readActiveVisit(): Visit | undefined {
        return this._activeVisit;
    }

    public readResultsBoardLastUpdated(): string {
        return this._resultsBoardLastUpdated;
    }

    public readUserProfile(): User {
        return this._user;
    }

    public readVisitHistory(): Visit[] | undefined {
        return this._visitHistory;
    }

    public readVisitTypes(): { displayText: string }[] {
        return this._visitTypes;
    }

    public updateActiveVisit(visit: Visit): Observable<boolean> {
        const successSubject: Subject<boolean> = new Subject();
        visit.dayResults = visit.dayResults.map((result) => {
            return { date: result.date, result: removeNonDecimalChars(result.result) };
        });
        firebase
            .firestore()
            .collection('visits')
            .doc(visit.id)
            .set(visit)
            .then(() => {
                this._activeVisit =
                    visit.status === 'complete' || visit.status === 'closed'
                        ? undefined
                        : visit;
                successSubject.next(true);
            })
            .catch((error) => successSubject.next(false));
        return successSubject;
    }
}

function removeNonDecimalChars(value: string): string | null {
    return typeof value === 'string' ? value.replace(/[^0-9.-]/g, '') : null;
}
