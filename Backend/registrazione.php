<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('./class/Utente.php');
$utente = new Utente();
switch($requestMethod) {

    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $utente->_nome = $input["nome"];
        $utente->_cognome = $input["cognome"];
        $utente->_email = $input["email"];
        $utente->_password = md5($input["password"]);

        $data = $utente->insert();
        session_start();
        $_SESSION['id'] = $dati[0];
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	