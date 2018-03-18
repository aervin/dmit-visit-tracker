import { Component } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    ModalController,
    LoadingController
} from 'ionic-angular';
import { FirebaseService } from '../../app/_services/firebase.service';
import { CreateVisitPage } from '..';
import { SuccessSignupComponent } from '../../app/_components/_modals/success-signup/success-signup';
import { CreateVisitInvalidComponent } from '../../app/_components/_modals/create-visit-invalid/create-visit-invalid';
import { EncounteredProblemComponent } from '../../app/_components/_modals/encountered-problem/encountered-problem';

@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html'
})
export class SignUpPage {
    public email: string;
    public password: string;
    public passwordConfirmation;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FirebaseService,
        private modalCtrl: ModalController,
        private loadingCtrl: LoadingController
    ) {}

    isValid(): boolean {
        return (
            !!this.email &&
            !!this.password &&
            !!this.passwordConfirmation &&
            this.password === this.passwordConfirmation
        );
    }

    public submit(): void {
        if (!this.isValid()) {
            const invalidModal = this.modalCtrl.create(CreateVisitInvalidComponent);
            invalidModal.present();
            return;
        }
        const loader = this.loadingCtrl.create({
            content: 'Creating your profile...'
        });
        loader.present();
        this.fb.createUser(this.email, this.password).subscribe(success => {
            loader.dismiss();
            if (success) {
                const successModal = this.modalCtrl.create(SuccessSignupComponent);
                successModal.present();
                successModal.onDidDismiss(() => this.navCtrl.setRoot(CreateVisitPage));
                return;
            }
            const problemModal = this.modalCtrl.create(EncounteredProblemComponent);
            problemModal.present();
        });
    }
}
