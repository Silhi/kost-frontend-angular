import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KosService } from '../../services/kos.service';
import { Kos } from '../../models/kos.model';

@Component({
  selector: 'app-kos-form',
  templateUrl: './kos-form.component.html',
})
export class KosFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;

  // dipakai untuk update by id (hindari NaN)
  editId: number | null = null;

  // opsional (kalau kamu tetap mau simpan self href dari HAL)
  selfUrl = '';

  constructor(
    private fb: FormBuilder,
    private service: KosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nama_kos: ['', Validators.required],
      alamat: ['', Validators.required],
      harga: [0, [Validators.required, Validators.min(0)]],
      tipe: ['', Validators.required],
      deskripsi: [''],
      status: ['', Validators.required],
    });

    // Ambil id dari route dan VALIDASI harus angka
    const idParam = this.route.snapshot.paramMap.get('id');

    // Tangani kasus ketika param isinya string 'undefined' / 'null' (misalnya routerLink menerima undefined)
    if (idParam === 'undefined' || idParam === 'null' || idParam === '') {
      console.error('Param id invalid string:', idParam);
      alert('ID tidak valid untuk edit.');
      this.router.navigate(['/kos']);
      return;
    }

    const id = Number(idParam);

    if (idParam && Number.isFinite(id) && id > 0) {
      this.isEdit = true;
      this.editId = id;
      this.loadData(id);
    } else {
      // kalau tidak ada idParam => mode create (normal)
      // kalau ada tapi invalid => jangan lanjut edit (hindari /NaN)
      if (idParam) {
        console.error('Param id tidak valid:', idParam);
        alert('ID tidak valid untuk edit.');
        this.router.navigate(['/kos']);
      }
    }

    console.log('KosFormComponent initialized', {
      isEdit: this.isEdit,
      editId: this.editId,
      routeId: idParam,
    });
  }

  private loadData(id: number): void {
    this.service.getById(id).subscribe({
      next: (data: Kos) => {
        // Patch hanya field yang ada di form (lebih aman dari _links dll)
        this.form.patchValue({
          nama_kos: data.nama_kos ?? '',
          alamat: data.alamat ?? '',
          harga: data.harga ?? 0,
          tipe: data.tipe ?? '',
          deskripsi: data.deskripsi ?? '',
          status: data.status ?? '',
        });

        // opsional untuk kebutuhan lain
        this.selfUrl = data._links?.self?.href ?? '';
      },
      error: (err) => {
        console.error('Gagal load data kos', err);
        alert('Gagal memuat data untuk edit.');
        this.router.navigate(['/kos']);
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('Form invalid', this.form.errors);
      return;
    }

    const payload: Kos = this.form.value;

    console.log('Submitting payload', {
      payload,
      isEdit: this.isEdit,
      editId: this.editId,
      selfUrl: this.selfUrl,
    });

    if (this.isEdit) {
      // Guard paling penting: pastikan editId valid (bukan NaN)
      if (this.editId == null || !Number.isFinite(this.editId) || this.editId <= 0) {
        console.error('Edit ID missing/invalid:', this.editId);
        alert('ID edit tidak valid. Tidak bisa update.');
        return;
      }

      // Pakai update by id (relative path) supaya proxy jalan & CORS aman
      this.service.update(this.editId, payload).subscribe({
        next: () => {
          alert('Data berhasil diperbarui');
          this.router.navigate(['/kos']);
        },
        error: (err) => {
          console.error('Update error', err);
          alert('Gagal memperbarui data: ' + (err?.message || err?.status || 'unknown'));
        },
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => {
          alert('Data berhasil ditambahkan');
          this.router.navigate(['/kos']);
        },
        error: (err) => {
          console.error('Create error', err);
          alert('Gagal menambahkan data: ' + (err?.message || err?.status || 'unknown'));
        },
      });
    }
  }
}
