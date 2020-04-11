<?php
include_once('class/Argomento.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$argomento = new Argomento();

switch($requestMethod)
{

	case 'GET':
		if(isset($_GET["id"])) 	//if uri doesn't end with 'corsi'
		{
			$argomento->_id = $_GET["id"];	//id is last element of uri
		}
		$result = $argomento->get();
		$jsonData = json_encode($result, true);

        header('Content-Type: application/json');
		echo $jsonData;
		break;
	case 'PUT':
		$arg = $argomento->put($_PUT["corso"], $_PUT["descrizione"]);
		echo $result;
		break;
    default:
	    header("HTTP/1.1 405 Method Not Allowed");
	    break;
}
?>	