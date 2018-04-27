import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    ToastController,
    LoadingController
} from 'ionic-angular';
import { FirebaseService, User } from '../../app/_services/firebase.service';
import { LogService } from '../../app/_services/log.service';

@IonicPage()
@Component({
    selector: 'page-results-board',
    templateUrl: 'results-board.html'
})
export class ResultsBoardPage {
    public results;
    public user: User;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FirebaseService,
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController
    ) {
        fb.getResultsBoard().subscribe(results => (this.results = results));
        this.user = this.fb.readUserProfile();
    }

    public formatScoreAsPercentage(score: number): string {
        if (score <= 0) {
            return '0.0';
        }
        return (score / 10 * 100).toFixed(1);
    }

    public sendAdminBasicReport(): void {
        const loader = this.loadingCtrl.create({
            content: 'Generating your report...'
        });
        loader.present();
        this.fb.emailAdminBasicReport().subscribe(
            success => {
                loader.dismiss();
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
                    toast.present();
                }
            },
            error => loader.dismiss()
        )
    }
}
