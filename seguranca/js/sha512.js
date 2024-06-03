/* 
* Uma implementação JavaScript do algoritmo Secure Hash, SHA-512, conforme definido 
* no FIPS 180-2 
* Versão 2.2 Copyright Anonymous Contributor, Paul Johnston 2000 - 2009. 
* Outros colaboradores: Greg Holt, Andrew Kepert, Ydnar, Lostinet 
* Distribuído sob a licença BSD 
* Consulte http://pajhome.org.uk/crypt/md5 para obter detalhes. 
*/

/* 
* Variáveis ​​configuráveis. Talvez seja necessário ajustá-los para serem compatíveis 
* com o lado do servidor, mas os padrões funcionam na maioria dos casos. 
*/ 
var  hexcase  =  0 ;   /* formato de saída hexadecimal. 0 - minúscula; 1 - maiúscula */ 
var  b64pad   =  "" ;  /* caractere de preenchimento base 64. "=" para conformidade estrita com RFC */

/* 
* Estas são as funções que você normalmente deseja chamar 
* Elas aceitam argumentos de string e retornam strings codificadas em hexadecimal ou base 64 
*/ 
function  hex_sha512 ( s )     {  return  rstr2hex ( rstr_sha512 ( str2rstr_utf8 ( s )));  } 
função  b64_sha512 ( s )     {  return  rstr2b64 ( rstr_sha512 ( str2rstr_utf8 ( s )));  } 
função  any_sha512 ( s ,  e )  {  retornar  rstr2any ( rstr_sha512 ( str2rstr_utf8 ( s )),  e );} 
função  hex_hmac_sha512 ( k ,  d ) 
  {  retornar  rstr2hex ( rstr_hmac_sha512 ( str2rstr_utf8 ( k ),  str2rstr_utf8 ( d )));  } 
função  b64_hmac_sha512 ( k ,  d ) 
  {  retornar  rstr2b64 ( rstr_hmac_sha512 ( str2rstr_utf8 ( k ),  str2rstr_utf8 ( d )));  } 
função  any_hmac_sha512 ( k ,  d ,  e ) 
  {  return  rstr2any ( rstr_hmac_sha512 ( str2rstr_utf8 ( k ),  str2rstr_utf8 ( d )),  e );}

/* 
* Execute um autoteste simples para ver se a VM está funcionando 
*/ 
function  sha512_vm_test () 
{ 
  return  hex_sha512 ( "abc" ). toLowerCase ()  == 
    "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a"  + 
    "2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49 f" ; 
}

/* 
* Calcula o SHA-512 de uma string bruta 
*/ 
function  rstr_sha512 ( s ) 
{ 
  return  binb2rstr ( binb_sha512 ( rstr2binb ( s ),  s . length  *  8 )); 
}

/* 
* Calcula o HMAC-SHA-512 de uma chave e alguns dados (strings brutas) 
*/ 
function  rstr_hmac_sha512 ( key ,  data ) 
{ 
  var  bkey  =  rstr2binb ( key ); 
  if ( bkey.comprimento > 32 ) bkey = binb_sha512 ( bkey , chave.comprimento * 8 ) ;​​ ​       

  var  ipad  =  Matriz ( 32 ),  opad  =  Matriz ( 32 ); 
  for ( var  i  =  0 ;  i  <  32 ;  i ++ ) 
  { 
    ipad [ i ]  =  bkey [ i ]  ^  0x36363636 ; 
    opad [ i ]  =  bkey [ i ]  ^  0x5C5C5C5C ; 
  }

  var  hash  =  binb_sha512 ( ipad . concat ( rstr2binb ( dados )),  1024  +  dados . comprimento  *  8 ); 
  retornar  binb2rstr ( binb_sha512 ( opad . concat ( hash ),  1024  +  512 )); 
}

/* 
* Converte uma string bruta em uma string hexadecimal 
*/ 
function  rstr2hex ( input ) 
{ 
  try  {  hexcase  }  catch ( e )  {  hexcase = 0 ;  } 
  var  hex_tab  =  hexcase  ?  "0123456789ABCDEF"  :  "0123456789abcdef" ; 
  var  saída  =  "" ; 
  var  x ; 
  for ( var  i  =  0 ;  i  <  entrada . comprimento ;  i ++ ) 
  { 
    x  =  entrada . charCodeAt ( i ); 
    saída  +=  hex_tab . charAt (( x  >>>  4 )  &  0x0F ) 
           +   hex_tab . charAt (  x         &  0x0F ); 
  } 
  retornar  saída ; 
}

/* 
* Converte uma string bruta em uma string de base 64 
*/ 
function  rstr2b64 ( input ) 
{ 
  try  {  b64pad  }  catch ( e )  {  b64pad = '' ;  } 
  var  tab  =  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" ; 
  var  saída  =  "" ; 
  var  len  =  entrada . comprimento ; 
  for ( var  i  =  0 ;  i  <  len ;  i  +=  3 ) 
  { 
    var  triplet  =  ( input . charCodeAt ( i )  <<  16 ) 
                |  ( i  +  1  <  len  ?  entrada . charCodeAt ( i + 1 )  <<  8  :  0 ) 
                |  ( i  +  2  <  len  ?  entrada . charCodeAt ( i + 2 )       :  0 ); 
    for ( var  j  =  0 ;  j  <  4 ;  j ++ ) 
    { 
      if ( i  *  8  +  j  *  6  >  entrada . comprimento  *  8 )  saída  +=  b64pad ; 
      senão  saída  +=  tab . charAt (( tripleto  >>>  6 * ( 3 - j ))  &  0x3F ); 
    } 
  } 
  retornar  saída ; 
}

/* 
* Converte uma string bruta em uma codificação de string arbitrária 
*/ 
function  rstr2any ( input ,  encoding ) 
{ 
  var  divisor  =  encoding . comprimento ; 
  var  i ,  j ,  q ,  x ,  quociente ;

  /* Converte para um array de valores big-endian de 16 bits, formando o dividendo */ 
  var  dividendo  =  Array ( Math . ceil ( input . length  /  2 )); 
  for ( i  =  0 ;  i  <  dividendo . comprimento ;  i ++ ) 
  { 
    dividendo [ i ]  =  ( input . charCodeAt ( i  *  2 )  <<  8 )  |  entrada . charCodeAt ( i  *  2  +  1 ); 
  }

  /* 
   * Execute repetidamente uma divisão longa. A matriz binária forma o dividendo, 
   * o comprimento da codificação é o divisor. Uma vez calculado, o quociente 
   * forma o dividendo para a próxima etapa. Todos os restos são armazenados para 
   uso posterior. 
   */ 
  var  full_length  =  Matemática . ceil ( input.length * 8 / ( Math.log ( encoding.length  ) /Math.log ( 2 ) ) ) ;​​​​​​ var restos = Array ( full_length ); for ( j = 0 ; j < comprimento_completo ; j ++ ) { quociente = Array (); x = 0 ; for ( i = 0 ; i < dividendo . comprimento ; i ++ ) { x = ( x << 16 ) + dividendo [ i ]; q = Matemática . piso ( x / divisor ); x -= q * divisor ; if ( quociente . comprimento > 0 || q > 0 ) quociente [ quociente . comprimento ] = q ; } restos [ j ] = x ; dividendo = quociente ; }  
                                      
     
        
  
      
      
          
    
            
          
          
            
          
    
      
      
  

  /* Converte os restos na string de saída */ 
  var  output  =  "" ; 
  for ( i  =  restos . comprimento  -  1 ;  i  >=  0 ;  i - ) 
    saída  +=  codificação . charAt ( restos [ i ]);

   saída de retorno ; 
}

/* 
* Codifique uma string como utf-8. 
* Para maior eficiência, isso pressupõe que a entrada seja utf-16 válida. 
*/ 
função  str2rstr_utf8 ( entrada ) 
{ 
  var  saída  =  "" ; 
  var  eu  =  - 1 ; 
  var  x ,  y ;

  while ( ++ i  <  input . length ) 
  { 
    /* Decodifica pares substitutos utf-16 */ 
    x  =  input . charCodeAt ( i ); 
    y  =  i  +  1  <  entrada . comprimento  ?  entrada . charCodeAt ( i  +  1 )  :  0 ; 
    if ( 0xD800  <=  x  &&  x  <=  0xDBFF  &&  0xDC00  <=  y  &&  y  <=  0xDFFF ) 
    { 
      x  =  0x10000  +  (( x  &  0x03FF )  <<  10 )  +  ( y  &  0x03FF ); 
      eu ++ ; 
    }

    /* Codifica a saída como utf-8 */ 
    if ( x  <=  0x7F ) 
      output  +=  String . fromCharCode ( x ); 
    senão  if ( x  <=  0x7FF ) 
      saída  +=  String . fromCharCode ( 0xC0  |  (( x  >>>  6  )  &  0x1F ), 
                                    0x80  |  (  x          &  0x3F )); 
    senão  if ( x  <=  0xFFFF ) 
      saída  +=  String . fromCharCode ( 0xE0  |  (( x  >>>  12 )  &  0x0F ), 
                                    0x80  |  (( x  >>>  6  )  &  0x3F ), 
                                    ​​0x80  |  (  x          &  0x3F )); 
    senão  if ( x  <=  0x1FFFFF ) 
      saída  +=  String . fromCharCode ( 0xF0  |  (( x  >>>  18 )  &  0x07 ), 
                                    0x80  |  (( x  >>>  12 )  &  0x3F ), 
                                    ​​0x80  |  (( x  >>>  6  )  &  0x3F ), 
                                    ​​0x80  |  (  x          &  0x3F )); 
  } 
  retornar  saída ; 
}

/* 
* Codifique uma string como utf-16 
*/ 
function  str2rstr_utf16le ( input ) 
{ 
  var  output  =  "" ; 
  for ( var  i  =  0 ;  i  <  entrada.comprimento ; i ++ ) saída + = String .​ fromCharCode ( entrada . charCodeAt ( i ) & 0xFF , ( entrada . charCodeAt ( i ) >>> 8 ) & 0xFF ); saída de retorno ; } 
                
                                      
   


função  str2rstr_utf16be ( entrada ) 
{ 
  var  saída  =  "" ; 
  for ( var  i  =  0 ;  i  <  entrada.comprimento ; i ++ ) saída + = String .​ fromCharCode (( entrada . charCodeAt ( i ) >>> 8 ) & 0xFF , entrada . charCodeAt ( i ) & 0xFF ); saída de retorno ; } 
          
                                            
   


/* 
* Converte uma string bruta em um array de palavras big-endian 
* Caracteres >255 têm seu byte alto ignorado silenciosamente. 
* / 
function  rstr2binb ( entrada ) 
{ 
  var  saída  =  Array ( entrada.comprimento >> 2 ) ; for ( var i = 0 ; i < saída.comprimento ; i ++ ) saída [ i ] = 0 ;​​ for ( var i = 0 ; i < entrada . comprimento * 8 ; i += 8 ) saída [ i >> 5 ] |= ( entrada . charCodeAt ( i / 8 ) & 0xFF ) << ( 24 - i % 32 ) ; saída de retorno ; }  
         
      
             
                
   


/* 
* Converte um array de palavras big-endian em uma string 
*/ 
function  binb2rstr ( input ) 
{ 
  var  output  =  "" ; 
  for ( var  i  =  0 ;  i  <  entrada . comprimento  *  32 ;  i  +=  8 ) 
    saída  +=  String . fromCharCode (( entrada [ i >> 5 ]  >>>  ( 24  -  i  %  32 ))  &  0xFF ); 
  saída de retorno  ; }


/* 
* Calcula o SHA-512 de um array de dwords big-endian e um comprimento de bit 
*/ 
var  sha512_k ; 
função  binb_sha512 ( x ,  len ) 
{ 
  if ( sha512_k  ==  indefinido ) 
  { 
    // constantes SHA512 
    sha512_k  =  new  Array ( 
new  int64 ( 0x428a2f98 ,  - 685199838 ),  novo  int64 ( 0x71374491 ,  0x23ef65cd ), 
novo  int64 ( - 1 245643825 ,  -330482897 ), novo int64 ( - 373957723 , - 2121671748 ), novo int64 ( 0x3956c25b , - 213338824 ), novo int64 ( 0x59f111f1 , - 1241133031 ), novo int64 ( - 1841331548 , - 1 357295717 ), novo int64 ( - 1424204075 , - 630357736 ), novo int64 ( - 670586216 , - 1560083902 ), novo int64 ( 0x12835b01 , 0x45706fbe ), novo int64 ( 0x243185be , 0x4ee4b28c ), novo int64 ( 0x550c7dc3 , - 70466230 2 ), novo int64 ( 0x72be5d74 , - 226784913 ), novo int64 ( - 2132889090 , 0x3b1696b1 ), novo int64 ( - 1680079193 , 0x25c71235 ), novo int64 ( - 1046744716 , - 815192428 ), novo int64 ( - 459576895 , - 1628353838 ), novo int64 ( - 272 742522   
     
     
     
     
     
     
    ,  0x384f25e3 ), 
novo  int64 ( 0xfc19dc6 ,  - 1953704523 ),  novo  int64 ( 0x240ca1cc ,  0x77ac9c65 ), 
novo  int64 ( 0x2de92c6f ,  0x592b0275 ) ,  novo  int64 ( a , 0x6ea6e483 ), novo int64 ( 0x5cb0a9dc ,  - 1119749164 ), novo int64 ( 0x76f988da , - 2096016459 ), novo int64 ( - 1740746414 , - 295247957 ), novo int64 ( - 1473132947 , 0x2db43210 ), novo int64 ( - 1341970488 , - 1728372417 ), novo int64 ( - 1084653625 , - 1091629340 ), novo int64 ( - 958395405 , 0x3da88fc2 ), novo int64 ( - 710438585 , - 1828018395 ), novo int64 ( 0x6ca6351 , - 536640913 ), novo int64 ( 0x14292967 , 0xa0e6e70 ), novo int64 ( 0x27b70a85 , 0x46d22ffc ), novo int64 ( 0x2e1b2138 , 0x5c26c926 ), novo int64 ( 0x4d2c6dfc , 0x5ac42aed ), novo int64 ( 0x53380d13 , - 1651133473 ), novo int64 ( 0x650a7354 , - 1951439906 ), novo int64 ( 0x766a0abb , 0x3c77b2a8 ) , novo int64 ( - 21179 40946 , 0x47edaee6 ), novo int64 ( -1838011259 , 0x1482353b
     
     
     
     
     
     
     
     
     ), 
novo  int64 ( - 1564481375 ,  0x4cf10364 ),  novo  int64 ( - 1474664885 ,  - 1136513023 ), 
novo  int64 ( - 1035236496 , - 789014639 ), novo int64 ( - 949202525 , 654be30 ), novo int64 ( - 778901479 , - 688958952 ), novo int64 ( - 694614492 , 0x5565a910 ), novo int64 ( - 200395387 , 0x5771202a ), novo int64 ( 0x106aa070 , 0x32bbd1b8 ), novo int64 ( 0x19a4c116 , - 1194143 544 ), novo int64 ( 0x1e376c08 , 0x5141ab53 ), novo int64 ( 0x2748774c , - 544281703 ), novo int64 ( 0x34b0bcb5 , - 509917016 ), novo int64 ( 0x391c0cb3 , - 976659869 ), novo int64 ( 0x4ed8aa4a , - 482243893 ), novo int64 ( 0x5b9cca4f , 3 ), novo int64 ( 0x682e6ff3 , - 692930397 ), novo int64 ( 0x748f82ee , 0x5defb2fc ), novo int64 ( 0x78a5636f , 0x43172f60 ), novo int64 ( - 2067236844 , - 1578062990 ), novo int64 ( - 1933114872 , 0x1a6439ec ), novo int64 ( - 186 6530822 , 0x23631e28 ), novo int64 ( - 1538233109 , -    
     
     
     
     
     
     
     
     
     561857047 ), 
novo  int64 ( - 1090935817 ,  - 1295615723 ),  novo  int64 ( - 965641998 ,  - 479046869 ), 
novo  int64 ( - 903397682 ,  - 366583396 ),  novo  int64 ( - 77970 0025 ,  0x21c0c207 ), 
novo  int64 ( - 354779690 ,  - 840897762 ),  novo  int64 ( - 176337025 ,  - 294727304 ), 
novo  int64 ( 0x6f067aa ,  0x72176fba ),  novo  int64 ( 0xa637dc5 , - 1563912026 ), novo int64 ( 0x113f9804 , - 1090974 290 ), novo int64 ( 0x1b710b35 , 0x131c471b ), novo int64 ( 0x28db77f5 , 0x23047d84 ), novo int64 ( 0x32caab7b , 0x40c72493 ), novo int64 ( 0x3c9ebe0a , 0x15c9bebc ), novo int64 ( 0x431d67c4 , - 1676669620 ), novo int64 ( 0x4cc5d4be , - 885112138 ), novo int64 ( 0x597f299c , - 60457430 ), novo int64 ( 0x5fcb6fab , 0x3ad6faec ), novo int64 ( 0x6c44198c , 0x4a475817 )); } 
     
     
     
     
     
  

  // Valores de hash iniciais 
  var  H  =  new  Array ( 
new  int64 ( 0x6a09e667 ,  - 205731576 ), 
novo  int64 ( - 1150833019 ,  - 2067093701 ), 
novo  int64 ( 0x3c6ef372 ,  - 23791573 ), 
novo  int64 ( - 15214 86534 ,  0x5f1d36f1 ), 
novo  int64 ( 0x510e527f ,  - 1377402159 ), 
novo  Int64 ( - 1694144372 ,  0x2b3e6c1f ), 
novo  Int64 ( 0x1f83d9ab ,  - 7957774 ), 
novo  Int64 ( 0x5Be0CD19 ,  0x17777774171717 ;

  var  T1  =  novo  int64 ( 0 ,  0 ), 
    T2  =  novo  int64 ( 0 ,  0 ), 
    a  =  novo  int64 ( 0 , 0 ), 
    b  =  novo  int64 ( 0 , 0 ), 
    c  ​​=  novo  int64 ( 0 , 0 ) , 
    d  =  novo  int64 ( 0 , 0 ), 
    e  =  novo  int64 ( 0 , 0 ), 
    f  =  novo  int64 ( 0 , 0 ), 
    g  =  novo  int64 ( 0 , 0 ), 
    h  =  novo  int64 ( 0 , 0 ) , 
    //Variáveis ​​temporárias não especificadas pelo documento 
    s0  =  new  int64 ( 0 ,  0 ), 
    s1  =  new  int64 ( 0 ,  0 ), 
    Ch  =  new  int64 ( 0 ,  0 ), 
    Maj  =  new  int64 ( 0 ,  0 ), 
    r1  =  novo  int64 ( 0 ,  0 ), 
    r2  =  novo  int64 ( 0 ,  0 ), 
    r3  =  novo  int64 ( 0 ,  0 ); 
  var  j ,  eu ; 
  var  W  =  nova  matriz ( 80 ); 
  for ( i = 0 ;  i < 80 ;  i ++ ) 
    W [ i ]  =  new  int64 ( 0 ,  0 );

  // acrescenta preenchimento à string de origem. O formato está descrito no FIPS. 
  x [ len  >>  5 ]  |=  0x80  <<  ( 24  -  ( len  &  0x1f )); 
  x [(( len  +  128  >>  ​​10 ) <<  5 )  +  31 ]  =  len ;

  for ( i  =  0 ;  i < x . length ;  i += 32 )  //32 dwords é o tamanho do bloco 
  { 
    int64copy ( a ,  H [ 0 ]); 
    int64copy ( b ,  H [ 1 ]); 
    int64copy ( c ,  H [ 2 ]); 
    int64copy ( d ,  H [ 3 ]); 
    int64copy ( e ,  H [ 4 ]); 
    int64copy ( f ,  H [ 5 ]); 
    int64copy ( g ,  H [ 6 ]); 
    int64copy ( h ,  H [ 7 ]);

    para ( j = 0 ;  j < 16 ;  j ++ ) 
    { 
        W [ j ]. h  =  x [ eu  +  2 * j ]; 
        W [ j ]. eu  =  x [ eu  +  2 * j  +  1 ]; 
    }

    for ( j = 16 ;  j < 80 ;  j ++ ) 
    { 
      //sigma1 
      int64rrot ( r1 ,  W [ j - 2 ],  19 ); 
      int64revrrot ( r2 ,  W [ j - 2 ],  29 ); 
      int64shr ( r3 ,  W [ j - 2 ],  6 ); 
      s1 . eu  =  r1 . eu  ^  r2 . eu  ^  r3 . eu ; 
      s1 . h  =  r1 . h  ^  r2 . h  ^  r3 . h ; 
      //sigma0 
      int64rrot ( r1 ,  W [ j - 15 ],  1 ); 
      int64rrot ( r2 ,  W [ j - 15 ],  8 ); 
      int64shr ( r3 ,  W [ j - 15 ],  7 ); 
      s0 . eu  =  r1 . eu  ^  r2 . eu  ^  r3 . eu ; 
      s0 . h  =  r1 . h  ^  r2 . h  ^  r3 . h ;

      int64add4 ( W [ j ],  s1 ,  W [ j - 7 ],  s0 ,  W [ j - 16 ]); 
    }

    for ( j  =  0 ;  j  <  80 ;  j ++ ) 
    { 
      //Ch 
      Ch . l  =  ( e . l  &  f . l )  ^  ( ~ e . l  &  g . l ); 
      CH . h  =  ( e . h  &  f . h )  ^  ( ~ e . h  &  g . h );

      //Sigma1 
      int64rrot ( r1 ,  e ,  14 ); 
      int64rrot ( r2 ,  e ,  18 ); 
      int64revrrot ( r3 ,  e ,  9 ); 
      s1 . eu  =  r1 . eu  ^  r2 . eu  ^  r3 . eu ; 
      s1 . h  =  r1 . h  ^  r2 . h  ^  r3 . h ;

      //Sigma0 
      int64rrot ( r1 ,  a ,  28 ); 
      int64revrrot ( r2 ,  a ,  2 ); 
      int64revrrot ( r3 ,  a ,  7 ); 
      s0 . eu  =  r1 . eu  ^  r2 . eu  ^  r3 . eu ; 
      s0 . h  =  r1 . h  ^  r2 . h  ^  r3 . h ;

      //Maj 
      Maj . l  =  ( a.l & b.l ) ^ ( a.l & c.l )  ^ ( b.l & c.l ) ;​​​​​​​​​​​ Maj . h = ( a.h & b.h ) ^ ( a.h & c.h ) ^ ( b.h & c.h ) ;​​​​​​​​​​​         
                  

      int64add5 ( T1 ,  h ,  s1 ,  Ch ,  sha512_k [ j ],  W [ j ]); 
      int64add ( T2 ,  s0 ,  Maj );

      int64copy ( h ,  g ); 
      int64copy ( g ,  f ); 
      int64copy ( f ,  e ); 
      int64add ( e ,  d ,  T1 ); 
      int64cópia ( d ,  c ); 
      int64copy ( c ,  b ); 
      int64copy ( b ,  a ); 
      int64add ( a ,  T1 ,  T2 ); 
    } 
    int64add ( H [ 0 ],  H [ 0 ],  uma ); 
    int64add ( H [ 1 ],  H [ 1 ],  b ); 
    int64add ( H [ 2 ],  H [ 2 ],  c ); 
    int64add ( H [ 3 ],  H [ 3 ],  d ); 
    int64add ( H [ 4 ],  H [ 4 ],  e ); 
    int64add ( H [ 5 ],  H [ 5 ],  f ); 
    int64add ( H [ 6 ],  H [ 6 ],  g ); 
    int64add ( H [ 7 ],  H [ 7 ],  h ); 
  }

  //representa o hash como um array de dwords de 32 bits 
  var  hash  =  new  Array ( 16 ); 
  para ( i = 0 ;  i < 8 ;  i ++ ) 
  { 
    hash [ 2 * i ]  =  H [ i ]. h ; 
    hash [ 2 * i  +  1 ]  =  H [ i ]. eu ; 
  } 
  retornar  hash ; 
}

//Um construtor para números de 64 bits 
function  int64 ( h ,  l ) 
{ 
  this . h  =  h ; 
  esse . eu  =  eu ; 
  //this.toString = int64toString; 
}

//Copia src para dst, assumindo que ambos são números de 64 bits 
function  int64copy ( dst ,  src ) 
{ 
  dst . h  =  src . h ; 
  DST . eu  =  src . eu ; 
}

//Gira um número de 64 bits para a direita por shift 
//Não trata casos de shift>=32 
//A função revrrot() é para essa 
função  int64rrot ( dst ,  x ,  shift ) 
{ 
    dst . eu  =  ( x . l  >>>  mudança )  |  ( x . h  <<  ( 32 - turno )); 
    DST . h  =  ( x . h  >>>  mudança )  |  ( x .l <<  (  32 - deslocamento ) ); }


//Inverte os dwords da fonte e depois gira para a direita por shift. 
//Isso é equivalente à rotação por 32+shift 
function  int64revrrot ( dst ,  x ,  shift ) 
{ 
    dst . l  =  ( x . h  >>>  mudança )  |  ( x .l <<  (  32 - deslocamento ) ); DST . h = ( x . l >>> mudança ) | ( x . h << ( 32 - turno )); }
            


//Desloca bit a bit para a direita um número de 64 bits por shift 
//Não manipula shift>=32, mas nunca é necessário no SHA512 
function  int64shr ( dst ,  x ,  shift ) 
{ 
    dst . eu  =  ( x . l  >>>  mudança )  |  ( x . h  <<  ( 32 - turno )); 
    DST . h  =  ( x . h  >>>  deslocamento ); 
}

//Adiciona dois números de 64 bits 
//Como a implementação original, não depende de operações de 32 bits 
function  int64add ( dst ,  x ,  y ) 
{ 
   var  w0  =  ( x . l  &  0xffff )  +  ( y . l  &  0xffff ); 
   var  w1  =  ( x . l  >>>  16 )  +  ( y . l  >>>  16 )  +  ( w0  >>>  16 ); 
   var  w2  =  ( x . h  &  0xffff )  +  ( y . h  &  0xffff )  +  ( w1  >>>  16 ); 
   var  w3  =  ( x . h  >>>  16 )  +  ( y . h  >>>  16 )  +  ( w2  >>>  16 ); 
   DST . eu  =  ( w0  &  0xffff )  |  ( w1  <<  16 ); 
   DST . h  =  ( w2  &  0xffff )  |  ( w3  <<  16 ); 
}

//Igual, exceto com 4 adendos. Funciona mais rápido do que adicioná-los um por um. 
função  int64add4 ( dst ,  a ,  b ,  c ,  d ) 
{ 
   var  w0  =  ( a.l & 0xffff ) + ( b.l & 0xffff ) + ( c.l & 0xffff ) + ( d.l & 0xffff ) ;​​​​​​​ var w1 = ( a.l >>> 16 ) + ( b.l >>> 16 ) + ( c.l >>> 16 ) + ( d.l >>> 16 ) + ( w0 >>> 16 )​​​​​​​ ​; var w2 = ( a.h & 0xffff ) + ( b.h & 0xffff ) + ( c.h & 0xffff ) + ( d.h & 0xffff ) + ( w1 >>> 16 ) ;​​​​​​​var w3 = ( a . h >>> 16 ) + ( b . h >>> 16 ) + ( c . h >>> 16 ) + ( d . h >>> 16 ) + ( w2 >>> 16 ) ; DST . eu = ( w0 & 0xffff ) | ( w1 << 16 ); DST .h = ( w2 & 0xffff ) | ( w3 << 16 );              
                        
                        
                        
           
           
}

//Mesmo, exceto com 5 adendos 
function  int64add5 ( dst ,  a ,  b ,  c ,  d ,  e ) 
{ 
   var  w0  =  ( a . l  &  0xffff )  +  ( b . l  &  0xffff )  +  ( c . l  &  0xffff )  +  ( d.l & 0xffff ) + ( e.l & 0xffff ) ;​​​ var w1 = ( a.l >>> 16 ) + ( b.l >>> 16 ) + ( c.l >>> 16 ) + ( d.l >>> 16 ) + ( e.l >>>​​​​​​​​​​ 16 ) + ( w0 >>> 16 ); var w2 = ( a.h & 0xffff ) + ( b.h & 0xffff ) + ( c.h & 0xffff ) + ( d.h & 0xffff ) + ( e.h & 0xffff ) + ( w1 >>> 16 )​​​​​​​​​​; var w3 = ( a . h >>> 16 ) + ( b . h >>> 16 ) + ( c . h >>> 16 ) + ( d . h >>> 16 ) + ( e .h >>> 16 ) + ( w2 >>> 16 );      
                            
                            
                            
   DST . eu  =  ( w0  &  0xffff )  |  ( w1  <<  16 ); 
   DST . h  =  ( w2  &  0xffff )  |  ( w3  <<  16 ); 
}
