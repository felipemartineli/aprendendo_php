<?php
 include_once 'includes/register.inc.php';
 include_once 'includes/functions.php';
 ?>
<!DOCTYPE html>
<lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Login: Registration Form</title>
    <script type="text/JavaScript" src="js/sha512.js"></script>
    <script type="text/JavaScript" src="js/forms.js"></script>
    <link rel="stylesheet"href="styles/main.css"/>
</head>
<body>
    <!-- O formulário de registro será exibido se as variáveis ​​POST não estiverem definidas 
    ou se o script de registro causar um erro.!-->
    <h1>Register with us</h1>
    <?php
    if (!empty($error_msg)){
        echo $error_msg;
    }
    ?>
    <ul>
        <li>Os nomes de usuários devem conter apenas dígitos, letras maiúsculas e
     minúsculas e underlines ("_")</li>
       <li>Emails devem seguir um formato válido para email.</li>
       <li>As senhad devem ter no mínimo 6 caracteres.</li>
       <li>As senhas devem conter
        <ul>
            <li>Pelo menos uma letra maiúscula (A..Z)</li>
            <li>Pelo menos uma leta minúcula(a..z)</li>
            <li>Pelo menos um número(0..9)</li>
        </ul>
      </li>
      <li>Sua senha deve conferir exatamente</li>
    </ul>
    <form action="<?php echo esc_url($_SEREVER['PHP_SELF']);?>"
                            method="post"
                            name="registration_form">
                          Username:<input type='text'
                            name='username'
                            id='username'/><br>
                    Confirm password:<ipunt type="password"
                            name="confirmpwd"
                            id="confirmpwd"/><br>
                    <input type="button"
                       value="Register"
                       onclick="return regformhash(this.form,
                            this.form.username,
                            this.form.email,
                            this.form.password,
                            this.form.confirmpwd);"/> 
                </form>
                <p>Return to the <a href="index.php">login page</a>.</p>
             

</body>
</html>