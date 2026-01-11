import { Component, OnInit } from '@angular/core';
import { KosService } from '../../services/kos.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-kos-list',
  templateUrl: './kos-list.component.html',
  styleUrls: ['./kos-list.component.css']
})
export class KosListComponent implements OnInit {
  
  // Ubah tipe data jadi 'any[]' biar TypeScript tidak rewel
  kosList: any[] = []; 
  filteredKos: any[] = [];
  keyword: string = '';

  constructor(private kosService: KosService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.kosService.getAll().subscribe({
      next: (data) => {
        console.log('Data diterima Angular:', data); // Cek Console Browser (F12)
        // Normalisasi: pastikan tiap item punya numeric `id` (ambil dari _links jika perlu)
        this.kosList = (data || []).map((item: any) => {
          const idFromSelf = this.extractIdFromSelf(item);
          const rawId = item?.id ?? idFromSelf;
          return { ...item, id: rawId == null ? undefined : Number(rawId) };
        });
        this.filteredKos = this.kosList;
      },
      error: (err) => {
        console.error('Gagal ambil data:', err.status, err.statusText, err.error);
        alert(`Gagal ambil data: ${err.status} ${err.statusText}. Cek Console (F12) untuk detail.`);
      }
    });
  }

  // Ambil ID numeric dari _links.self.href ketika backend mengembalikan HAL resource tanpa field `id`
  private extractIdFromSelf(item: any): number | null {
    const href = item?._links?.self?.href;
    if (!href) return null;
    const parts = href.split('/');
    const last = parts[parts.length - 1];
    const num = Number(last);
    return Number.isFinite(num) ? num : null;
  }

  // Bangun URL gambar: gunakan foto[0].fotoUrl jika ada, atau placeholder lokal
  getImageUrl(item: any): string {
    const foto = item?.fotos?.[0];
    if (!foto) {
      return 'assets/images/kost.jpg';
    }

    const url = foto.fotoUrl || foto.foto_Url || foto.fotoUrlPath || '';
    if (!url) return 'assets/images/kost.jpg';

    // Jika sudah absolute, gunakan apa adanya; kalau relatif, sambungkan ke environment.apiUrl
    return url.startsWith('http') ? url : `${environment.apiUrl}${url}`;
  }

  // Saat gambar gagal dimuat, ganti src ke placeholder lokal
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/kost.jpg';
  }

  onSearch() {
    if (this.keyword) {
      const searchKey = this.keyword.toLowerCase();
      this.filteredKos = this.kosList.filter(k => 
        k.nama_kos.toLowerCase().includes(searchKey) ||
        k.alamat.toLowerCase().includes(searchKey)
      );
    } else {
      this.filteredKos = this.kosList;
    }
  }

  onDelete(id: number) {
    if (confirm('Hapus data ini?')) {
      this.kosService.delete(id).subscribe({
        next: () => {
          alert('Terhapus!');
          this.fetchData();
        },
        error: (err) => alert('Gagal hapus data.')
      });
    }
  }
}