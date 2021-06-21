<h1>Search Films</h1>

<?php
echo "<div id='result'>";
echo "<div id='title'>";
echo '<p><b>Title : </b>' . $result[1][0]['titre'] . '</p>';
echo "</div>";
echo '<p><b>Resum : </b>' . $result[1][0]['resum'] . '</p>';
echo '<p><b>Genre : </b>' . ucfirst($result[1][0]['nom']) . '</p>';
echo '<p><b>Duration : </b>' . $result[1][0]['duree_min'] . ' minutes </p>';
echo '<p><b>Year of production : </b>' . $result[1][0]['annee_prod'] . '</p>';
echo "</div>";

if (isset($_POST['deleteFilm'])) {
    header("Location: http://localhost:8888/PiePHP/films/delete/" . $id, TRUE, 301);
} else if (isset($_POST['modifFilm'])) {
    header("Location: http://localhost:8888/PiePHP/films/modif/" . $id, TRUE, 301);
} else if (isset($_POST['addFilm'])) {
    header("Location: http://localhost:8888/PiePHP/historique/add/" . $id, TRUE, 301);
}

?>
<form method="POST" id="form_search_film">
    <input type="submit" id="button" name="modifFilm" value="Modify the film">
    <input type="submit" id="button" name=deleteFilm value="Delete the film">
    <input type="submit" id="button" name=addFilm value="Add to your historical">
</form>
<input type="button" id="button" name="accueil" value="Accueil Films"
       onclick="location.href = '../'">


