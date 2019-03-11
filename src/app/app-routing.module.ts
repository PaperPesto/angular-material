import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'

import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { TrainingComponent } from "./training/training.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }
];
// [Lez.62] Ho fornito l'autenticazione al route 'training'
// L'autenticazione avviene fornendo una classe che implementi canActivate()
// (credo) posso fornire più di una classe di autenticazione per usare più autenticazioni diverse
// Devo anche iniettare la classe AuthGuard nel motore di DI, e lo faccio qui sotto nei providers
// anziché definirla nel app.module.ts (è un'eccezione), normalmente si inietta dall'app.module
// Ma questa classe viene usata solo ed esclusivamente dall'app-routing
// NB. AuthGuard ha il decoratore @Injectable() per inserirla nel contesto DI.
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }