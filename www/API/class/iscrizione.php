<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
include_once("Lezione.php");
class Iscrizione 
{
	protected $db;
	public $_idIscrizione;
    public $_idUtente;
	public $_idLezione;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function insert()
	{
		try
		{
			$sql = "INSERT INTO iscrizione VALUE (DEFAULT, :utente, :lezione);";
			$data = [
				'utente' => $this->_idUtente + 0,
				'lezione' => $this->_idLezione + 0,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result = "OK";
		}
		catch (Exception $e)
		{
			//echo $e;
            header("HTTP/1.1 400 Bad request");
		}
    }

	public function getSpace()
	{
		try
		{
			$sql = 'SELECT  l.postiTotali, l.postiOccupati
			FROM lezione l
			where l.idLezione = :idLezione and l.postiTotali > l.postiOccupati';
			$data = [
				'idLezione' => $this->_idLezione,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			return($result[0]["postiOccupati"]);
		}
		catch (Exception $e)
		{
			header("HTTP/1.0 400 Bad request");
			return 0;
		}
		
	}
	
	public function checkTurno()
	{
		try
		{
			$lezione = new Lezione();
			$lezione->_idLezione = $this->_idLezione;
			print_r( $lezione->get());
			$turno = $lezione->get()[0]["idTurno"];
			echo $turno;
			$sql = 'SELECT i.utente, l.turno
			FROM iscrizione i
			INNER JOIN lezione l ON i.lezione = l.idLezione
			WHERE i.utente = :idUtente AND l.turno = :idTurno
			FOR update';
			$data = [
				'idTurno' => $turno,
				'idUtente' => $this->_idUtente
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			return !isset($result[0]);
			
		}
		catch (Exception $e)
		{
			header("HTTP/1.0 400 Bad request");
			echo $e;
			
			return FALSE;
		}
		
    }
    
	public function setPlace($posti)
	{
		try
		{
			$sql = "UPDATE lezione SET postiOccupati = :place WHERE (`idLezione` = :id)";
			$data = [
				'id' => $this->_idLezione,
				'place' => $posti,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			return TRUE;
		}
		catch (Exception $e)
		{
			header("HTTP/1.0 400 Bad request");
			
			return FALSE;
		}
		
	}
	public function del() {	//add user check
		try
		{
			if(isset($this->_idIscrizione))
			{
				$sql = 'DELETE FROM iscrizione
				WHERE idIscrizione = :id';
				$data = [
					'id' => $this->_idIscrizione + 0
				];
				//$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);		
			}
			else if(isset($this->_idUtente))
			{
				$sql = 'DELETE FROM iscrizione
				WHERE utente = :id';
				$data = [
					'id' => $this->_idUtente + 0
				];
			}
			else
			{
				header("HTTP/1. 500 Internal server error");
				return;
			}

			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
		}
		catch (Exception $e)
		{
			header("HTTP/1. 500 Internal server error");
			echo $e;
		}
	}
}
?>