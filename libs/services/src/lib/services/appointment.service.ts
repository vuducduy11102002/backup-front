import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointment';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    //  private apiURL = 'http://localhost:3000/api/';

    apiURLAppointment = environment.apiURL + 'appointment';

    constructor(private http: HttpClient) {}

    getAppointment(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiURLAppointment}/get-all`);
    }

    // getaIdPatient(doctorID: string): Observable<Appointment> {
    //     return this.http.get<Appointment>(`${this.apiURLAppointment}/get-a-doctor/${doctorID}`);
    // }

    createAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(`${this.apiURLAppointment}/create`, appointment);
    }

    // deletePatient(doctorID: string): Observable<Appointment> {
    //     return this.http.delete<Appointment>(`${this.apiURLAppointment}/delete-a-doctor/${doctorID}`);
    // }

    // updatePatient(doctorID: Appointment): Observable<Appointment> {
    //     return this.http.put<Appointment>(`${this.apiURLAppointment}/update-a-doctor/` + doctorID.id, doctorID);
    // }
}
