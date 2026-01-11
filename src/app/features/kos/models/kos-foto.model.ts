export interface KosFoto {
  id?: number;
  kos_id: number;
  // backend may return either `foto_Url` or `fotoUrl` — accept both for TypeScript
  foto_Url?: string;
  fotoUrl?: string;
  fotoUrlPath?: string;
  is_thumbnail?: boolean;
}