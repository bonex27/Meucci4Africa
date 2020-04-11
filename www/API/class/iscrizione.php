<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
include_once("Lezione.php");
include_once("Argomento.php");
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
            header("HTTP/1.1 400 Bad request");
		}
    }

	public function getSpace()
	{
		try
		{
			$sql = 'SELECT  l.postiTotali, l.postiOccupati
			FROM lezione l
			where l.idLezione = :idLezione';
			$data = [
				'idLezione' => $this->_idLezione,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			return $result;
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
			$turno = $lezione->get()[0]["idTurno"];
			$argomento = $lezione->get()[0]["argomento"];

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

			$sql = 'SELECT count(a.idArgomento) as c -- only interested in number of rows
			FROM iscrizione i
			INNER JOIN lezione l on i.lezione = l.idLezione
			INNER JOIN argomento a on l.argomento = a.idArgomento
			WHERE i.utente = :user and a.idArgomento = :topic;';
			$data = [
				'user' => $this->_idUtente,
				'topic' => $argomento
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result2 = $stmt->fetchAll(\PDO::FETCH_ASSOC)[0]['c'];

			return ((!isset($result[0])) && ($result2 == 0));
		}
		catch (Exception $e)
		{
			header("HTTP/1.0 400 Bad request");
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
	public function del()
	{	//TODO ASAP: add user check
		try
		{
			if(isset($this->_idIscrizione))
			{
				$sql = 'DELETE FROM iscrizione
				WHERE idIscrizione = :id';
				$data = [
					'id' => $this->_idIscrizione + 0
				];	
			}
			else if(isset($this->_idUtente))
			{
				if(isset($this->_idLezione))
				{
					$sql = 'DELETE FROM iscrizione
					WHERE utente = :id AND lezione = :class';
					$data = [
						'id' => $this->_idUtente + 0,
						'class' => $this->_idLezione + 0
					];
				}
				else
				{
					$sql = 'UPDATE lezione l
					INNER JOIN iscrizione i ON i.lezione = l.idLezione
					SET l.postiOccupati = l.postiOccupati - 1
					WHERE i.utente = :id';
					$data = [
						'id' => $this->_idUtente + 0
					];
					$stmt = $this->db->prepare($sql);
					$stmt->execute($data);

					$sql = 'DELETE FROM iscrizione
					WHERE utente = :id';
					$data = [
						'id' => $this->_idUtente + 0
					];
				}
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
		}
	}
}
?>