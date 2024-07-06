import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
    providedIn: 'root'
})
export class PatientService {
    //  private apiURL = 'http://localhost:3000/api/';

    apiURLPatient = environment.apiURL + 'patient';

    constructor(private http: HttpClient) {}

    getSoftDeletedPatients(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.apiURLPatient}/get-softdelete`);
    }

    getPatient(): Observable<Patient[]> {
        return this.http.get<Patient[]>(`${this.apiURLPatient}/all-patient`);
    }

    getaIdPatient(patientID: string): Observable<Patient> {
        return this.http.get<Patient>(`${this.apiURLPatient}/get-a-patient/${patientID}`);
    }

    createPatient(patient: Patient): Observable<Patient> {
        return this.http.post<Patient>(`${this.apiURLPatient}/create`, patient);
    }

    deletePatient(patientID: string): Observable<Patient> {
        return this.http.delete<Patient>(`${this.apiURLPatient}/delete-a-patient/${patientID}`);
    }

    softDeletePatients(ids: string[]): Observable<any> {
        return this.http.post(`${this.apiURLPatient}/soft-delete`, { ids });
    }

    restorePatients(patientIds: string[]): Observable<any> {
        return this.http.post(`${this.apiURLPatient}/restore`, { ids: patientIds });
    }

    updatePatient(patientID: Patient): Observable<Patient> {
        return this.http.put<Patient>(`${this.apiURLPatient}/update-a-patient/` + patientID.id, patientID);
    }
}
