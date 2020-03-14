<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];

$utente = new Utente();
switch($requestMethod) {

    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $utente->_email = $input["email"];
        $utente->_password = md5($input["password"]);

        $dati = $utente->login();

        session_start();
        $_SESSION['id'] = $dati[0];
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	