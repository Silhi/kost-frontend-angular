import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Kos } from '../models/kos.model';
import { map } from 'rxjs/operators'; // <--- JANGAN LUPA IMPORT INI

@Injectable({
  providedIn: 'root'
})
export class KosService {
  // Pastikan URL-nya mengarah ke endpoint yang benar (pake 't' atau tidak, sesuaikan screenshotmu)
  // Dari screenshot kamu sebelumnya: http://localhost:8081/api/kost
  private api = `${environment.apiUrl}/kost`;

  constructor(private http: HttpClient) {}

  getAll() {
    // Kita minta data sebagai 'any' dulu karena formatnya HATEOAS
    return this.http.get<any>(this.api).pipe(
      map(response => {
        // CEK 1: Apakah ada bungkusan _embedded?
        if (response._embedded && response._embedded.kost) {
          // AMBIL ISINYA SAJA (Array data kos)
          return response._embedded.kost;
        }
        // CEK 2: Jaga-jaga kalau backend error atau format beda
        return [];
      })
    );
  }

  // Fungsi lainnya tetap
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