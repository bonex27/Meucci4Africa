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
            header("HTTP/1.0 403 Forbidden");
            return;
        }

        $utente->_id = $_SESSION["id"];

        $profileInfo = $utente->get();

        if($profileInfo[0]["authLevel"]>0)
        {
            $profileInfo2 = $utente->list();
        }
        else
	        header("HTTP/1.0 401 Unauthorized");
        
        break;
        case 'PUT':
            session_start();

            if(!isset($_SESSION["id"]))
            {
                header("HTTP/1.0 403 Forbidden");
                return;
            }

            $utente->_id = $_SESSION["id"];
            $profileInfo = $utente->get();
    
            if($profileInfo[0]["authLevel"]<=0)
            {
                header("HTTP/1.0 401 Unauthorized");
                return;
            }

            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);
            
            if(isset($input["id"]))
            {
                $utente->_id = $input["id"];
            }
            else
            {
                header("HTTP/1.0 400 Bad Request");
            }
    
            if(isset($input["nome"]))
            {
                $utente->_nome = $input["nome"];
            }
            else
            {
                $utente->_nome = "";
            }
            if(isset($input["cognome"]))
            {
                $utente->_cognome = $input["cognome"];
            }
            else
            {
                $utente->_cognome = "";
            }
            if(isset($input["email"]))
            {
                $utente->_email = $input["email"];
            }
            else
            {
                $utente->_email = "";
            }
            if(isset($input["classe"]))
            {
                $utente->_classe = $input["classe"];
            }
            else
            {
                $utente->_classe = "";
            }
    
            $utente->update();
        break;
        case 'DELETE':
            session_start();

            if(!isset($_SESSION["id"]))
            {
                header("HTTP/1.0 403 Forbidden");
                return;
            }

            $utente->_id = $_SESSION["id"];
            $profileInfo = $utente->get();
    
            if($profileInfo[0]["authLevel"]<=0)
            {
                header("HTTP/1.0 401 Unauthorized");
                return;
            }
            else
            {
                $utente->_id = $_GET["id"];
    
                $utente->delete();
            }
            break;
    default:
	    header("HTTP/1.0 405 Method Not Allowed");
	    break;
}

?>