import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirebaseService } from '../../app/_services/firebase.service';
import { LogService } from '../../app/_services/log.service';

@IonicPage()
@Component({
    selector: 'page-results-board',
    templateUrl: 'results-board.html'
})
export class ResultsBoardPage {
    public results;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FirebaseService,
        private toastCtrl: ToastController
    ) {
        fb.getResultsBoard().subscribe(results => (this.results = results));
    }

    public formatScoreAsPercentage(score: number): string {
        if (score <= 0) {
            return '0.0';
        }
        return (score / 10 * 100).toFixed(1);
    }

    public sendAdminBasicReport(): void {
        this.fb.emailAdminBasicReport().subscribe(success => {
            if (success) {
                const toast = this.toastCtrl.create({
                    message: 'Your report was emailed successfully!',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            } else {
                const toast = this.toastCtrl.create({
                    message: 'There was a problem generating your report...',
                    duration: 2000,
                    position: 'top'
                });
            }
        });
    }
}
