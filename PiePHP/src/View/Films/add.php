<h1>Add a film : </h1>

<p><b>All fields are required !</b></p>
<div id="add_film">
    <form method="post" action='/PiePHP/films/add'>
        <div id="label_add_film">
            <p><b>Title :</b></p>
            <p><b> Resum :</b></p>
            <p><b> Duration : </b></p>
            <p><b> Year of production :</b></p>
            <p><b> Genre :</b></p>
        </div>
        <div id="input_add_film">
            <input type="text" name="titre" required>
            <input type="text" name="resum" required>
            <input type="text" name="duree_min" required>
            <input type="text" name="annee_prod" required>
            <select name="id_genre" id="id_genre">
                <option value="">Choose one genre for your film...</option>
                <option value="1">Detective</option>
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
