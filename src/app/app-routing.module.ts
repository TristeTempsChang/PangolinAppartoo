import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { FindUserComponent } from './find-user/find-user.component';
import { QuiSommesNousComponent } from './qui-sommes-nous/qui-sommes-nous.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'whoAreWe', component: QuiSommesNousComponent},
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
  { path: 'user/findFriend', component: FindUserComponent, canActivate: [AuthGuard]},
  { path: 'user/editUser', component: EditUserComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
