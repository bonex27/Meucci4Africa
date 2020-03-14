<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include_once("class/Utente.php");

$utente = new Utente();
switch($requestMethod) {

    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $utente->_email = $input["email"];
        $utente->_password = md5($input["password"]);

        $dati = $utente->login();

        session_start();
        
        if(isset($dati[0]))
        {
            $_SESSION['id'] = $dati[0];
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