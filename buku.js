// SIMPAN DATA BUKU
async function simpanBuku() {
  const isbn = document.getElementById("isbn").value;
  const judul = document.getElementById("judul").value;
  const penulis = document.getElementById("penulis").value;

  // Validasi sederhana
  if (!isbn || !judul || !penulis) {
    alert("Semua field harus diisi!");
    return;
  }

  await db.buku.add({
    isbn: isbn,
    judul: judul,
    penulis: penulis
  });

  alert(`Data buku "${judul}" berhasil disimpan!`);

  // Reset Form
  document.getElementById("isbn").value = "";
  document.getElementById("judul").value = "";
  document.getElementById("penulis").value = "";

  tampilkanBuku();
}

// TAMPILKAN DATA BUKU
async function tampilkanBuku() {
  const data = await db.buku.toArray();
  const tabel = document.getElementById("tabelBuku");

  let html = "";
  data.forEach((b) => {
    html += `
      <tr>
        <td>${b.id}</td> <td>${b.isbn}</td>
        <td>${b.judul}</td>
        <td>${b.penulis}</td>
        <td>
          <button onclick="hapusBuku(${b.id})" style="background-color: #f44336; color: white; border: none; padding: 5px 10px; cursor: pointer;">Hapus</button>
        </td>
      </tr>
    `;
  });

  // Jika data kosong, tampilkan pesan di dalam tabel
  if (data.length === 0) {
    html = '<tr><td colspan="5" style="text-align:center;">Data buku masih kosong.</td></tr>';
  }

  tabel.innerHTML = html;
}

// HAPUS DATA BUKU
async function hapusBuku(id) {
  const konfirmasi = confirm('Apakah Anda yakin ingin menghapus data buku ini?');
  if (konfirmasi) {
    await db.buku.delete(id);
    tampilkanBuku();
  }
}


document.addEventListener("DOMContentLoaded", tampilkanBuku);