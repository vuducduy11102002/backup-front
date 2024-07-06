import { Route } from '@angular/router';
import { BookpointmentComponent } from './main/bookpointment/bookpointment.component';
import { AboutUsComponent } from './main/about-us/about-us.component';

export const Routes: Route[] = [
  { path: 'bookpointment', component: BookpointmentComponent },
  { path: 'about-us', component: AboutUsComponent },
];
