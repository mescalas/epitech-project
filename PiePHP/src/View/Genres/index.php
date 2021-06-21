<h1>Genres index</h1>

<input type="button" id="button" name="addGenres" value="Add a genre"
       onclick="location.href = 'http://localhost:8888/PiePHP/genres/add';">
<input type="button" id="button" name="accueil" value="Accueil" onclick="location.href = '../'">
<br>
<br>
<h2>Genre : </h2>
<ul>
    <?php
    for ($i = 0; $i < count($result); $i++) {
        echo '<li><a class="a_genres" href="http://localhost:8888/PiePHP/genres/search/' . $result[$i]['id_genre'] . '">' . ucfirst($result[$i]['nom']) . '</a></li>';
    } ?>
</ul>
