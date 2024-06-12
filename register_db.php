<?php
session_start();
include('koneksi.php');

$errors = array();

if (isset($_POST['reg_user'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }

    if (count($errors) == 0) {
        $user_check_query = "SELECT * FROM users WHERE username='$username'";
        $query = mysqli_query($conn, $user_check_query);
        if (!$query) {
            $error_message = "Database error: " . mysqli_error($conn);
            
            exit(); 
        }
        $result = mysqli_fetch_assoc($query);

        if ($result) { // if user exists
            if ($result['username'] === $username) {
                array_push($errors, "Username already exists");
            }
        }

        if (count($errors) == 0) {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT); 

            $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";
            if (mysqli_query($conn, $sql)) {
                $_SESSION['username'] = $username;
                $_SESSION['success'] = "You are now logged in";
                header('location: login.php');
                exit();
            } else {
                $error_message = "Database error: " . mysqli_error($conn);
                
                exit(); 
            }
        } else {
            $_SESSION['error'] = implode(', ', $errors);
            header('location: register.php');
            exit();
        }
    } else {
        $_SESSION['error'] = implode(', ', $errors);
        header('location: register.php');
        exit();
    }
}
?>
