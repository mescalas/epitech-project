<h1>Search Films</h1>

<form method="POST" id="form_search_film">
    <input type="submit" id="button" name="modifGenres" value="Modify the genre">
    <input type="submit" id="button" name="deleteGenres" value="Delete the genre">
    <input type="button" id="button" name="accueil" value="Accueil Genres"
           onclick="location.href = '../'">

</form>


<?php
echo '<h2>Genre : ' . ucfirst($result[0]['nom']) . '</h2>';
if (count($result[1]) > 0) {
    for ($i = 0; $i < count($result[1]); $i++) {
        echo "<div id='result'>";
        echo "<div id='title'>";
        echo '<p><a href="http://localhost:8888/PiePHP/films/search/' . $result[1][$i]['id_film'] . '"><b>Title : </b>' . $result[1][$i]['titre'] . '</a></p>';
        echo "</div>";
        echo '<p><b>Resum : </b>' . $result[1][$i]['resum'] . '</p>';
        echo '<p><b>Genre : </b>' . ucfirst($result[1][$i]['nom']) . '</p>';
        echo '<p><b>Duration : </b>' . $result[1][$i]['duree_min'] . ' minutes </p>';
        echo '<p><b>Year of production : </b>' . $result[1][$i]['annee_prod'] . '</p>';
        echo "</div>";
    }
} else {
    echo '<h2>Empty</h2>';
}


if (isset($_POST['deleteGenres'])) {
    header("Location: http://localhost:8888/PiePHP/genres/delete/" . $id, TRUE, 301);
} else if (isset($_POST['modifGenres'])) {
    header("Location: http://localhost:8888/PiePHP/genres/modif/" . $id, TRUE, 301);
}
?>


