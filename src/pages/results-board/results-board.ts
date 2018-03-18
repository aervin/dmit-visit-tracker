import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-results-board',
    templateUrl: 'results-board.html'
})
export class ResultsBoardPage {
    constructor(public navCtrl: NavController, public navParams: NavParams) {}
}
