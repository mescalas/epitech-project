<?php


namespace Controller;


class FilmsController extends \Core\Controller
{
    public function indexAction()
    {
        $model = new \Model\FilmsModel();
        $result = $model->find($params = [], [['has one' => 'genre']]);
        $this->render('index', ['result' => $result]);
    }

    public function searchAction($id = null)
    {
        $model = new \Model\FilmsModel();
        $result = $model->read($id, [['has one' => 'genre']]);
        $this->render('search', ['id' => $id, 'result' => $result]);
    }

    public function deleteAction($id = null)
    {
        $model = new \Model\FilmsModel();
        $model->delete($id);
        header("Location: http://localhost:8888/PiePHP/films/", TRUE, 301);
    }

    public function modifAction($id = null)
    {
        if (isset($_POST) && !empty($_POST)) {
            $request = $this->request->getParams();
            $model = new \Model\FilmsModel();
            $model->update($id, $request);
        }
        $model = new \Model\FilmsModel();
        $result = $model->read($id, [['has one' => 'genre']]);
        $this->render('modif', ['id' => $id, 'result' => $result]);
    }

    public function addAction()
    {
        $this->render('add');
        if (isset($_POST) && !empty($_POST)) {
            $request = $this->request->getParams();
            $model = new \Model\FilmsModel();
            $result = $model->create($request);
            header("Location: http://localhost:8888/PiePHP/films/search/".$result, TRUE, 301);

        }

    }


}