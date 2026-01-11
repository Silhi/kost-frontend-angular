import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Kos } from '../models/kos.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class KosService {
  private api = `${environment.apiUrl}/kost`; // environment.apiUrl harus "/api"

  constructor(private http: HttpClient) {}

  private toRelativeApiUrl(url: string) {
    try {
      const u = new URL(url);
      return u.pathname + (u.search || '');
    } catch {
      return url.startsWith('/') ? url : `/${url}`;
    }
  }

  // LIST
  getAll() {
    return this.http.get<any>(this.api).pipe(
      map(res => Array.isArray(res) ? res : res?._embedded?.kost ?? [])
    );
  }

  // DETAIL
  getById(id: number) {
    return this.http.get<Kos>(`${this.api}/${id}`);
  }

  // CREATE
  create(data: Kos) {
    return this.http.post(this.api, data);
  }

  // UPDATE dari _links.self.href (dibuat relatif agar proxy jalan)
  updateByUrl(url: string, data: Kos) {
    return this.http.put(this.toRelativeApiUrl(url), data);
  }

  // UPDATE by id
  update(id: number, data: Kos) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
