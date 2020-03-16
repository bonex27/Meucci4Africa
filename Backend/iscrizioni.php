<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('class/iscrizione.php');
$iscrizione = new Iscrizione();
switch($requestMethod)
{
	case 'GET'://Ok
		session_start();

		if(isset($_SESSION["id"]))
		{
			$iscrizione->_idUtente = $_SESSION["id"];	//id is last element of uri
			$iscrizione->_idLezione = $_GET["id"];
			
			if(!$iscrizione()->checkTurno())
				die();

			$availableSeats = $iscrizione->getSpace();
			if($availableSeats <= 0)
				die();

			if(!$iscrizione->setPlace($availableSeats -1))
				die();

			$iscrizione->insert();

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