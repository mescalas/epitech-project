<?php

require_once '../model/my_h5ai.php';

$path   = $_GET['path'];
$object = new my_H5AI( $path );
$files  = $object->getFolders( $path );
print_r( $files );
