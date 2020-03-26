<?php
include_once('class/nuovoCorso.php');
include_once('class/Argomento.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$nuovoCorso = new nuovoCorso();
$argomento = new Argomento();

switch($requestMethod)
{

    case 'POST'://Ok
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $argomento->_id = $input['titolo'];
        $argomento->_id = $input['descrizione'];

        $id = $argomento->put();
        
        $nuovoCorso->$id[0]['idArgomento'];           
        $nuovoCorso->postiLiberi = $input['postiLiberi'];
        $nuovoCorso->postiOccupati = 0;
        
        if($input["turno1"] == "ok")
        {
            $nuovoCorso->idTurno = $input["turno1"];
            $argomento->put();
        }
        if($input["turno2"] == "ok")
        {
            $nuovoCorso->idTurno = $input["turno2"];
            $argomento->put();
        }
        if($input["turno3"] == "ok")
        {
            $nuovoCorso->idTurno = $input["turno3"];
            $argomento->put();
        }
        if($input["turno4"] == "ok")
        {
            $nuovoCorso->idTurno = $input["turno4"];
            $argomento->put();
        }
    
    default:
	    header("HTTP/1.1 405 Method Not Allowed");
	    break;
}
?>	