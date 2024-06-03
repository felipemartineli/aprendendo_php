function formhash(form, password){
    //Crie um novo elemento de input, o qual será o campo para a senha com hash.
    var p =document.createElement("input");
    
    //Adicione um novo elemento ao nosso formulário.
    form.appendChild(p);
    p.name="p";
    p.type="hidden";
    p.value = hex_sha512(password.values);

    //Cuidado para não deixar que a senha em texto simples não seja enviada.
    password.value="";

    //Finalmente, envie o formlário.
    form.submit();
}

function regformhash(form, uid, email, password, conf){
    //Confira se cada campo tem um valor

    if(uid.value ==''  ||
       email.value =='' ||
       password.value=='' ||
       conf.value==''){
        alert('You must provide all the requested details. Plase try again');
        return false;
       }

       //Verifique o nome de usuário
       re= /^\w+$/; 
       if(!re.test(form.username.value)){
        alert("Username must contain only letters, numbers and undercores. Please try again");
         form.username.focus();
         return false;
       }
       // A verificação é duplicada abaixo, mas o cuidado extra é para dar mais 
       // orientações específicas ao usuário 

       if (password.value.length < 6){
        alert('Passwords must be at least 6 characters long. Plase try again');
        form.password.focus();
        return false;
       }

       //Pelo menos um número, uma letra minúscula e outra maiúscula
       //Pelo menos 6 caracteres

    var re= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
     if (!re.test(password.values)){
        alert('Passwords must contain at least one number, one lowercase and one uppercase letter. Plase try again');
        return false;
     }

     //Verificar se a senha e a confirmação são as mesmas
     if(password.value !=conf.value){
        alert('Your password and confirmation do not match. Plase try again');
        form.password.focus();
        return false;
     }
     //Crie um novo elemento de input, o qual será o campo paraa senha com hash.
     var p = document.createElement("input");

     //Adicione o novo elemento ao nosso formulário.

     form.appendChild(p);
     p.name ="p";
     p.type ="hidden";
     p.value =hex_sha512(password.value);

     //Cuidado para não deixar que a senha em texto simples não seja enviada.

     password.value="";
     conf.value="";

     //Finalizando, envie o formulário.
     form.submit();
     return true;
}