import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import {  MatDialogRef } from '@angular/material/dialog';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { IMAGE_CONFIG } from '@angular/common';
 
   
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true })),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideAnimationsAsync(),
    { provide: MatDialogRef, useValue: {} },
    { provide: IMAGE_CONFIG, useValue: { auto: 'format,compress' } },
  ]
};  
 