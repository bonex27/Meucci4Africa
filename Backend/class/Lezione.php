<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class Lezione 
{
    protected $db;
    public $_id;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function get() {
		/*
		Nella prima parte esegue l' aggiunta del nuovo studente
		*/
		
		if(!isset($this->_id))
		{
			try {
				$sql = 'SELECT a.nomeAula, t.idTurno, t.oraInizio, t.oraFine, l.postiliberi, l.postioccupati
				FROM lezione l
				INNER JOIN aula a
				ON l.aula = a.idAula
				INNER JOIN turno t
				on l.turno = t.idTurno;';
				$stmt = $this->db->prepare($sql);
				$stmt->execute();
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				return $result;			
	
			}
			catch (Exception $e)
			{
				header("HTTP/1. 500 Internal server error");
				
			}
		}
		else
		{
			try
			{
				$sql = 'SELECT a.nomeAula, t.idTurno, t.oraInizio, t.oraFine, l.postiliberi, l.postioccupati
				FROM lezione l
				INNER JOIN aula a
				ON l.aula = a.idAula
				INNER JOIN turno t
				on l.turno = t.idTurno
				where l.argomento = :id';
				$data = [
					'id' => $this->_id,
				];
				$stmt = $this->db->prepare($sql);
				$stmt->execute($data);
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				return $result;	
			}
			catch (Exception $e)
			{
				header("HTTP/1.0 400 Bad request");
				echo $e;
			}
		}


	}	
 
}
?>