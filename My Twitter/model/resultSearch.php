<?php

require_once 'bdd.php';

class Result extends MyDatabase
{
    public function search($token)
    {
        //$req = "SELECT username, arobase, biographie, tweet.contenu tweet. FROM user WHERE token = '{$token}'";
        $req = "SELECT username, arobase, biographie, tweet.contenu ,tweet.date_tweet FROM user 
                INNER JOIN tweet ON tweet.id_user = user.id_user 
                WHERE token = '{$token}'";
        $res = $this->pdo->query($req);
        $donnes = $res->fetchAll();
        echo json_encode($donnes);
    }

    public function checkResult($key)
    {
        header('Location: ./../view/html/result.php?k=' . urlencode($key));
    }
}
