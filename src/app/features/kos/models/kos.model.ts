export interface Kos {
  id?: number;
  nama_kos: string;
  alamat: string;
  harga: number;
  tipe: 'PUTRA' | 'PUTRI' | 'CAMPUR';
  deskripsi: string;
  status: 'TERSEDIA' | 'PENUH';
}