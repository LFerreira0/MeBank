import { landingPageComponent } from './landing-page/landing-page.component';

import { accountComponent } from './account/account.component';
import { pessoaJuridicaComponent } from './pessoa-juridica/pessoa-juridica.component';
import { pessoaFisicaComponent } from './pessoa-fisica/pessoa-fisica.component';
import { cartaoComponent } from './cartao/cartao.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'


// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import { HeaderComponent } from './header';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
        NgxMaskModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        HeaderComponent,
        cartaoComponent,
        pessoaFisicaComponent,
        pessoaJuridicaComponent,
        accountComponent,
        landingPageComponent       
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };