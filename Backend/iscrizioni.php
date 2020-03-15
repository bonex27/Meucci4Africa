<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('class/iscrizione.php');
$iscrizione = new Iscrizione();
switch($requestMethod) {
-
	case 'GET'://Ok
		session_start();

		if(isset($_SESSION["id"])) 	//if uri doesn't end with 'corsi'
		{
			$iscrizione->_idUtente = $_SESSION["id"];	//id is last element of uri
            $iscrizione->_idLezione = $_GET["id"];
            //$result =$MieiCorsi->get();
            $iscrizione->checkSpace();
			//$jsonData = json_encode($result, true);

        	//header('Content-Type: application/json');
			//echo $jsonData;
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