import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'firebase/firestore';
import { LogService } from './log.service';

export interface FirebaseUser {
    email: string;
}

export interface User {
    id: string;
    bestScore: number;
    email: string;
}

export type VisitStatus = 'active' | 'complete';

export interface Visit {
    id?: string;
    dayResults: {
        date: string;
        result: number;
    }[];
    goalSet: string;
    salesTrend: number;
    status: VisitStatus;
    userId: string;
    visitDate: string;
    visitType: string;
    note: string;
}

@Injectable()
export class FirebaseService {
    private static readonly FIREBASE_CREDENTIALS = {
        apiKey: 'AIzaSyCaDyAh0QyfEOmcBfVA_lQio8qlDsQxbNI',
        authDomain: 'dmit-visit-tracker.firebaseapp.com',
        databaseURL: 'https://dmit-visit-tracker.firebaseio.com',
        projectId: 'dmit-visit-tracker',
        storageBucket: 'dmit-visit-tracker.appspot.com',
        messagingSenderId: '648342855448'
    };

    private _user: User | null = null;
    private _activeVisit: Visit | undefined;
    private _visitHistory: Visit[] | undefined;
    private _visitTypes: { displayText: string }[] = [];
    private _resultsBoardLastUpdated: string = new Date().toLocaleTimeString();

    constructor() {
        try {
            firebase.initializeApp(FirebaseService.FIREBASE_CREDENTIALS);
            firebase
                .firestore()
                .collection('visitType')
                .get()
                .then(typeDocs => {
                    typeDocs.forEach(typeDoc => {
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
                success => {
                    userSubject.next(true);
                },
                error => {
                    userSubject.next(false);
                }
            );
        return userSubject;
    }

    public createUser(email: string, password: string): Observable<boolean> {
        const successSubject: Subject<boolean> = new Subject();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(
                success => {
                    successSubject.next(true);
                    firebase
                        .firestore()
                        .doc(`users/${email}`)
                        .set({
                            email,
                            bestScore: 0
                        });
                    this._user = {
                        id: email,
                        email,
                        bestScore: 0
                    };
                },
                error => {
                    successSubject.next(false);
                }
            );
        return successSubject;
    }

    public createVisit(visit: Visit): Observable<boolean> {
        const newVisitSubject: Subject<boolean> = new Subject();
        firebase
            .firestore()
            .collection('visits')
            .add(visit)
            .then(newVisit => {
                newVisitSubject.next(true);
            });
        return newVisitSubject;
    }

    public getActiveVisit(userId: string): Observable<Visit | undefined> {
        const visitsSubject: Subject<Visit> = new Subject();
        firebase
            .firestore()
            .collection('visits')
            .where('userId', '==', userId)
            .get()
            .then(visitsSnapshot => {
                const activeVisit = visitsSnapshot.docs.find(
                    doc => doc.data().status === 'active'
                );
                this._activeVisit =
                    activeVisit !== undefined
                        ? ({ ...activeVisit.data(), id: activeVisit.id } as Visit)
                        : undefined;
                visitsSubject.next(
                    activeVisit !== undefined ? (activeVisit.data() as Visit) : undefined
                );
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
            .onSnapshot(usersSnapshot => {
                this._resultsBoardLastUpdated = new Date().toLocaleTimeString();
                const resultsBoard = usersSnapshot.docs.map(userDoc => {
                    return {
                        user: userDoc.id,
                        score: userDoc.data().bestScore
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
            .then(users => {
                userSubject.next({
                    id: users.docs[0].id,
                    ...(users.docs[0].data() as User)
                });
                this.initVisitsListener();
            });
        return userSubject;
    }

    public initVisitsListener(): void {
        const visits = firebase
            .firestore()
            .collection('visits')
            .where('userId', '==', this._user.id);
        visits.get().then(visits => {
            this._visitHistory = [];
            visits.docs.forEach(visit => {
                if (visit.data().status === 'complete') {
                    this._visitHistory.push(visit.data() as Visit);
                }
            });
        });
        visits.onSnapshot(visits => {
            this._visitHistory = [];
            visits.docs.forEach(doc => {
                if (doc.data().status === 'complete') {
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
        firebase
            .firestore()
            .collection('visits')
            .doc(visit.id)
            .set(visit)
            .then(() => {
                this._activeVisit = visit.status === 'complete' ? undefined : visit;
                successSubject.next(true);
            })
            .catch(error => successSubject.next(false));
        return successSubject;
    }
}
