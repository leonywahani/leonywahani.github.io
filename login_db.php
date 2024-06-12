<?php 
session_start();
include('koneksi.php');

$errors = array();

if (isset($_POST['login_user'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if (empty($username) || empty($password)) {
        array_push($errors, "Username and Password are required");
    }

    if (count($errors) == 0) {
        $query = "SELECT * FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_assoc($result);
            if (password_verify($password, $row['password'])) { // Menggunakan password_verify untuk memeriksa password
                $_SESSION['username'] = $username;
                $_SESSION['success'] = "Your are now logged in";
                header("location: index.php");
                exit();
            } else {
                array_push($errors, "Wrong Password");
            }
        } else {
            array_push($errors, "Username not found");
        }
    }

    $_SESSION['error'] = implode(', ', $errors);
    header("location: login.php");
    exit();
}
?>
