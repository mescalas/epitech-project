<?php

namespace Core;

class Controller
{
    public static $_render;
    public $request;

    public function __construct()
    {
        $this->request = new Request();
    }

    protected function render( $view, $scope = [] )
    {
        extract( $scope );
        $f = implode( DIRECTORY_SEPARATOR, [dirname( __DIR__ ), 'src', 'View', str_replace( 'Controller', '', str_replace( '\\', '', basename( get_class( $this ) ) ) ), $view] ) . '.php';
        if ( file_exists( $f ) )
        {
            ob_start(); //démarre la temporisation de sortie, tant qu'elle est enclenchée, aucune donnée hormis les en-têtes, n'est envoyée au navigateur, mais mis temporairement mise en tampon.
            include $f;
            $view = ob_get_clean();
            $a = implode( DIRECTORY_SEPARATOR, [dirname( __DIR__ ), 'src', 'View', 'index'] ) . '.php';
            ob_start(); // tampons de sortie gérés par piles, on peut appeler plusieurs fois ob_start()
            include $a;
            self::$_render = ob_get_clean();
        }
    }

    public function __destruct()
    {
        echo self::$_render;
    }
}