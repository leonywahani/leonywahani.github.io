<?php
    session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BookZen</title>

    <link rel="stylesheet" href="login.css">
    <script src="login.js"></script>
</head>
<body>
    
<div id="login-container">
        <div class="tengah">
            <h1>Login</h1>
            <form method="post" action="index.php" > 
    <input id="username" name="username" type="text" placeholder="Username" required> 
    <input id="password" name="password" type="password" placeholder="Password" required> 
    <button type="submit" id="button-login" name="login_user">Login</button> 
    <p>Don't have an account? <a href="register.php">Register</a></p>
</form>
        </div>
    </div>
</body>
</html>
