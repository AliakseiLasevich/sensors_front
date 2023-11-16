import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './features/auth/auth.module';
import { SensorsTableComponent } from './features/sensors-table/sensors-table.component';
import { AuthInterceptor } from './services/auth-services/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './store/auth-store/auth.effect';
import { authReducer } from './store/auth-store/auth.reducer';
import { SensorsEffects } from './store/sensors-store/sensors.effects';
import { sensorsReducer } from './store/sensors-store/sensors.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    StoreModule.forRoot({ auth: authReducer, sensors: sensorsReducer }),
    EffectsModule.forRoot([AuthEffects, SensorsEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
