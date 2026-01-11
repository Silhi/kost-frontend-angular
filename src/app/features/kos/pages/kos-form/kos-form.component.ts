import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KosService } from '../../services/kos.service';
import { Kos } from '../../models/kos.model';

@Component({
  selector: 'app-kos-form',
  templateUrl: './kos-form.component.html'
})
export class KosFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  selfUrl = '';
  editId?: number;

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
      harga: [0, Validators.required],
      tipe: ['', Validators.required],
      deskripsi: [''],
      status: ['', Validators.required]
    });

    console.log('KosFormComponent initialized', { isEdit: this.isEdit });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.editId = +id;
      this.loadData(+id);
    }
  }

  loadData(id: number) {
    this.service.getById(id).subscribe((data: Kos) => {
      this.form.patchValue(data);
      this.selfUrl = data._links?.self.href || '';
    });
  }

  submit() {
    if (this.form.invalid) {
      console.warn('Form invalid', this.form.status, this.form.errors);
      return;
    }

    const payload: Kos = this.form.value;
    console.log('Submitting payload', payload, { isEdit: this.isEdit, selfUrl: this.selfUrl });

    if (this.isEdit) {
      // gunakan update by id agar proxy dan CORS tidak masalah
      if (this.editId == null) {
        console.error('Edit ID missing');
        alert('ID edit tidak ditemukan');
        return;
      }

      this.service.update(this.editId, payload).subscribe({
        next: () => {
          alert('Data berhasil diperbarui');
          this.router.navigate(['/kos']);
        },
        error: (err) => {
          console.error('Update error', err);
          alert('Gagal memperbarui data: ' + (err?.message || err?.status || 'unknown'));
        }
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
        }
      });
    }
  }
}