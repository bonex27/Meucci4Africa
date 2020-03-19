<?php
include_once('class/iscrizione.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$iscrizione = new Iscrizione();

switch($requestMethod)
{
	case 'GET'://Ok
		session_start();

		if(isset($_SESSION["id"]))
		{
			$iscrizione->_idUtente = $_SESSION["id"];	//id is last element of uri
			$iscrizione->_idLezione = $_GET["id"];
			
			if(!$iscrizione->checkTurno())				
			{
				header("HTTP/1.0 400 Bad Request");		
				exit();
			}
			echo "A";	
			$availableSeats = $iscrizione->getSpace();
			if($availableSeats <= 0)	//Redundant??
			{
				header("HTTP/1.0 400 Bad Request");		
				exit();
			}
			if(!$iscrizione->setPlace($availableSeats -1))
			{
				header("HTTP/1.0 400 Bad Request");		
				exit();
			}
			$iscrizione->insert();
		}
		else
		{
			header("HTTP/1.0 401 Not Authorized");
			return;
		}		
		break;
		
	case 'DELETE'://Ok
		session_start();
		
		if(isset($_SESSION["id"]))
		{
			$iscrizione->_idIscrizione = $_GET["id"];
			$iscrizione->_idLezione = $_GET["idLezione"];

			$availableSeats = $iscrizione->getSpace();

			if(!$iscrizione->setPlace($availableSeats +1))
				die();

			$iscrizione->del();

			//$jsonData = json_encode($result, true);
		}
		else{
			header("HTTP/1.0 401 Not Authorized");
		}
		break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	