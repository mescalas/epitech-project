<h1>Modif Film</h1>
<input type="button" id="button" name="accueil" value="Accueil Film" onclick="location.href = '../'">
<br>
<br>
<?php
echo "<div id='result'>";
echo "<div id='title'>";
echo '<p><b>Title : </b>' . $result[1][0]['titre'] . '</p>';
echo "</div>";
echo '<p><b>Resum : </b>' . $result[1][0]['resum'] . '</p>';
echo '<p><b>Genre : </b>' . $result[1][0]['nom'] . '</p>';
echo '<p><b>Duration : </b>' . $result[1][0]['duree_min'] . ' minutes </p>';
echo '<p><b>Year of production : </b>' . $result[1][0]['annee_prod'] . '</p>';
echo "</div>";

if (isset($_POST['form_modif_film']) && !empty($_POST['form_modif_film'])) {
	header("Location: http://localhost:8888/PiePHP/films/search/" . $result[1][0]['id_film'], TRUE, 301);
}
?>


<p><b>All fields must be completed</b></p>

<div id="add_film">
    <form method="POST" id="form_modif_film">
        <div id="label_add_film">
            <p><b>Title :</b></p>
            <p><b> Resum :</b></p>
            <p><b> Duration : </b></p>
            <p><b> Year of production :</b></p>
            <p><b> Genre :</b></p>
        </div>
        <div id="input_add_film">
            <input type="text" name="titre" value="<?= $result[1][0]['titre'] ?>" required>
            <input type="text" name="resum" value="<?= $result[1][0]['resum'] ?>" required>
            <input type="text" name="duree_min" value="<?= $result[1][0]['duree_min'] ?>" required>
            <input type="text" name="annee_prod" value="<?= $result[1][0]['annee_prod'] ?>"
                   required>
            <select name="id_genre" id="id_genre">
                <option value="">Choose one genre for your film...</option>
                <option value="0">Detective</option>
                <option value="1">Dramatic Comedy</option>
                <option value="2">Science fiction</option>
                <option value="3">Drama</option>
                <option value="4">Documentary</option>
                <option value="5">Animation</option>
                <option value="6">Comedy</option>
                <option value="7">Fantasy</option>
                <option value="8">Action</option>
                <option value="9">Thriller</option>
                <option value="10">Adventure</option>
                <option value="11">Various</option>
                <option value="12">Historical</option>
                <option value="13">Romance</option>
                <option value="14">Western</option>
                <option value="15">Music</option>
                <option value="16">Musical</option>
                <option value="17">Horror</option>
                <option value="18">War</option>
                <option value="19">Unknow</option>
                <option value="20">Spying</option>
                <option value="21">Historical Epic</option>
                <option value="22">Biography</option>
                <option value="23">Experimental</option>
                <option value="24">Short Film</option>
                <option value="25">Erotic</option>
                <option value="26">Karate</option>
                <option value="27">Program</option>
                <option value="28">Family</option>
                <option value="29">Experimental</option>
            </select>

        </div>
        <input type="submit" id="button">
    </form>
</div>

