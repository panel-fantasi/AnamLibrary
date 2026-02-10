async function tampilkanLaporan() {
  const data = await db.transaksi.toArray();
  const tabel = document.getElementById("tabelLaporan");

  let html = "";
  data.forEach((t) => {
    html += `
      <tr>
        <td>${t.judul}</td>
        <td>${t.nama}</td>
        <td>${t.status}</td>
        <td>${t.tgl_pinjam}</td>
        <td>${t.tgl_kembali}</td>
      </tr>
    `;
  });
  
  // Jika data kosong, tampilkan pesan di dalam tabel
  if (data.length === 0) {
    html = '<tr><td colspan="5" style="text-align:center;">Data laporan masih kosong.</td></tr>';
  }

  tabel.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", tampilkanLaporan);

// FUNGSI PRINT
function printLaporan() {
  window.print();
  
  tampilkanLaporan();
}