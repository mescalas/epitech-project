<?php

namespace Core;

class Router
{
    private static $routes;

    public static function connect($url, $route)
    {
        self::$routes[$url] = $route;
    }

    public static function get($url)
    {
        if (isset(self::$routes[$url])) {
            return self::$routes[$url];
        } else {
            return '404';
        }
    }

    public static function getDynamic($url)
    {
        $res = explode('/', $url);
        if (!isset($res[2])) {
            $res[2] = 'index';
        }
        if (isset($res[3])) {
            $result = ['controller' => $res[1], 'action' => $res[2], 'params' => $res[3]];
        } else {
            $result = ['controller' => $res[1], 'action' => $res[2], 'params' => ''];
        }

        return $result;
    }

}