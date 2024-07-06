import { Route } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { Routes } from '@hospital/ui';

export const appRoutes: Route[] = [
  { path: '', component: HomePageComponent },
  { path: 'home', component: HomePageComponent },
  ...Routes,
];
