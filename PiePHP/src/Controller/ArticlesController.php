<?php


namespace Controller;


class ArticlesController extends \Core\Controller
{
    public function indexAction()
    {
        $this->render('index');
    }

    public function readAction()
    {
        $this->render('read');
        $request = $this->request->getParams();
        $model = new \Model\ArticlesModel();
        if (isset($_POST) && !empty($_POST)) {
            $result = $model->read($request, [['has many' => 'comments']]);
            print_r($result);
        }

    }

    public function findAction()
    {
        $this->render('read');
        $request = $this->request->getParams();
        $model = new \Model\ArticlesModel();
        if ($_POST){
            $result = $model->find([
                'WHERE' => '1',
                'ORDER BY' => 'id ASC',
                'LIMIT' => '',
            ], [['has many' => 'comments']]);
            print_r($result);
        }

    }
}