import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://127.0.0.1:8000/api/patients'; // Depois alterar para  'private apiUrl = `${environment.apiUrl}/patients`;'

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(patient: any) {
    return this.http.post(this.apiUrl, patient);
  }

  update(id: number, patient: any) {
    return this.http.put(`${this.apiUrl}/${id}`, patient);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
