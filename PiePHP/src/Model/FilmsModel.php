<?php


namespace Model;


class FilmsModel extends \Core\Model
{
    public function __construct($params = [], $relations = [])
    {
        parent::__construct('film', $params);
    }
}