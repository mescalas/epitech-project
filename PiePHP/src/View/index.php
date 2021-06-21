<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/PiePHP/webroot/css/stylesheet.css">
    <title>Pie PHP</title>
</head>
<body>
<?php if (isset($error)) {
    echo $error;
} else if (isset($success)) {
    echo $success;
}
?>
<?= $view ?>
</body>
</html>