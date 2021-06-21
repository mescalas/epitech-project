<?php

//TODO Créer des méthodes dans le model qui instancie l'ORM. Retourner voir Enes car c'est la merde.

namespace Core;

class Entity
{
    protected $tableName;
    protected $params;
    protected $keys;

    public function __construct($table, $params = [], $relations = [])
    {
        $this->tableName = $table;

        if (!isset($params)) {
            return;
        }
        if (!is_array($params)) {
            $ORM = new \Core\ORM;
            $params = $ORM->read($table, $params);
        }

        foreach ($params as $key => $value) {
            $this->$key = $value;
        }
        $this->keys = array_keys($params);
    }


    public function save()
    {
        $data = [];
        $ORM = new \Core\ORM;
        foreach ($this->keys as $key) {
            $data[$key] = $this->$key;
        }
        if (!array_key_exists('id', $data)) {

            $result = $ORM->create($this->tableName, $data);
            return $result;
        } else {
            unset($data['id']);
            $ORM->update($this->tableName, $this->id, $data);
        }
    }
}

?>