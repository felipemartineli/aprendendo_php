<?php
$obj_mysqli = new mysqli("127.0.0.1","root","","tutocrudphp");
if ($obj_mysqli->connect_errno)
{
    echo "Ocorreu um erro com a conexão com o banco de dados";
    exit;
}

 mysqli_set_charset($obj_mysqli, 'utf8');

 $id_prod    =-1;
 $nome  ="";
 $uni_medidda  = "";
 $marca = "";
 $fornecedor = "";

 if(isset($_POST["nome"]) && isset($_POST["unidade de medidade"]) && isset($_POST["marca"]) && isset($_POST["fornecedor"]))
 {
    if (empty($_POST["nome"]))
     $erro ="Campo nome obrigatório";

    elseif (empty($_POST["marca"]))
     $erro = "Campo marca obrigatório";
    
    else
    {
       $id_prod =$_POST["id_prod"];
       $nome =$_POST["nome"];
       $uni_medidda =$_POST["unidade de medida"];
       $marca =$_POST["marca"];
       $fornecedor =$_POST["fornecedor"];
       if ($id_prod ==-1)

       {
        $stmt = $obj_mysqli->prepare("INSERT INTO `produto`(`nome`, `uni_medida`, `marca`,`fornecedor`) VALUES (?,?,?,?)");
        $stmt->bind_param("ssss", $nome, $uni_medidda, $marca, $fornecedor);
       if  (!$stmt->execute())
        {
          $erro = $stmt->error;
        }
        else
        {
            header("Location: produto.php");
            exit;
        }
       }
     else
     if(is_numeric($id_prod)&& $id_prod>=1)
     {
        $stmt=$obj_mysqli->prepare("UPDATE `produto` SET `nome`=?, `unidade de medida`=?,`marca`=?,`fornecedor`=? WHERE id_prod=?");
        $stmt->bind_param('ssssi',$nome,$uni_medidda,$marca, $fornecdor, $id_prod);

        if( !$stmt->execute())
        {
            $erro=$stmt->error;
        }
        else
        {
            header("Location:produto.php");
            exit;
        }
     }
     {
        $erro="Número Inválido";
     }
    }
  }
  else
  if(isset($GET["id_prod"])&& is_numeric($_GET["id_prod"]))
  {
    $id_prod = $GET["id_prod"];

    if (isset($_GET["del"]))
    {
        $stmt = $obj_mysqli->prepare("DELETE FROM `produto` WHERE id_prod = ?");
        $stmt->bind_param('i', $id_prod);
        $stmt->execute();   

        header('location:produto.php');
        exit;

    }
    else
    {
    $stmt = $obj_mysqli->prepare("SELECT * FROM `produto` WHERE id_prod=?"); 
    $stmt ->bind_param('i' ,$id_prod);
    $stmt ->execute();
     
    $result = $stmt ->get_result(); 
      $aux_query = $resut ->fetch_assoc();  

    $nome = $aux_query["nome"];
    $uni_medida = $aux_query["unidade de medida"];
    $marca = $aux_query["marca"];
    $fornecdor = $aux_query["fornecedor"];

    $stmt->close();
    }
}                                                                                                                                                                                                        
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabela Produto com o Crud</title>
</head>
<body>
<form action="<?=$_SERVER["PHP_SELF"]?>" method="POST">
       <label> Nome:</label><br>
        <input type="text" name="nome" placeholder="Qual o nome do produto?" value="<?=$nome?>"><br/><br/>
        Marca:<br>
        <input type="text" name="marca" placeholder="Qual a marca do produto?" values="<?=$marca?>"><br/><br/>
        Fornecedor:<br>
        <input type="text" name="fornecedor" placeholder="Quem é o fornecedor?" values="<?=$fornecedor?>"><br/><br/>
        Unidade de medida:<br>
        <input type="text" name="unidade de medida" placeholder="Qual a unidade de medida?" values="<?=$uni_medidda?>"><br/><br/>
        <input type="hidden" value="-1" name="id_prod"><br/><br/>
        <button type="submit"><?=($id_prod==-1)?"Enviar":"Salvar"?></button>
    </form>
    <br>
    <br>
    <table width="400px" border="10" cellspacing="0">         0,
        <tr>
            <td><strong>#</strong></td>
            <td><strong>Nome</strong></td>
            <td><strong>Marca</strong></td>
            <td><strong>Fornecedor</strong></td>
            <td><strong>unidade de medida</strong></td>
            <td><strong>#</strong></td>
        </tr>
        <?php
        $result=$obj_mysqli->query("SELECT*FROM `produto`");
        while($aux_query=$result->fetch_object()) 
        ?>
</body>
</html>