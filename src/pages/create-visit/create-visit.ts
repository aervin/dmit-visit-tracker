import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Visit, FirebaseService } from '../../app/_services/firebase.service';
import { generateDayResults } from './empty-day-results';
import { CreateVisitInvalidComponent } from '../../app/_components/_modals/create-visit-invalid/create-visit-invalid';
import { SuccessComponent } from '../../app/_components/_modals/success/success';
import { ActiveVisitPage } from '../index';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
    selector: 'page-create-visit',
    templateUrl: 'create-visit.html'
})
export class CreateVisitPage {
    public newVisit: Visit = {
        dayResults: null,
        userId: this.fb.readUserProfile().id,
        userName: '',
        goalSet: null,
        note: '',
        salesTrend: null,
        visitDate: new Date().toISOString(),
        status: 'active',
        visitType: null,
        store: null
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FirebaseService,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {}

    public createVisit(): void {
        if (
            this.newVisit.goalSet === null ||
            this.newVisit.salesTrend === null ||
            this.newVisit.visitType === null ||
            this.newVisit.store === null ||
            this.goalIsInvalid()
        ) {
            const invalidModal = this.modalCtrl.create(CreateVisitInvalidComponent);
            invalidModal.present();
            return;
        }
        const loader = this.loadingCtrl.create({
            content: 'Creating your visit...'
        });
        this.newVisit.dayResults = generateDayResults(this.newVisit.visitDate);
        this.fb.createVisit(this.newVisit).subscribe(success => {
            const successModal = this.modalCtrl.create(SuccessComponent);
            successModal.present();
            successModal.onDidDismiss(() => {
                this.fb.getActiveVisit(this.fb.readUserProfile().id).subscribe(visit => {
                    loader.dismiss();
                    this.navCtrl.setRoot(
                        visit === undefined ? CreateVisitPage : ActiveVisitPage
                    );
                });
            });
        });
    }

    public goalIsInvalid(): boolean {
        try {
            return (
                parseFloat(this.newVisit.goalSet) <= parseFloat(this.newVisit.salesTrend)
            );
        } catch {
            return true;
        }
    }
}
