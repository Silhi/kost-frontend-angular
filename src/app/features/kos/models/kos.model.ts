import { KosFoto } from './kos-foto.model';

export interface Kos {
  nama_kos: string;
  alamat: string;
  harga: number;
  tipe: string;
  deskripsi: string;
  status: string;
  fotos?: KosFoto[];
  _links?: {
    self: {
      href: string;
    };
  };
}
