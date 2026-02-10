// SIMPAN DATA ANGGOTA
async function simpanAnggota() {
  const nis = document.getElementById("nis").value;
  const nama = document.getElementById("nama").value;
  const kelas = document.getElementById("kelas").value;
  
  // Validasi sederhana
  if (!nis || !nama || !kelas) {
    alert("Semua field harus diisi!");
    return;
  }

  await db.anggota.add({
    nis,
    nama,
    kelas
  });

  alert(nama + " berhasil menjadi anggota!");

  document.getElementById("nis").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("kelas").value = "";

  tampilkanAnggota();
}

// TAMPILKAN DATA ANGGOTA
async function tampilkanAnggota() {
  const data = await db.anggota.toArray();
  const tabel = document.getElementById("tabelAnggota");

  let html = "";
  data.forEach((a) => {
    html += `
      <tr>
        <td>${a.id}</td> <td>${a.nis}</td>
        <td>${a.nama}</td>
        <td>${a.kelas}</td>
        <td>
          <button onclick="hapusAnggota(${a.id})" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer;">Hapus</button>
        </td>
      </tr>
    `;
  });
  
  // Jika data kosong, tampilkan pesan di dalam tabel
  if (data.length === 0) {
    html = '<tr><td colspan="5" style="text-align:center;">Data anggota masih kosong.</td></tr>';
  }

  tabel.innerHTML = html;
}

// HAPUS DATA ANGGOTA
async function hapusAnggota(id) {
  const konfirmasi = confirm('Apakah Anda yakin ingin menghapus data anggota ini?');
  if (konfirmasi) {
    await db.anggota.delete(id);
    tampilkanAnggota();
  }
}

document.addEventListener("DOMContentLoaded", tampilkanAnggota);