import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
    selector: 'submit-completed-visit',
    templateUrl: 'submit-completed-visit.html'
})
export class SubmitCompletedVisitComponent {
    constructor(public viewCtrl: ViewController) {}
}
