<?php


namespace Model;


class GenresModel extends \Core\Model
{
    public function __construct($params = [], $relations = [])
    {
        parent::__construct('genre', $params);
    }
}