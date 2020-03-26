<?php
include_once('class/classe.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$classe = new Classe();

switch($requestMethod)
{

	case 'GET'://Ok


		$result = $classe->get();
		$jsonData = json_encode($result, true);

        header('Content-Type: application/json');
		echo $jsonData;
		break;		
    
    default:
	    header("HTTP/1.1 405 Method Not Allowed");
	    break;
}
?>	