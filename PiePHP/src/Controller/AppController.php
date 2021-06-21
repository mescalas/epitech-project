<?php

namespace Controller;

class AppController extends \Core\Controller
{

    public function IndexAction()
    {
        $this->render( 'index' );
    }

    public function testAction()
    {
        $orm = new \Core\ORM();
        $result = $orm->create( 'articles', [
            'titre'   => 'un super titre',
            'content' => 'et voici une super article de blog',
            'author'  => 'Rodrigue',
        ] );
        echo $result;
    }

}