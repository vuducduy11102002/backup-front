import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CalendarComponent } from './scheduler-candeler/calender.component';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { TabletimeComponent } from './table-time/tabletime.component';

// Component angular calender

@NgModule({
  declarations: [CalendarComponent, TabletimeComponent],
  imports: [CalendarModule, CommonModule],
  providers: [],
  bootstrap: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppointmentModule {}
