<?php
include_once('class/Lezione.php');
include_once('class/Argomento.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$lezione = new Lezione();
$argomento = new Argomento();

switch($requestMethod)
{

	case 'GET'://Ok
		if(isset($_GET["idLezione"]))
		{
			$lezione->_idLezione = $_GET["idLezione"];	//id is last element of uri
		}
		if(isset($_GET["idArgomento"]))
		{
			$lezione->_idArgomento = $_GET["idArgomento"];	//id is last element of uri
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