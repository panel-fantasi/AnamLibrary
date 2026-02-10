// Cek status login
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// Fungsi Logout
function logout() {
  const konfirmasi = confirm("Apakah Anda Yakin Ingin Logout?");
  
  if (konfirmasi) {
    localStorage.removeItem("isLoggedIn");
    window.location.replace("login.html");
  }
}
