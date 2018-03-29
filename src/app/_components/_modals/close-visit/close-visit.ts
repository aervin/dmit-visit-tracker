import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
    selector: 'close-visit',
    templateUrl: 'close-visit.html'
})
export class CloseVisitComponent {
    constructor(public viewCtrl: ViewController) {}
}
