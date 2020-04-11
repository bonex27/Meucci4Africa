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
		if(isset($this->_idLezione))
		{
		
			$sql = 'SELECT l.idLezione, l.argomento, a.nomeAula, t.idTurno, t.oraInizio, t.oraFine ,l.postiTotali, l.postiOccupati
			FROM lezione l
			INNER JOIN aula a
			ON l.aula = a.idAula
			INNER JOIN turno t
			on l.turno = t.idTurno
			where l.idLezione = :idLezione and l.postiTotali > 0';
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
			session_start();

			$corsoSeguito = new mieiCorsi();
			$corsoSeguito->_id  = $_SESSION["id"];
			$infoCorsi = $corsoSeguito->get();

			for($i = 0;$i < count($infoCorsi); $i++)
			{
				$idTurn[$infoCorsi[$i]["idTurno"]] = true;	//Gets and sets turns the user has already occupied
				$idTopic[$infoCorsi[$i]["idArgomento"]] = true;	//Gets and sets topics the user has already occupied
				$idClass[$infoCorsi[$i]["idLezione"]] = true;	//Gets and sets topics the user has already occupied
			}

			try
			{
				$sql = 'SELECT l.idLezione, l.argomento, a.nomeAula, t.idTurno, t.oraInizio, t.oraFine ,l.postiTotali, l.postiOccupati
				FROM lezione l
				INNER JOIN aula a
				ON l.aula = a.idAula
				INNER JOIN turno t
				on l.turno = t.idTurno
				where l.argomento = :idArgomento ';
				$data = [
					'idArgomento' => $this->_idArgomento,
				];
				$stmt = $this->db->prepare($sql);
				$stmt->execute($data);
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				//TODO: Check if everything works fine.
				//NOTE: Seems to be working fine
				//TODO: Add checks to the backend
				for($i = 0;$i < count($result); $i++)
				{
					$result[$i]["isSubscribedToTurn"] = isset($idTurn[$result[$i]["idTurno"]]) ? 1 : 0;	//Checks whether the user already subscribed to the i-th turn 
					$result[$i]["isSubscribedToClass"] = isset($idClass[$result[$i]["idLezione"]]) ? 1 : 0;	//Checks whether the user already subscribed to the i-th class 
					$result[$i]["isSubscribedToTopic"] = isset($idTopic[$result[$i]["argomento"]]) ? 1 : 0;	//Checks whether the user already subscribed to the i-th topic 
					$result[$i]["postiOccupati"] += 0;	//convert to number
					$result[$i]["postiTotali"] += 0;	//convert to number
				}

				return $result;	
			}
			catch (Exception $e)
			{
				header("HTTP/1.0 400 Bad request");
			}
		}
		else
		{
			try
			{
				$sql = 'SELECT a.nomeAula, t.idTurno, t.oraInizio, t.oraFine, l.postiTotali, l.postioccupati
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

	 public function put($aula, $argomento, $turno, $postiTotali)
	 {
		try
		{
			$sql = "INSERT INTO lezione ('aula', 'argomento', 'turno', 'postiTotali', 'postiOccupati') VALUES (:aula, :argomento, :turno, :postiTotali, 0);";
			$data = [
				'aula' => $aula,
				'argomento' => $argomento,
				'turno' => $turno,
				'postiTotali' => $postiTotali,
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