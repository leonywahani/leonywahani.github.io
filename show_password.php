<?php
$servername = 'localhost';
$username = 'root';
$password = ''; 
$dbname = 'bookzen';

// Membuat koneksi
$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}

// Query untuk mengambil data dari tabel
$sql = "SELECT password FROM users";
$result = mysqli_query($conn, $sql);

// Periksa apakah query berhasil dieksekusi
if ($result) {
    // Loop melalui hasil query
    while ($row = mysqli_fetch_assoc($result)) {
        // Tampilkan password
        echo $row['password'] . "<br>";
    }
} else {
    echo "Error: " . mysqli_error($conn);
}

// Tutup koneksi
mysqli_close($conn);
?>
