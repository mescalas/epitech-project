<?php

namespace Core;

class Core
{
    public $url;

    public function run()
    {
        require_once implode(DIRECTORY_SEPARATOR, ['src', 'routes.php']);
        // choix du type de router que l'on souhaite utiliser
        try {
            $result = $this->dynamicRouter(); //$this->staticRouter();
        } catch (\Exception) {
            die('404');
        }
        $controllerName = ucfirst($result['controller']) . 'Controller';
        $actionName = ucfirst($result['action'] . 'Action');
        //vérification de la présences du controller
        if (!file_exists('./src/Controller/' . $controllerName . '.php')) {
            $controllerName = 'AppController';
        }
        //vérification de la présence de la méthode dans le controller. Changement de namespace.
        $controllerName = '\Controller\\' . $controllerName;
        if (!method_exists($controllerName, $actionName)) {
            $actionName = 'IndexAction';
        }
        $controller = new $controllerName();
        $controller->$actionName($result['params']);
    }

    public function dynamicRouter()
    {
        $uri = str_replace(BASE_URI, '', $_SERVER['REQUEST_URI']);
        $route = Router::getDynamic($uri);

        return $route;
    }

    public function staticRouter()
    {
        $uri = str_replace(BASE_URI, '', $_SERVER['REQUEST_URI']);
        $route = Router::get($uri);

        return $route;
    }
}