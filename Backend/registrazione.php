<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('./class/Student.php');
$utente = new Utente();
switch($requestMethod) {
    case 'GET'://ok

    $pathArray = explode('/', $_SERVER['REQUEST_URI']);
    if(isset($pathArray[3]))
        $id = $pathArray[3];
    else
        $id = -1;
	
		if($id != -1) {
			$student->_id = $id;
			$data = $student->one();
		} else {
            $data = $student->list();          
        }
        
		if(!empty($data)) {
          $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);
        } else {
          $js_encode = json_encode(array('status'=>FALSE, 'message'=>'There is no record yet.'), true);
        }
        header('Content-Type: application/json');
		echo $js_encode;
		break;
    
    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $utente->_nome = $input["nome"];
        $utente->_cognome = $input["cognome"];
        $utente->_email = $input["email"];
        $utente->_password = $input["password"];
        $utente->_sesso = $input["sesso"];


        $data = $student->insert();
        $js_encode = json_encode(array('status'=>TRUE, 'studentInfo'=>$data), true);

        header('Content-Type: application/json');
		echo $js_encode;
        break;
    
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}
?>	