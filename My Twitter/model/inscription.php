<?php

require_once 'bdd.php';

class Inscription extends MyDatabase {

    public function do_user_exist($email){
        $stmt = $this->pdo->prepare("SELECT token FROM user WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $result = $stmt->fetch();

        if(!empty($result)){
           return true; 
        } else {
            return false;
        }
    }    
    
    public function add_user_to_db($username, $arobase, $birthday, $email, $hash_mdp, $token){
        $stmt = $this->pdo->prepare("INSERT INTO `user`(`username`, `arobase`, `date_de_naissance`, `email`, `mot_de_passe`, `token`) 
        VALUES (:username, :arobase, :birthday, :email, :mdp, :token);
        SET @user_id = LAST_INSERT_ID();
        INSERT INTO `photo_de_profil`(`image_url`, `id_user`) VALUES ('http://localhost:8888/tweet_academie/view/upload/photo/profil.png', @user_id);
        INSERT INTO `cover`(`cover_url`, `id_user`) VALUES ('http://localhost:8888/tweet_academie/view/upload/cover/cover.png', @user_id);");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':arobase', $arobase);
        $stmt->bindParam(':birthday', $birthday);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':mdp', $hash_mdp);
        $stmt->bindParam(':token', $token);
        $stmt->execute();
    }
}