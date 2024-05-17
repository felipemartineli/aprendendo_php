<?php
if(isset($erro))
 echo '<div style="color;#F00">'.$erro.'</div><br/><br/>';
else
 if(isset($sucesso))
  echo '<div style="color;#00f">'.$sucesso.'</div><br/><br/>';



$obj_mysqli = new mysqli("127.0.0.1","root","","tutocrudphp");

if ($obj_mysqli->connect_errno)
{
  echo "Ocorreu um erro ns conexão com o banco de dados";
  exit;
}
mysqli_set_charset($obj_mysqli, 'utf8');

  $id=     -1;
  $nome=   "";
  $email=  "";
  $cidade= "";
  $uf=     "";

//Validando a existência dos dados
if (isset($_POST["nome"]) && isset($_POST["email"]) && isset ($_POST["cidade"]) && ($_POST["uf"]))
{
  if (empty($_POST["nome"]))
        $erro= "Campo nome obrigatório";
  else
  if(empty($_POST["email"]))
    $erro="Campo e-mail obrigatório";
  else
  {
    //realizando o cadastro ou alteração dos dados enviados
    $id= $_post["id"];
    $nome=$_POST["nome"];
    $email=$_POST["email"];
    $cidade=$_POST["cidade"];
    $uf=$_POST["uf"];

    if($id==-1)
    {
      $stmt =$obj_mysqli->prepare("INSERT INTO `cliente` (`nome`,`cidade`,`uf`)VALUES(?,?,?,?)");
      $stmt->bind_param('ssss', $nome, $email, $cidade, $uf);
      
      if(!$stmt->execute())
      {
        $erro= $stmt->error;
      }
      else
      {
        header("Location:cadastro.php");
        exit;
      }
    }

    else
    if(is_numeric($id) && $id>=1)
    {
      $stmt =$obj_mysqli->prepare("UPDATE `cliente` SET `nome`=?,`email`=?,`cidade`=?, `uf`=? WHERE id =?");
      $stmt->bind_param('ssssi', $nome, $email, $cidade, $uf, $id);
      if(!$stmt->execute())
      {
        $erro= $stmt->error;
      }
      else
      {
        $erro="Número inválido";

      }
    }
    else
    if(isset($_GET["id"])&& is_numeric($_GET))
    
    if(!$stmt->execute())
    {
      $erro=$stmt->error;
    }
    else
    {
      $sucesso="Dados cadastrados com sucesso";
    }
  }
}

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD com PHP, de forma simples e fácil</title>
</head>
<body>
<form action="<?=$_SERVER["PHP_SELF"]?>" method="post">
       <label>Nome:</label><br>
        <input type="text" name="nome" placeholder="Qual o seu nome?"><br/><br/> 
        E-mail: <br/>
        <input type="email" name="email" placeholder="Qual o seu e-mail?"><br/><br/>
        Cidade: <br/>
        <input type="text" name="cidade" placeholder="Qual a sua cidade?"><br/><br/>
        UF: <br/>
        <input type="text" name="uf" placeholder="UF"> <br/><br/>
        <input type="hidden" value="-1" name="id">
        <button type="submit">Cadastrar</button>
        <!-- criação do formulário com os registros da tabela "clientes" -->
        <br>
        <br>
        <table width="400px" border="0" cellspacing="0">
          <tr>
             <td><strong>#</strong></td>
             <td><strong>Nome</strong></td>
             <td><strong>Email</strong></td>
             <td><strong>Cidade</strong></td>
             <td><strong>UF</strong></td>
             <td><strong>#</strong></td>
          </tr>
          <?php
            $result=$obj_mysqli->query("SELECT*FROM`cliente`");
            while ($aux_query=$result->fetch_assoc())
            {
              echo'<tr>'; 
              echo'<td>'.$aux_query["id"].'</td>';
              echo'<td>'.$aux_query["Nome"].'</td>';
              echo'<td>'.$aux_query["Email"].'</td>';
              echo'<td>'.$aux_query["Cidade"].'</td>';
              echo' <td>'.$aux_query["UF"].'</td>';
              echo'<td><a href="'.$_SERVER["PHP_SELF"].'?id='
              .$aux_query["Id"].'">Editar</a></td>';
              echo'</tr>';
            }
           ?>
        <table>
  </form>
        



    
</body>
</html>