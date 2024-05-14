<?php 
/*$texto01="primeiro texto do script";
print ($texto01);*/


/*$texto01="primeiro texto do script";
print ('<span style="color:red">'.$texto01.'</span>');*/



$raw = '22.11.1968';
$start = DateTime::createFromFormat('d.m.Y',$raw);
echo "Data de inicio: ".$start -> format ('Y-m-d')."\n";
$end = clone $start;
$end-> add (new DateInterval('P1M6D'));
$diff=$end->diff($start);
echo "Diferença: ".$diff->format('%m mês,%d dias (total:%a dias)'). "\n";

?>
