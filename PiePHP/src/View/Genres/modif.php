<h1>Modif Genres</h1>
<input type="button" id="button" name="accueil" value="Accueil" onclick="location.href = '../'">

<?php
echo '<h2> Genre : ' . ucfirst($result[0]['nom']) . '</h2>';
?>

<p><b>All fields must be completed</b></p>

<div id="modif_genres">
    <form method="POST">
        <div id="label_modif_genres">
            <p><b>New name :</b></p>
        </div>
        <div id="input_modif_genres">
            <input type="text" name="nom" required>
        </div>
        <input type="submit" id="button">
    </form>
</div>