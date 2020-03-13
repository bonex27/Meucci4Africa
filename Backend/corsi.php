<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('class/Argomento.php');
$argomento = new Argomento();
switch($requestMethod) {

	case 'GET'://Ok
		if(isset($_GET["id"])) 	//if uri doesn't end with 'corsi'
		{
			$argomento->_id = $_GET["id"];	//id is last element of uri
		}
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