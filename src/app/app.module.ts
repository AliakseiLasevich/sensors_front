import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthEffects } from './store/auth-store/auth.effect';
import { authReducer } from './store/auth-store/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot(AuthEffects),HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: environment.production,
    }),
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
