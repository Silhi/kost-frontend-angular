import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Kos } from '../models/kos.model';

@Injectable({ providedIn: 'root' })
export class KosService {
  private api = '/api/kost';

  constructor(private http: HttpClient) {}

  // LIST
  getAll() {
    return this.http.get<any>(this.api).pipe(
      map(res => res?._embedded?.kost ?? [])
    );
  }

  // DETAIL (EDIT)

  getById(id: number) {
    return this.http.get<Kos>(`${this.api}/${id}`);
  }

  // CREATE
  create(data: Kos) {
    return this.http.post(this.api, data);
  }

  // UPDATE (pakai URL dari _links.self.href)
  updateByUrl(url: string, data: Kos) {
    return this.http.put(url, data);
  }

  // UPDATE by id (gunakan relative path sehingga proxy bekerja)
  update(id: number, data: Kos) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}