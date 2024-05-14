<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    echo "<h1>Ola mundo</h1>";
    $nome = $_POST["nome"];
    $endereco =$_POST["endereco"];
    echo $nome;
    echo '<p>Voce mora na rua</p>';
    echo $endereco;
    ?>
</body>
</html>