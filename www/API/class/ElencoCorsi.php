<?php
 
include_once("DBConnection.php");
class ElencoCorsi 
{
    protected $db;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function get()
	{
		try
		{
			$sql = 'SELECT u.idUtente, u.nome, u.cognome, l.aula, a.nomeAula, l.turno, l.postiTotali, l.postiOccupati, l.argomento, ar.titolo
            FROM utente u
            INNER JOIN iscrizione i
            ON i.utente = u.idUtente
            INNER JOIN lezione l
            on l.idLezione = i.lezione
            INNER JOIN argomento ar
            ON ar.idArgomento = l.Argomento
            INNER JOIN aula a
            on a.idAula = l.aula
            INNER JOIN turno t
            on t.idTurno = l.turno
            ORDER BY a.idAula, l.turno, u.cognome, u.nome';

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
?>