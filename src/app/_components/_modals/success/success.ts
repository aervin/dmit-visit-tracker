import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
    selector: 'success',
    templateUrl: 'success.html'
})
export class SuccessComponent {
    constructor(public viewCtrl: ViewController) {}
}
