<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = explode($_SERVER['REQUEST_URI'],"/");
include('class/Argomento.php');
$argomento = new Argomento();
switch($requestMethod) {

	case 'GET'://Ok
		/*if(strcmp($requestUri[count($requestUri)-1],"corsi.php") != 0) 	//if uri doesn't end with 'corsi'
		{
			$argomento->_id = $requestUri[count($requestUri)-1];	//id is last element of uri
		}
		*/
		$result = $argomento->get();
		$jsonData = json_encode($result, true);

        header('Content-Type: application/json');
		echo $jsonData;
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	