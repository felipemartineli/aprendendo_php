use secure_login;
/*create user 'sec_user'@'localhost'IDENTIFIED BY 'omagoeimplacavel'; criando o usuários */
/*GRANT SELECT,INSERT,UPDATE ON `secure_login`.*TO 'sec_user'@'localhost';adicionando previlégios*/

/*create table `secure_login`.`members` (
     `id` int not null auto_increment primary key,
     `username` varchar(30) not null,
     `email` varchar(50) not null,
     `password` char (128) not null,
     `salt` char(128) not null) ENGINE = innoDB;*/ 
      /*criando tabela de membros*/
    
   /* create table `secure_login`.`login_attempts`(
        `user_id` int(11) not null,
         `time` varchar(30) not null
    ) engine = innoDB*/
    /*criando tabela para gravar tentativas de login de um usuário*/


    /*insert into `secure_login`.`members` values (1,'test_user','test@example.com',
    '00807432eae173f652f2064bdca1b61b290b52d40e429a7d295d76a71084aa96c0233b82f1feac45529e0726559645acaed6f3ae58a286b9f075916ebf66cacc',
    'f9aab579fc1b41ed0c44fe4ecdbfcdb4cb99b9023abb241a6db833288f4eea3c02f76e0d35204a8695077dcf81932aa59006423976224be0390395bae152d4ef');*/
     /*criando um teste sequencial para a tabela "membros"*/

     /*drop user 'sec_user'@'localhost';*/ 

    /* create user 'sec_user'@'localhost'IDENTIFIED BY 'eKcGZr59zAa2BEWU'; criando o usuários*/
    
    GRANT SELECT, INSERT, UPDATE ON `secure_login`.*TO 'sec_user'@'localhost';/*adicionando previlégios*/






     


