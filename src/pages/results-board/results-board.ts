import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../app/_services/firebase.service';

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
        public fb: FirebaseService
    ) {
        fb.getResultsBoard().subscribe(results => (this.results = results));
    }

    public formatScoreAsPercentage(score: number): string {
        if (score <= 0) {
            return '0.0';
        }
        return (score / 10 * 100).toFixed(1);
    }
}
