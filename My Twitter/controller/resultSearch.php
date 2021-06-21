<?php
require_once '../model/resultSearch.php';
$result = new Result();
$result->connect_to_db();
$result->search($_POST["token"]);