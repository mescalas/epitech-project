<?php

namespace Core;

class Request
{
    public $query = [];

    public function __construct()
    {

        if ($_POST) {
            foreach ($_POST as $key => $value) {
                $this->query[$key] = trim(htmlspecialchars(stripslashes($value)));
            }
        } else if ($_GET) {
            foreach ($_GET as $key => $value) {
                $this->query[$key] = trim(htmlspecialchars(stripslashes($value)));
            }
        }
    }

    public function getParams()
    {
        return $this->query;
    }
}