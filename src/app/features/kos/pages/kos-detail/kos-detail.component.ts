import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kos-detail',
  templateUrl: './kos-detail.component.html'
})
export class KosDetailComponent implements OnInit {

  kos: any = null;
  fotos: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID DARI ROUTE:', idParam);

    const id = Number(idParam);

    if (!id) {
      alert('ID kos tidak valid');
      return;
    }

    this.http.get<any>(`http://localhost:8081/api/kost/${id}`)
      .subscribe({
        next: res => {
          console.log('DATA KOS:', res);
          this.kos = res;
          this.loading = false;
        },
        error: err => {
          console.error('ERROR API:', err);
          this.loading = false;
        }
      });
  }


  goBack() {
    this.router.navigate(['/kos']);
  }

  editKos() {
    this.router.navigate(['/kos', this.kos.id, 'edit']);
  }
}
