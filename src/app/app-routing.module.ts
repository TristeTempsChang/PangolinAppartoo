import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { FindUserComponent } from './find-user/find-user.component';

const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserPageComponent},
  { path: 'user/findFriend', component: FindUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
