<?php
include_once('class/aula.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$aula = new Aula();

switch($requestMethod)
{

	case 'GET'://Ok


		$result = $aula->get();
		$jsonData = json_encode($result, true);

        header('Content-Type: application/json');
		echo $jsonData;
		break;		
    
    default:
	    header("HTTP/1.1 405 Method Not Allowed");
	    break;
}
?>	