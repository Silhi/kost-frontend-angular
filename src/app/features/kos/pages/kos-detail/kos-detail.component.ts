import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KosService } from '../../services/kos.service';
import { environment } from '../../../../../environments/environment';

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
    private kosService: KosService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID DARI ROUTE:', idParam);

    if (idParam === 'undefined' || idParam === 'null' || idParam === '' || idParam == null) {
      alert('ID kos tidak valid');
      this.router.navigate(['/kos']);
      return;
    }

    const id = Number(idParam);

    if (!Number.isFinite(id) || id <= 0) {
      alert('ID kos tidak valid');
      this.router.navigate(['/kos']);
      return;
    }

    this.kosService.getById(id).subscribe({
      next: res => {
        console.log('DATA KOS:', res);
        this.kos = res;
        this.fotos = (res?.fotos || []).map((f: any) => ({ url: this.buildFotoUrl(f) }));
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
    const id = this.kos?.id ?? this.extractIdFromSelf(this.kos);
    if (!id) {
      alert('ID tidak tersedia untuk edit');
      return;
    }
    this.router.navigate(['/kos', id, 'edit']);
  }

  private buildFotoUrl(foto: any): string {
    const url = foto?.fotoUrl || foto?.foto_Url || foto?.fotoUrlPath || '';
    if (!url) return 'assets/images/placeholder.svg';
    return url.startsWith('http') ? url : `${environment.apiUrl}${url}`;
  }

  private extractIdFromSelf(item: any): number | null {
    const href = item?._links?.self?.href;
    if (!href) return null;
    const parts = href.split('/');
    const last = parts[parts.length - 1];
    const num = Number(last);
    return Number.isFinite(num) ? num : null;
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/placeholder.svg';
  }
}
