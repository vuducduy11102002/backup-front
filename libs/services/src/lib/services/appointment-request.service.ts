import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestAppointment } from '../models/request-appointment';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root'
})
export class AppointmentRequestService {
    apiURLAppointment = environment.apiURL + 'notification';

    constructor(private http: HttpClient) {}

    getRequestAppointment(): Observable<RequestAppointment[]> {
        return this.http.get<RequestAppointment[]>(`${this.apiURLAppointment}/get-all`);
    }

    createRequestAppointment(RequestAppointment: RequestAppointment): Observable<RequestAppointment> {
        return this.http.post<RequestAppointment>(`${this.apiURLAppointment}/create`, RequestAppointment);
    }
}
