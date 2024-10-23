import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { appState } from './store/states/app.state';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { AuthUserEffects } from './store/effects/authuser.effects';
import { RubricaEffects } from './store/effects/rubrica.effects';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { cfVariableReducer } from './store/reducers/cf-variable.reducer';

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(appState),
    provideEffects(RubricaEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    provideHttpClient(),
    provideEffects(AuthUserEffects), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor]),withFetch()), // Registra l'intercettore
    importProvidersFrom(ModalModule.forRoot()),
    //provideStore({cfVariable : cfVariableReducer}),
  ],
};
