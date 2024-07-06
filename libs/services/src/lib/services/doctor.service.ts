import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    //  private apiURL = 'http://localhost:3000/api/';

    apiURLDoctor = environment.apiURL + 'doctor';

    constructor(private http: HttpClient) {}

    getDoctor(): Observable<Doctor[]> {
        return this.http.get<Doctor[]>(`${this.apiURLDoctor}/all-doctor`);
    }

    getaIdDoctor(doctorID: string): Observable<Doctor> {
        return this.http.get<Doctor>(`${this.apiURLDoctor}/get-a-doctor/${doctorID}`);
    }

    createDoctor(doctorData: FormData): Observable<Doctor> {
        return this.http.post<Doctor>(`${this.apiURLDoctor}/create`, doctorData);
    }

    deleteDoctor(doctorID: string): Observable<Doctor> {
        return this.http.delete<Doctor>(`${this.apiURLDoctor}/delete-a-doctor/${doctorID}`);
    }

    updateDoctor(doctorID: Doctor): Observable<Doctor> {
        return this.http.put<Doctor>(`${this.apiURLDoctor}/update-a-doctor/` + doctorID.id, doctorID);
    }
}
