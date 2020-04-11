<?php
include_once("class/Utente.php");

$requestMethod = $_SERVER["REQUEST_METHOD"];

$utente = new Utente();

switch($requestMethod)
{
    case 'GET':
        session_start();

        $utente->_id = $_SESSION["id"];

        $profileInfo = $utente->get();

        if($profileInfo[0]["authLevel"]>0)
        {
            $profileInfo2 = $utente->list();
            echo json_encode($profileInfo2);
        }
        else
	        header("HTTP/1.0 401 Unauthorized");
        
        break;
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}

?>