import { Component, OnInit } from '@angular/core';
import { AppointmentRequestService, RequestAppointment } from '@hospital/libs/services';

@Component({
    selector: 'hospital-request-appointment',
    templateUrl: './list.component.html'
})
export class ListAppointmentRequestComponent implements OnInit {
    requestAppointment: RequestAppointment[] = [];
    constructor(private AppointmentRequestService: AppointmentRequestService) {}

    ngOnInit(): void {
        this._getAppointments();
    }

    // deleteDoctor() {}

    // updateDoctor() {}

    private _getAppointments() {
        this.AppointmentRequestService.getRequestAppointment().subscribe((requestAppointments) => {
            this.requestAppointment = requestAppointments;
        });
    }
}
