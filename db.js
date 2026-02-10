// DATABASE PERPUSTAKAAN (IndexedDB + Dexie)

const db = new Dexie("AnamLibrary");

db.version(1).stores({
  buku: "++id,isbn,judul,penulis",
  anggota: "++id,nis,nama,kelas",
  transaksi: "++id,judul,nama,status,tgl_pinjam,tgl_kembali,denda"
});