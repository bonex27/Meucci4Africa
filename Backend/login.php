<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('./class/Utente.php');
$utente = new Utente();
switch($requestMethod) {

    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $utente->_email = $input["email"];
        $utente->_password = $input["password"];

        $student->login();
        $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);

        header('Content-Type: application/json');
		echo $js_encode;
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	