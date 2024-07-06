import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '@hospital/libs/services';

@Component({
  selector: 'hospital-list',
  templateUrl: './list.component.html',
})
export class ListAppointmentComponent implements OnInit {
  pointment: Appointment[] = [];
  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this._getAppointments();
  }

  // deleteDoctor() {}

  // updateDoctor() {}

  private _getAppointments() {
    this.appointmentService.getAppointment().subscribe((pointments) => {
      console.log(pointments);
      this.pointment = pointments;
    });
  }
}
