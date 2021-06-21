<?php


namespace Model;


class ArticlesModel extends \Core\Model
{
    public function __construct($params = [], $relations = [])
    {
        parent::__construct('articles', $params);
    }
}