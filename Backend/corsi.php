<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = $_SERVER['REQUEST_URI'].explode("/");
include('./class/Argomento.php');
$argomento = new Argomento();
switch($requestMethod) {

	case 'GET'://Ok
		if(strlen($requestUri[count($requestUri)],"corsi") != 0) 	//if uri doesn't end with 'corsi'
		{
			$argomento->_id = $requestUri[count($requestUri)];	//id is last element of uri
		}

		$result = $argomento->get();
		$jsonData = json_encode($dati, true);

        header('Content-Type: application/json');
		echo $jsonData;
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	