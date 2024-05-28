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
    session_name()


}
?>