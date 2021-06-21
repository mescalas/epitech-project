<?php


namespace Controller;


class HistoriqueController extends \Core\Controller
{
    public function indexAction()
    {
        $model = new \Model\HistoriqueModel();
        $result = $model->showHistorique($_SESSION['id']);
        $this->render('index', ['result' => $result]);

    }

    public function deleteAction($id = null)
    {
        $model = new \Model\HistoriqueModel();
        $model->deleteHistorique($_SESSION['id'], $id);
        header("Location: http://localhost:8888/PiePHP/historique/", TRUE, 301);
    }

    public function addAction($id = null)
    {
        $model = new \Model\HistoriqueModel();
        $model->addHistorique($_SESSION['id'], $id);
        echo "<script>alert(\"Successfully added to your history\")</script>";
        header("Location: http://localhost:8888/PiePHP/films/search/".$id, TRUE, 301);


    }
}