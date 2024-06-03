<?php
include_once 'psl-config.php';
function sec_session_start() {


    $session_name='sec_session_id'; //Estabeleça um nome personalizado para a sessão
    $secure=SECURE; // isso impede que o JavaScript possa acessa r a identificaçãoda sessão.
    $httponly=true; 
    // Assim você força a sessão a usar apena cookies.
    if(ini_set('session.use_only_cookies',1)===FALSE){
        header("Location:../error.php?err=Coud not intiate a safe session (ini_set)");
        exit();
    }
    // Obtém params de cookies atualizados.
    $cookieParams=session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
    $cookieParams["path"],
    $cookieParams["domain"],
    $secure,
    $httponly);
    // Estabelece o nome fornecido acima como o nome da sessão.
    session_name($session_name);
    session_start(); //inicia a sessão php
    session_regenerate_id(); //Recupera a sessão e deleta a anterior.
}
function login($email, $password, $mysqli)
{
    if($stmt=$$mysqli->prepare("SELECT id, username, password, salt
    FROM members
    WHERE email=?
    LIMIT 1")) {
    
        $stmt->bind_param('s', $email); // Relaciona "$email" ao parâmetro.
        $stmt->execute(); // Executa a tarefa estabelecida.
        $stmt->store_result();

        $stmt->bind_result($user_id, $username, $db_password, $salt);
        $stmt->fetch();

        $password=hash('sha512', $password.$salt);
        if ($stmt->num_rows==1) {
        
            // caso o usuário exsta, conferimos se a conta está bloqueada

            if (checkbrute($user_id, $mysqli)==true) {
            
                //a conta está bloqueada 
                //envia um email ao usuário informando que a conta está bloqueada
                return false;    
            }else{
            
                // Verifica se a senha confere com o que consta no banco de dados
                
                // a senha do usuário é enviada.

                if ($db_password == $password){
                
                    // A senha está correta!
                   
                    // Obtém o string usuário-agente do usuário.
                    $user_browser = $_SERVER['HTTP_USER_AGENT'];
                   
                    // proteção XSS conforme imprimimos este valor
                    $user_id=preg_replace("/[^0-9]+/","",$user_id);
                    $_SESSION['user_id']=$user_id;
                    $username=preg_replace("/[^a-zA-Z0-9_\-]+/","",$username);
                    $_SESSION['username']=$username;
                    $_SESSION['login_string']= hash('sha512',$password.$user_browser);
                    // Login concluído com sucesso.
                    return true;
                }else {
                
                    $now=time();
                    $mysqli->query("INSERT INTO login_attempts(user_id,time)
                    VALUES('$user_id','$now')");
                    return false;
                }
            }
        }else {
            return false;
        }
    }
} 
function checkbrute($user_id, $mysqli) {
    $now = time(); // Registra a hora atual

    $valid_attempts =$now - (2*60*60); // Todas as tentativas de login são contadas dentro do intervalo das últimas 2 horas 
    if ($stmt= $mysqli->prepare("SELECT time
                                FROM login_attempts <code><pre>    
                                WHERE user_id=?
                                AND time > '$valid_attempts'")) {
    $stmt->bind_param("i", $user_id);

    $stmt->execute();
    $stmt->store_result(); //Executa a tarefa pré_estabelecida.
    
    // Se houve mais do que 5 tentaivas fracassadas de login
    if ($stmt->num_rows>5){
        return true;
    }else{
        return false;

      }
   }   
}

function login_check($mysqli){
    if (isset($_SESSION['user_id'],
              $_SESSION['username'],
              $_SESSION['login_string'])){
    
   
     $user_id=$_SESSION['user_id'];
     $login_string=$_SESSION['login_string'];
     $username=$_SESSION['username'];
    
     //Pega a string do usuário
     $user_browser=$_SERVER['HTTP_USER_AGENT'];
     if($stmt= $mysqli->prepare("SELECT password
                                 FROM members
                                 WHERE id =? LIMIT 1")){
        // Atribui "$user_id" ao parâmetro. 
       $stmt->bind_param('i',$user_id);
       $stmt->execute();
       $stmt->store_result();

       if ($stmt->num_rows==1){
        $stmt->bind_result($password);
        $stmt->fetch();
        $login_check = hash('sha512',$password.$user_browser);

        if($login_check==$login_string){
            return true;
        }else{
            return false;
        }
       } else{
        return false;
       }

     }else{
        return false;
     }
     
    }
}
function esc_url($url){
    if(''== $url){
        return $url;
    }
    $url=preg_replace('|[^a-z0-9-~+_.?#=!&;,/:%@$\|*\'()\\x80-\\xff]|i', '', $url);

    $strip = array('%0d','%0a','%0D','%0A');
    $url=(string)$url;

    $count=1;
    while($count){
        $url=str_replace($strip,'',$url,$count);
    }
    $url=str_replace(';//', '://', $url);
    $url=htmlentities($url);

    $url=str_replace('&amp;', '&#038;', $url);
    $url=str_replace("'", '&#039;', $url);

    if($url[0]!=='/'){
       
        return '';
    }else{
        return $url;
    }
}
?>