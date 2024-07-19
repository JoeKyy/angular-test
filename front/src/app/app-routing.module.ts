import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { authGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
