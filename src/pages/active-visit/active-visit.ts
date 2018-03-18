import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService, Visit } from '../../app/_services/firebase.service';
import { DateTimeService } from '../../app/_services/date-time.service';
import { LogService } from '../../app/_services/log.service';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { SuccessComponent } from '../../app/_components/_modals/success/success';
import { SubmitCompletedVisitComponent } from '../../app/_components/_modals/submit-completed-visit/submit-completed-visit';
import { VisitHistoryPage } from '..';

@IonicPage()
@Component({
    selector: 'page-active-visit',
    templateUrl: 'active-visit.html'
})
export class ActiveVisitPage {
    public visit: Visit;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FirebaseService,
        public dateTimeService: DateTimeService,
        public modalCtrl: ModalController
    ) {
        this.visit = this.fb.readActiveVisit();
        LogService.log(ActiveVisitPage.name, this.fb.readActiveVisit());
    }

    public dayResultIsGreaterThanGoalSet(dayResult: {
        date: string;
        result: string;
    }): boolean {
        const result = parseFloat(dayResult.result);
        const goal = parseFloat(this.visit.goalSet);
        return result > goal;
    }

    public isFutureDate(dayResult: { date: string; result: number | null }): boolean {
        const today = new Date();
        const resultDate = new Date(dayResult.date);
        return (
            today.getDate() < resultDate.getDate() &&
            today.getMonth() <= resultDate.getMonth() &&
            today.getFullYear() <= resultDate.getFullYear()
        );
    }

    public isTodaysResult(dayResult: { date: string; result: number | null }): boolean {
        const today = new Date();
        const resultDate = new Date(dayResult.date);
        return (
            today.getDate() === resultDate.getDate() &&
            today.getMonth() === resultDate.getMonth() &&
            today.getFullYear() === resultDate.getFullYear()
        );
    }

    public submit(): void {
        if (this.visit.dayResults.every(dayResult => dayResult.result !== null)) {
            const submitVisitModal = this.modalCtrl.create(SubmitCompletedVisitComponent);
            submitVisitModal.present();
            submitVisitModal.onDidDismiss(doIt => {
                if (doIt) {
                    this.visit.status = 'complete';
                    this.fb.updateActiveVisit(this.visit).subscribe(success => {
                        const successModal = this.modalCtrl.create(SuccessComponent);
                        successModal.present();
                        this.navCtrl.popToRoot();
                        this.navCtrl.setRoot(VisitHistoryPage);
                    });
                }
            });
            return;
        }
        this.fb.updateActiveVisit(this.visit).subscribe(success => {
            const successModal = this.modalCtrl.create(SuccessComponent);
            successModal.present();
        });
    }
}
