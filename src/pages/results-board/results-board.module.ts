import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultsBoardPage } from './results-board';

@NgModule({
  declarations: [
    ResultsBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsBoardPage),
  ],
})
export class ResultsBoardPageModule {}
