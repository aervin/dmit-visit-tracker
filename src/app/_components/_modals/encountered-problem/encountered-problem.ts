import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'encountered-problem',
  templateUrl: 'encountered-problem.html'
})
export class EncounteredProblemComponent {
  constructor(public viewCtrl: ViewController) {}
}
