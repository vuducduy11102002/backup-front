import { Component, Input, OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '@hospital/libs/services';

@Component({
  selector: 'hospital-upcoming',
  templateUrl: './upcoming.component.html',
})
export class UpcomingComponent implements OnInit {
  pointment: Appointment[] = [];
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this._getAppointments();
  }
  private _getAppointments() {
    this.appointmentService.getAppointment().subscribe((pointments) => {
      console.log(pointments);
      this.pointment = pointments;
    });
  }
}
