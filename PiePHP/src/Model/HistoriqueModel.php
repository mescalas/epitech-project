<?php


namespace Model;

use PDO;


class HistoriqueModel extends \Core\Model
{
    private $bdd;

    public function __construct($params = [], $relations = [])
    {
        parent::__construct('historique', $params);
        $this->bdd = new PDO('mysql:host=localhost;dbname=cinema', 'root', 'root');
    }

    public function showHistorique($id)
    {
        $request = $this->bdd->prepare("SELECT genre.nom, film.id_film, film.titre, film.resum, film.duree_min, film.annee_prod FROM historique LEFT JOIN film ON historique.id_film = film.id_film LEFT JOIN genre ON genre.id_genre = film.id_genre WHERE historique.id_user={$id}");
        $request->execute();
        $resultat = $request->fetchAll(PDO::FETCH_ASSOC);
        return $resultat;
    }

    public function deleteHistorique($id, $id_film)
    {
        $request = $this->bdd->prepare("DELETE FROM historique where id_user = {$id} AND id_film = {$id_film}");
        $request->execute();
    }

    public function addHistorique($id, $id_film){
        $request = $this->bdd->prepare("INSERT INTO historique(id_user, id_film) VALUES ($id, $id_film)");
        $request->execute();
    }
}