<?php
include_once("class/Utente.php");

$requestMethod = $_SERVER["REQUEST_METHOD"];

$utente = new Utente();

switch($requestMethod)
{

    case 'GET'://Ok
        session_start();

        $utente->_id = $_SESSION["id"];

        $profileInfo = $utente->get();
        
        if(isset($profileInfo[0]))
        {
            echo json_encode($profileInfo);
        }
        else
        {
            header("HTTP/1.0 400 Bad Request");
        }
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}

?>