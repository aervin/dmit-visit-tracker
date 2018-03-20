import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseService, Visit } from '../../app/_services/firebase.service';
import { DateTimeService } from '../../app/_services/date-time.service';

@IonicPage()
@Component({
    selector: 'page-visit-history',
    templateUrl: 'visit-history.html'
})
export class VisitHistoryPage {
    public visitHistory: Visit[] | undefined;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FirebaseService,
        public dateTimeService: DateTimeService
    ) {
        this.visitHistory = this.fb.readVisitHistory();
    }
}
