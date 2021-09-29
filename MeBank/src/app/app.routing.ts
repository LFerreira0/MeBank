import { accountComponent } from './account/account.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { HeaderComponent } from './header';
import { cartaoComponent } from './cartao';
import { pessoaFisicaComponent } from './pessoa-fisica';
import { pessoaJuridicaComponent } from './pessoa-juridica';
import { landingPageComponent } from './landing-page';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'header', component: HeaderComponent},
    { path: 'cartao', component: cartaoComponent},
    { path: 'pessoa-fisica', component: pessoaFisicaComponent},
    { path: 'pessoa-juridica', component: pessoaJuridicaComponent},
    { path: 'account', component: accountComponent},
    { path: 'landing-page', component: landingPageComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);