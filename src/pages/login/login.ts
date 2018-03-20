import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateVisitPage } from '../create-visit/create-visit';
import { FirebaseService } from '../../app/_services/firebase.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ActiveVisitPage } from '../index';
import { SignUpPage } from '../sign-up/sign-up';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { EncounteredProblemComponent } from '../../app/_components/_modals/encountered-problem/encountered-problem';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    public email: string;
    public password: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FirebaseService,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController
    ) {}

    public login(): void {
        const loader = this.loadingCtrl.create({
            content: 'Logging you in...'
        });
        loader.present();
        this.fb.authenticateUser(this.email, this.password).subscribe(
            success => {
                if (success) {
                    this.fb.getUserProfile(this.email).subscribe(user => {
                        this.fb.user = user;
                        this.fb
                            .getActiveVisit(this.fb.readUserProfile().id)
                            .subscribe(visit => {
                                loader.dismiss();
                                this.navCtrl.setRoot(
                                    visit === undefined
                                        ? CreateVisitPage
                                        : ActiveVisitPage
                                );
                            });
                    });
                } else {
                    loader.dismiss();
                    const problemModal = this.modalCtrl.create(
                        EncounteredProblemComponent
                    );
                    problemModal.present();
                }
            },
            error => {},
            () => loader.dismiss()
        );
    }

    public signUp(event: Event): void {
        this.navCtrl.push(SignUpPage);
    }
}
