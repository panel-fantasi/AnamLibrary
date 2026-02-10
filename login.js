if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.replace("index.html");
}

// Fungsi Login
function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("password").value;

  // Cek kredensial yang ditentukan
  if (user === "admin" && pass === "admin") {
    // Simpan status login di browser
    localStorage.setItem("isLoggedIn", "true");
    alert("Anda Berhasil Login Sebagai Admin!");
    window.location.replace("index.html");
  } else {
    alert("Username atau Password salah!");
  }
}