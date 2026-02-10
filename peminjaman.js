// LOAD SELECT OPTION
async function loadSelect() {
  const buku = await db.buku.toArray();
  const anggota = await db.anggota.toArray();

  let opsiBuku = "";
  buku.forEach((b) => {
    opsiBuku += `<option value="${b.judul}">${b.judul}</option>`;
  });

  let opsiAnggota = "";
  anggota.forEach((a) => {
    opsiAnggota += `<option value="${a.nama}">${a.nama}</option>`;
  });

  document.getElementById("pilihBuku").innerHTML = opsiBuku;
  document.getElementById("pilihAnggota").innerHTML = opsiAnggota;
}

// SIMPAN TRANSAKSI PEMINJAMAN
async function simpanTransaksi() {
  const judul = document.getElementById("pilihBuku").value;
  const nama = document.getElementById("pilihAnggota").value;
  const tgl_pinjam = document.getElementById("tgl_pinjam").value;
  const tgl_kembali = document.getElementById("tgl_kembali").value;
  
  // Validasi sederhana
  if (!judul || !nama || !tgl_pinjam || !tgl_kembali) {
    alert("Semua field harus diisi!");
    return;
  }

  await db.transaksi.add({
    judul,
    nama,
    status: "DIPINJAM",
    tgl_pinjam,
    tgl_kembali,
    denda: 0
  });

  alert(`Buku ${judul} berhasil dipinjam oleh ${nama}!`);

  tampilkanTransaksi();
}

// TAMPILKAN TRANSAKSI
async function tampilkanTransaksi() {
  const data = await db.transaksi.toArray();
  const tabel = document.getElementById("tabelTransaksi");

  let html = "";
  data.forEach((t) => {
    // Logika penentuan tombol berdasarkan status
    let tombolAksi = "";
    if (t.status === "DIPINJAM") {
      tombolAksi = `<button onclick="kembalikan(${t.id})">Kembalikan</button>`;
    } else {
      tombolAksi = `<button onclick="hapusTransaksi(${t.id})">Hapus</button>`;
    }

    html += `
      <tr>
        <td>${t.id}</td> <td>${t.judul}</td>
        <td>${t.nama}</td>
        <td><strong>${t.status}</strong></td>
        <td>${t.tgl_pinjam}</td>
        <td>${t.tgl_kembali}</td>
        <td>${tombolAksi}</td>
      </tr>
    `;
  });
  
  // Jika data kosong, tampilkan pesan di dalam tabel
  if (data.length === 0) {
    html = '<tr><td colspan="7" style="text-align:center;">Data peminjaman masih kosong.</td></tr>';
  }

  tabel.innerHTML = html;
}

// PENGEMBALIAN
async function kembalikan(id) {
  await db.transaksi.update(id, {
    status: "KEMBALI"
  });

  tampilkanTransaksi();
}

async function hapusTransaksi(id) {
  const konfirmasi = confirm("Apakah Anda yakin ingin menghapus riwayat peminjaman ini?");
  
  if (konfirmasi) {
    await db.transaksi.delete(id);
    tampilkanTransaksi();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadSelect();
  tampilkanTransaksi();
});