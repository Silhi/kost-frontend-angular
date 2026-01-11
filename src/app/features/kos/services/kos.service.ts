import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Kos } from '../models/kos.model';

@Injectable({
  providedIn: 'root'
})
export class KosService {
  private api = `${environment.apiUrl}/kos`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Kos[]>(this.api);
  }

  getById(id: number) {
    return this.http.get<Kos>(`${this.api}/${id}`);
  }

  create(data: Kos) {
    return this.http.post(this.api, data);
  }

  update(id: number, data: Kos) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
