<?php
$error=filter_input(INPUT_GET,'err',$filter= FILTER_SANITIZE_STRING);
if(!$error){
    $error = 'Oops! An unknown error happend.';
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Secure Login:Error</title>
    <link rel="stylesheet" href="styles/main.css"/>
</head>
<body>
  <h1>There was a problem</h1>
  <p>class="error"><?php echo $error;?></p>  
</body>
</html>