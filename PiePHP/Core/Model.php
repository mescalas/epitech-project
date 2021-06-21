<?php

namespace Core;


class Model extends Entity
{
    public $pdo;

    public function __construct($table, $params = [], $relations = [])
    {
        parent::__construct($table, $params, $relations);
    }

    public function find($params, $relations = [])
    {
        $orm = new \Core\ORM();
        $result = $orm->find($this->tableName, $params, $relations);
        return $result;
    }

    public function read($params, $relations = [])
    {
        $orm = new \Core\ORM();
        $result = $orm->read($this->tableName, $params, $relations);
        return $result;
    }

    public function delete($params)
    {
        $orm = new \Core\ORM();
        $result = $orm->delete($this->tableName, $params);
        return $result;
    }

    public function update($id, $params)
    {
        $orm = new \Core\ORM();
        $result = $orm->update($this->tableName, $id, $params);
        return $result;

    }

    public function create($params)
    {
        $orm = new \Core\ORM();
        $result = $orm->create($this->tableName, $params);
        return $result;
    }
}