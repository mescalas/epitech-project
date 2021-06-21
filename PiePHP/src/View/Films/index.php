<h1>Films Index</h1>

<div id="buttons_film_index">
<input type="button" id="button" name="addFilm" value="Add a film"
       onclick="location.href = 'http://localhost:8888/PiePHP/films/add';">
<input type="button" id="button" name="accueil" value="Accueil" onclick="location.href = '../'">
</div>
<?php
for ($i = 0; $i < count($result); $i++) {
    echo "<div id='result'>";
    echo "<div id='title'>";
    echo '<p><a href="http://localhost:8888/PiePHP/films/search/' . $result[$i]['id_film'] . '"><b>Title : </b>' . $result[$i]['titre'] . '</a></p>';
    echo "</div>";
    echo '<p><b>Resum : </b>' . $result[$i]['resum'] . '</p>';
    echo '<p><b>Genre : </b>' . ucfirst($result[$i]['nom']). '</p>';
    echo '<p><b>Duration : </b>' . $result[$i]['duree_min'] . ' minutes </p>';
    echo '<p><b>Year of production : </b>' . $result[$i]['annee_prod'] . '</p>';
    echo "</div>";
} ?>


