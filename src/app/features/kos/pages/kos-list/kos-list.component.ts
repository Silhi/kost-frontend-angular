import { Component, OnInit } from '@angular/core';
import { KosService } from '../../services/kos.service';

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
        this.kosList = data;
        this.filteredKos = data;
      },
      error: (err) => {
        console.error('Masih error:', err);
        alert('Gagal ambil data. Cek Console (F12) untuk detail.');
      }
    });
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