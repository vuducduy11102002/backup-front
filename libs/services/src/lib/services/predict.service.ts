import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CsvFile, Predict } from '../models/predict';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class PredictService {
  apiURLPredict = environment.apiURL + 'predict';

  constructor(private http: HttpClient) {}

  getPredict(): Observable<Predict[]> {
    return this.http.get<Predict[]>(
      `${this.apiURLPredict}/getPredictwithPatient`
    );
  }
  getFileCsvList(): Observable<CsvFile[]> {
    return this.http.get<CsvFile[]>(`${this.apiURLPredict}/getFileCsv`);
  }

  getCsvContent(fileName: string): Observable<string> {
    return this.http.get(`${this.apiURLPredict}/getCsvContent/${fileName}`, {
      responseType: 'text',
    });
  }

  createPredict(Predict: Predict): Observable<Predict> {
    return this.http.post<Predict>(`${this.apiURLPredict}/create`, Predict);
  }
}
