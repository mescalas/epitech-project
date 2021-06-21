<h1>Profil User</h1>
<div id="wrapper1">
    <div id="email_header">
        <h3>Email : </h3>
    </div>
    <div id="email">
        <p><?= $result[0]['email'] ?></p>
    </div>
    <div id="password_header">
        <h3>Password : </h3>
    </div>
    <div id="password">
        <p><?= $result[0]['password'] ?></p>
    </div>
</div>
<form method="post" id="wrapper2">
    <input type="button" id="button" value="Delete this account"
           onclick="location.href = 'http://localhost:8888/PiePHP/user/delete';">
    <input type="submit" id="button" name="modif" value="Modify this account">
    <input type="button" id="button" name="accueil" value="Accueil" onclick="location.href = '../'">
</form>

<?php
if (isset($_POST['modif'])) {
    header("Location: http://localhost:8888/PiePHP/user/modif/" . $result[0]['id_users'], TRUE, 301);
}
?>


