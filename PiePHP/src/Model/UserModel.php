<?php

namespace Model;


class UserModel extends \Core\Model
{
    public function __construct($params = [], $relations = [])
    {
        parent::__construct('users', $params);
    }

    public function login($params, $relations = [])
    {
        $orm = new \Core\ORM();
        $result = $orm->login($this->tableName, $params, $relations);
        return $result;
    }

    public function register($params){
        $orm = new \Core\ORM();
        $result = $orm->register($this->tableName, $params);
        return $result;
    }

}