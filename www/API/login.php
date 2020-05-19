<?php
include_once("class/Utente.php");

$requestMethod = $_SERVER["REQUEST_METHOD"];

$utente = new Utente();

switch($requestMethod)
{

    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $utente->_email = $input["email"];
        $utente->_password = $input["password"];

        $dati = $utente->get();

        session_start();
        
        if(isset($dati[0]["idUtente"]) && password_verify($utente->_password,$dati[0]["password"]) )
        {
            $_SESSION['id'] = (int)$dati[0]['idUtente'];
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