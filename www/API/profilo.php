<?php
include_once("class/Utente.php");

$requestMethod = $_SERVER["REQUEST_METHOD"];

$utente = new Utente();

switch($requestMethod)
{
    case 'GET':
        session_start();
        if(!isset($_SESSION["id"]))
        {
            header("HTTP/1.0 400 Bad Request");
        }
        else
        {
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
        }
        break;
    case 'DELETE':
        session_start();
        if(!isset($_SESSION["id"]))
        {
            header("HTTP/1.0 400 Bad Request");
        }
        else
        {
            $utente->_id = $_SESSION["id"];

            $profileInfo = $utente->delete();
        }
        break;
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}

?>