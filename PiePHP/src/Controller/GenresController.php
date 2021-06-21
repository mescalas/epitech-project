<?php


namespace Controller;


class GenresController extends \Core\Controller
{
    public function indexAction()
    {
        $model = new \Model\GenresModel();
        $result = $model->find($params = []);
        $this->render('index', ['result' => $result]);
    }

    public function searchAction($id = null)
    {
        $model = new \Model\GenresModel();
        $result = $model->read($id, [['has many' => 'film']]);
        $this->render('search', ['id' => $id, 'result' => $result]);
    }

    public function modifAction($id = null)
    {
        if (isset($_POST) && !empty($_POST)) {
            $request = $this->request->getParams();
            $model = new \Model\GenresModel();
            $model->update($id, $request);
            header("Location: http://localhost:8888/PiePHP/genres/", TRUE, 301);

        }
        $model = new \Model\GenresModel();
        $result = $model->read($id);
        $this->render('modif', ['id' => $id, 'result' => $result]);

    }

    public function addAction()
    {
        $this->render('add');
        if (isset($_POST) && !empty($_POST)) {
            $request = $this->request->getParams();
            $model = new \Model\GenresModel();
            $result = $model->create($request);
            header("Location: http://localhost:8888/PiePHP/genres/", TRUE, 301);

        }
    }

    public function deleteAction($id = null)
    {
        $model = new \Model\GenresModel();
        $model->delete($id);
        header("Location: http://localhost:8888/PiePHP/genres/", TRUE, 301);
    }
}