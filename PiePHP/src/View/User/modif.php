<h1>Modify your profil</h1>
<div id="modif_profil">
    <form action='/PiePHP/user/modif' method="POST">
        <div id="email_header">
            <p><b>Email</b></p>
        </div>
        <input type="email" placeholder="New email" name="email" required>
        <div id="password_header">
            <p><b>Password</b></p>
        </div>
        <input type="password" placeholder="New password" name="password" required>
        <input type="submit" id='submit' value='Confirm Changes'
               onclick="location.href = 'http://localhost:8888/PiePHP/user/profil';">
    </form>
</div>
