import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  authorizedGuard, notAuthorizedGuard,
} from './features/auth/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canMatch: [notAuthorizedGuard()],
  },
  {
    path: 'sensors',
    loadChildren: () =>
      import('./features/sensors/sensors.module').then((m) => m.SensorsModule),
    canActivate: [authorizedGuard()],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/sensors',
    canMatch: [authorizedGuard()],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
