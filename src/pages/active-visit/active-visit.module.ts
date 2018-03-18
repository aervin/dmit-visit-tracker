import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveVisitPage } from './active-visit';

@NgModule({
  declarations: [
    ActiveVisitPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveVisitPage),
  ],
})
export class ActiveVisitPageModule {}
