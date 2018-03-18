import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseService } from './_services/firebase.service';
import { LogService } from './_services/log.service';
import { HttpLoggerInterceptor } from './_interceptors/httpLogger.interceptor';
import {
    ActiveVisitPage,
    CreateVisitPage,
    LoginPage,
    ResultsBoardPage,
    VisitHistoryPage
} from './../pages';
import { DateTimeService } from './_services/date-time.service';
import { VisitProgressComponent } from './_components/visit-progress/visit-progress';
import { ActiveVisitExistsModalComponent } from './_components/_modals/active-visit-exists/active-visit-exists';
import { ActiveVisitDoesNotExistComponent } from './_components/_modals/active-visit-does-not-exist/active-visit-does-not-exist';
import { SuccessComponent } from './_components/_modals/success/success';
import { SubmitCompletedVisitComponent } from './_components/_modals/submit-completed-visit/submit-completed-visit';
import { CreateVisitInvalidComponent } from './_components/_modals/create-visit-invalid/create-visit-invalid';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SuccessSignupComponent } from './_components/_modals/success-signup/success-signup';
import { EncounteredProblemComponent } from './_components/_modals/encountered-problem/encountered-problem';

@NgModule({
    declarations: [
        MyApp,
        ActiveVisitDoesNotExistComponent,
        ActiveVisitExistsModalComponent,
        ActiveVisitPage,
        CreateVisitInvalidComponent,
        CreateVisitPage,
        EncounteredProblemComponent,
        LoginPage,
        ResultsBoardPage,
        SignUpPage,
        SubmitCompletedVisitComponent,
        SuccessComponent,
        SuccessSignupComponent,
        VisitHistoryPage,
        VisitProgressComponent
    ],
    imports: [BrowserModule, IonicModule.forRoot(MyApp)],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ActiveVisitDoesNotExistComponent,
        ActiveVisitExistsModalComponent,
        ActiveVisitPage,
        CreateVisitInvalidComponent,
        CreateVisitPage,
        EncounteredProblemComponent,
        LoginPage,
        ResultsBoardPage,
        SignUpPage,
        SubmitCompletedVisitComponent,
        SuccessComponent,
        SuccessSignupComponent,
        VisitHistoryPage
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoggerInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        DateTimeService,
        FirebaseService,
        LogService,
        SplashScreen,
        StatusBar
    ]
})
export class AppModule {}
