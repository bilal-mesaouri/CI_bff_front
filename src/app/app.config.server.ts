import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideStore } from '@ngrx/store';
import {reservationReducer} from './components/table-reservation/reservation.reducer';
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideStore({ reservation: reservationReducer })  
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
