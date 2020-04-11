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
			$seatsData = $iscrizione->getSpace();
			if(is_null($seatsData))
			{
				header("HTTP/1.0 400 Bad Request");		
				exit();
			}
			if($seatsData[0]["postiOccupati"] >= $seatsData[0]["postiTotali"] )
			{
				header("HTTP/1.0 403 Forbidden");		
				exit();
			}
			if(!$iscrizione->setPlace($seatsData[0]["postiOccupati"] + 1))
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
			$iscrizione->_idUtente = $_SESSION["id"];
			if(isset($_GET["id"]))
			{
				$iscrizione->_idIscrizione = $_GET["id"];
			}
			if(isset($_GET["idLezione"]))
			{
				$iscrizione->_idLezione = $_GET["idLezione"];

				$seatsData = $iscrizione->getSpace();

				if(!$iscrizione->setPlace($seatsData[0]["postiOccupati"] - 1))
					return;

				$iscrizione->del();
			}
			else
			{
				header("HTTP/1.0 400 Bad Request");
				return;
			}
		}
		else
		{
			header("HTTP/1.0 401 Not Authorized");
			return;
		}
		break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	