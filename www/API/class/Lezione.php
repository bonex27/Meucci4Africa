<?php
include_once("DBConnection.php");
include_once("corsoSeguito.php");
class Lezione 
{
    protected $db;
    public $_idLezione;
    public $_idArgomento;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function get()
	{
		session_start();
		/*
		Nella prima parte esegue l' aggiunta del nuovo studente
		*/
		if(isset($this->_idLezione))
		{
		
			$sql = 'SELECT l.idLezione, a.nomeAula, t.idTurno, t.oraInizio, t.oraFine ,l.postiliberi, l.postioccupati
			FROM lezione l
			INNER JOIN aula a
			ON l.aula = a.idAula
			INNER JOIN turno t
			on l.turno = t.idTurno
			where l.idLezione = :idLezione and l.postiliberi > 0';
			$data = [
				'idLezione' => $this->_idLezione,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			return $result;	
		}
		else if(isset($this->_idArgomento))
		{
			$corsoSeguito = new mieiCorsi();
			$corsoSeguito->_id  = $_SESSION["id"];
			$turni = $corsoSeguito->get();
			for($i = 0;$i < count($turni); $i++)
			{
				$idT[$turni[$i]["idTurno"]] = true;
			}
			try
			{
				$sql = 'SELECT l.idLezione, a.nomeAula, t.idTurno, t.oraInizio, t.oraFine ,l.postiliberi, l.postioccupati
				FROM lezione l
				INNER JOIN aula a
				ON l.aula = a.idAula
				INNER JOIN turno t
				on l.turno = t.idTurno
				where l.argomento = :idArgomento and l.postiliberi > 0';
				$data = [
					'idArgomento' => $this->_idArgomento,
				];
				$stmt = $this->db->prepare($sql);
				$stmt->execute($data);
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				for($i = 0;$i < count($result); $i++)
				{
					if(isset($idT[$result[$i]["idTurno"]]))
						{
							$result[$i]["justS"] = 1;
						}
					else
					{
						$result[$i]["justS"] = 0;
					}
				}

				return $result;	
			}
			catch (Exception $e)
			{
				header("HTTP/1.0 400 Bad request");
				echo $e;
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


	}	
 	public function put($aula, $argomento, $turno, $postiLiberi) {
		
		try
		{
			$sql = "INSERT INTO lezione ('aula', 'argomento', 'turno', 'postiLiberi', 'postiOccupati') VALUES (:aula, :argomento, :turno, :postiLiberi, 0);";
			$data = [
				'aula' => $aula,
				'argomento' => $argomento,
				'turno' => $turno,
				'postiLiberi' => $postiLiberi,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result = "OK";
			return $result;			
	
		}
		catch (Exception $e)
		{
			header("HTTP/1.1 400 Bad request");
		}
		
	}
}
?>