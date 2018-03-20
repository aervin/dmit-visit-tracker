import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseService } from './_services/firebase.service';
import { LoginPage } from '../pages/login/login';
import { CreateVisitPage } from '../pages/create-visit/create-visit';
import { ActiveVisitPage } from '../pages/active-visit/active-visit';
import { VisitHistoryPage, ResultsBoardPage } from '../pages/index';
import { ActiveVisitExistsModalComponent } from './_components/_modals/active-visit-exists/active-visit-exists';
import { ActiveVisitDoesNotExistComponent } from './_components/_modals/active-visit-does-not-exist/active-visit-does-not-exist';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    pages: { title: string; component: any }[] = [
        { title: 'My active visit', component: ActiveVisitPage },
        { title: 'New visit', component: CreateVisitPage },
        { title: 'My visit history', component: VisitHistoryPage },
        { title: 'Results board', component: ResultsBoardPage },
        { title: 'Sign off', component: LoginPage }
    ];

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public fb: FirebaseService,
        public modalCtrl: ModalController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        if (
            page.component === CreateVisitPage &&
            this.fb.readActiveVisit() !== undefined
        ) {
            const alreadyExistsModal = this.modalCtrl.create(
                ActiveVisitExistsModalComponent
            );
            alreadyExistsModal.present();
            return;
        }
        if (
            page.component === ActiveVisitPage &&
            this.fb.readActiveVisit() === undefined
        ) {
            const doesntExistModal = this.modalCtrl.create(
                ActiveVisitDoesNotExistComponent
            );
            doesntExistModal.present();
            doesntExistModal.onDidDismiss(data => {
                if (data) {
                    this.nav.setRoot(CreateVisitPage);
                }
            });
            return;
        }
        this.nav.setRoot(page.component);
    }
}
