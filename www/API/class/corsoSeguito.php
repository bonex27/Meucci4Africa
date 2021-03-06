<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
class mieiCorsi 
{
    protected $db;
    public $_id;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function get()
	{
		try
		{
			$sql = 'SELECT i.idIscrizione, l.idLezione ,t.idTurno, a.nomeAula, t.oraInizio, t.oraFine , ar.Titolo, ar.idArgomento
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
			where u.idUtente = :id
			ORDER BY l.turno';

			$data = [
				'id' => $this->_id
			];

			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
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