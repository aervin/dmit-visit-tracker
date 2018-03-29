import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService, Visit } from '../../app/_services/firebase.service';
import { DateTimeService } from '../../app/_services/date-time.service';
import { LogService } from '../../app/_services/log.service';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SuccessComponent } from '../../app/_components/_modals/success/success';
import { SubmitCompletedVisitComponent } from '../../app/_components/_modals/submit-completed-visit/submit-completed-visit';
import { VisitHistoryPage } from '..';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import 'rxjs/add/operator/skip';
import { CloseVisitComponent } from '../../app/_components/_modals/close-visit/close-visit';
import { EncounteredProblemComponent } from '../../app/_components/_modals/encountered-problem/encountered-problem';

@IonicPage()
@Component({
    selector: 'page-active-visit',
    templateUrl: 'active-visit.html'
})
export class ActiveVisitPage {
    public visit: Visit;
    public visitOriginal: Visit;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FirebaseService,
        public dateTimeService: DateTimeService,
        public modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {}

    public ngOnInit(): void {
        this.fb.getActiveVisit(this.fb.readUserProfile().id).subscribe(_visit => {
            this.visit = { ..._visit };
            this.visitOriginal = JSON.parse(JSON.stringify(this.visit));
        });
    }

    public closeVisit(): void {
        const confirmCloseModal = this.modalCtrl.create(CloseVisitComponent);
        const loader = this.loadingCtrl.create({ content: 'Closing this visit...' });
        confirmCloseModal.onDidDismiss(doIt => {
            if (doIt) {
                loader.present();
                this.visit.status = 'closed';
                this.fb.updateActiveVisit(this.visit).subscribe(
                    success => {
                        const successModal = this.modalCtrl.create(SuccessComponent);
                        successModal.present();
                        this.navCtrl.popToRoot();
                        this.navCtrl.setRoot(VisitHistoryPage);
                        loader.dismiss();
                    },
                    error => {
                        loader.dismiss();
                        const problemModal = this.modalCtrl.create(
                            EncounteredProblemComponent
                        );
                        problemModal.present();
                    }
                );
            }
        });
        confirmCloseModal.present();
    }

    public dayResultIsGreaterThanOrEqualToGoalSet(dayResult: {
        date: string;
        result: string;
    }): boolean {
        const result = parseFloat(dayResult.result);
        const goal = parseFloat(this.visit.goalSet);
        return result >= goal;
    }

    public getSuccessScore(): string | null {
        try {
            return this.visit.dayResults
                .filter(
                    result => parseFloat(result.result) >= parseFloat(this.visit.goalSet)
                )
                .length.toString();
        } catch {
            return null;
        }
    }

    public isFutureDate(dayResult: { date: string; result: number | null }): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const resultDate = new Date(dayResult.date);
        resultDate.setHours(0, 0, 0, 0);
        return today < resultDate;
    }

    public savedResultIsEqual(result: string, index: number): boolean {
        const savedResult = this.visitOriginal.dayResults[index].result;
        return result !== null && result === savedResult;
    }

    public submit(): void {
        const loader = this.loadingCtrl.create({ content: 'Updating...' });
        if (this.visit.dayResults.every(dayResult => !!dayResult.result)) {
            const submitVisitModal = this.modalCtrl.create(SubmitCompletedVisitComponent);
            submitVisitModal.present();
            submitVisitModal.onDidDismiss(doIt => {
                if (doIt) {
                    loader.present();
                    this.visit.status = 'complete';
                    this.fb.updateActiveVisit(this.visit).subscribe(
                        success => {
                            const successModal = this.modalCtrl.create(SuccessComponent);
                            successModal.present();
                            this.navCtrl.popToRoot();
                            this.navCtrl.setRoot(VisitHistoryPage);
                            loader.dismiss();
                        },
                        error => {},
                        () => loader.dismiss()
                    );
                }
            });
            return;
        }
        loader.present();
        this.fb.updateActiveVisit(this.visit).subscribe(
            success => {
                loader.dismiss();
                const successModal = this.modalCtrl.create(SuccessComponent);
                successModal.present();
            },
            error => {}
        );
    }
}
