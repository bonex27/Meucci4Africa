<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('class/corsoSeguito.php');
$MieiCorsi = new MieiCorsi();
switch($requestMethod) {

	case 'GET'://Ok
		if(isset($_GET["id"])) 	//if uri doesn't end with 'corsi'
		{
			$MieiCorsi->_id = $_GET["id"];	//id is last element of uri
		}
		$result = $MieiCorsi->get();
		$jsonData = json_encode($result, true);

        header('Content-Type: application/json');
		echo $jsonData;
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	