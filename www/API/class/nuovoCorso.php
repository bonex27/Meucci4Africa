<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
class nuovoCorso 
{
    protected $db;
    public $idArgomento;
    public $idAula;
    public $idTurno; 
    public $postiLiberi; 
    public $postiOccupati;
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
    public function post() 
    {
			try
			{
                $sql = "INSERT INTO lezione (aula, argomento, turno, postiLiberi,postiOccupati) VALUES (:aula, :argomento, :turno, :postiLiberi, :postiOccupati);";
                
				$data = [
                    'aula' => $this->idAula,
                    'argomento' => $this->idArgomento,
                    'turno' => $this->idTurno,
                    'postiLiberi' => $this->postiLiberi,
                    'postiOccupati' => $this->postiOccupati,

                ];
                $stmt = $this->db->prepare($sql);
                $stmt->execute($data);
                $result = "OK";
                return $result;			
	
			}
			catch (Exception $e)
			{
				header("HTTP/1.1 500 Internal server error");
			}
    }
}
?>