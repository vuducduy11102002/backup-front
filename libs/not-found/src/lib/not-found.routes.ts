import { Routes } from '@angular/router';
import { notFoundComponent } from './notfound.component';
export const notfoundRoutes: Routes = [
  { path: '**', component: notFoundComponent },
];
