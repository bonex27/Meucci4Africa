<?php
include_once('class/nuovoCorso.php');
include_once('class/Argomento.php');

$requestMethod = $_SERVER["REQUEST_METHOD"];

$nuovoCorso = new nuovoCorso();
$argomento = new Argomento();

switch($requestMethod)
{
    case 'POST':
        
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $argomento->_titolo = $input['titolo'];
        $argomento->_descrizione = $input['descrizione'];

        $id = $argomento->put();
        
        $nuovoCorso->idAula = $input["idAula"];
        $nuovoCorso->idArgomento =  $id[0]['idArgomento'];           
        $nuovoCorso->postiLiberi = $input['postiLiberi'];
        $nuovoCorso->postiOccupati = 0;

        if($input["turno1"] == true)
        {
            $nuovoCorso->idTurno = 1;
            $nuovoCorso->post();
        }
        if($input["turno2"] == true)
        {
            $nuovoCorso->idTurno = 2;
            $nuovoCorso->post();
        }
        if($input["turno3"] == true)
        {
            $nuovoCorso->idTurno = 3;
            $nuovoCorso->post();
        }
        if($input["turno4"] == true)
        {
            $nuovoCorso->idTurno = 4;
            $nuovoCorso->post();
        }
        break;
    default:
	    header("HTTP/1.1 405 Method Not Allowed");
	    break;
}
?>	