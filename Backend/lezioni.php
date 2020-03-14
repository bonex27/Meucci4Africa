<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];

include('class/Lezione.php');
$lezione = new Lezione();
include('class/Argomento.php');
$argomento = new Argomento();

switch($requestMethod) {

	case 'GET'://Ok
		if(isset($_GET["id"])) 	//if uri doesn't end with 'corsi'
		{
			$lezione->_id = $_GET["id"];	//id is last element of uri
		}
		$result = $lezione->get();
		$jsonData = json_encode($result, true);

        header('Content-Type: application/json');
		echo $jsonData;
        break;
	
	case 'PUT':
		$argomento->_titolo = $_PUT["corso"];
		$arg = $argomento->get()[0];
		
		if($_PUT["turno1"])
			$lez = $lezione->put($_PUT["aula"], $arg, 1, $_PUT["posti"]);

		if($_PUT["turno2"])
			$lez = $lezione->put($_PUT["aula"], $arg, 2, $_PUT["posti"]);

		if($_PUT["turno3"])
			$lez = $lezione->put($_PUT["aula"], $arg, 3, $_PUT["posti"]);

		if($_PUT["turno4"])
			$lez = $lezione->put($_PUT["aula"], $arg, 4, $_PUT["posti"]);
		
		echo "OK";
		break;

    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	