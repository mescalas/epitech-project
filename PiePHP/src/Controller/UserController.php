<?php

namespace Controller;

class UserController extends \Core\Controller
{
    public function IndexAction()
    {
        $this->render('index');
    }

    public function profilAction()
    {
        $model = new \Model\UserModel();
        $result = $model->read($_SESSION['id']);
        $this->render('profil', ['result'=>$result]);
    }

    public function modifAction(){
        $this->render('modif');

        if (isset($_POST) && !empty($_POST)){
            $request = $this->request->getParams();
            $model = new \Model\UserModel();
            $model->update($_SESSION['id'], $request);
            header("Location: http://localhost:8888/PiePHP/user/profil", TRUE, 301);

        }
    }


    public function registerAction()
    {
        {
            $this->render('register');
            if (!empty($_POST)) {
                $request = $this->request->getParams();
                $model = new \Model\UserModel($request);
                $result = $model->save();
                $_SESSION['id'] = $result;
                header("Location: http://localhost:8888/PiePHP/user/profil", TRUE, 301);


            }

        }
    }

    public function deleteAction()
    {
    $model = new \Model\UserModel;
    $model->delete($_SESSION['id']);
    header("Location: http://localhost:8888/PiePHP/user/login", TRUE, 301);


    }

    public function readAction()
    {
        $this->render('read');
        $request = $this->request->getParams();
        $model = new \Model\UserModel();
        $result = $model->read($request, [['has many' => 'comments']]);
        echo '<pre>';
        print_r($result);
        echo '</pre>';
    }

    public function loginAction()
    {
        $this->render('login');
        if (!empty($_POST)) {
            $login = new \Model\UserModel();
            $request = $this->request->getParams();
            $result = $login->login($request);
            if (count($result) == 0) {
                $this->render('login', ['error' => 'Invalid password']);
            } else {
                $_SESSION['id'] = $result[0]['id_users'];
                header("Location: http://localhost:8888/PiePHP/user/profil", TRUE, 301);

            }
        }
    }

    public function createAction()
    {
        $orm = new \Core\ORM();
        $result = $orm->create('articles', [
            'titre' => 'epitech i like it',
            'content' => 'psahtek epitech',
            'author' => 'Matéo',
        ]);
        print_r($result);
    }


    public function updateAction()
    {
        $orm = new \Core\ORM();
        $result = $orm->update('articles', 11, [
            'titre' => 'vive epitech',
            'content' => 'pedagogie active',
            'author' => 'Matéo',
        ]);
        print_r($result);
    }

    public function findAction()
    {
        $orm = new \Core\ORM();
        $result = $orm->find('comments', [
            'WHERE' => '1',
            'ORDER BY' => 'id ASC',
            'LIMIT' => '',
        ], [['has one' => 'articles']]);
        print_r($result);
    }
}