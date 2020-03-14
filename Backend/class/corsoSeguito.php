<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class mieiCorsi 
{
    protected $db;
    public $_id;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function get() {
			try {
				$sql = 'SELECT t.idTurno, a.nomeAula, t.oraInizio, t.oraFine
				FROM utente u
				INNER JOIN iscrizione i
				ON i.utente = u.idUtente
				INNER JOIN lezione l
                on l.idLezione = i.lezione
                INNER JOIN aula a
                on a.idAula = l.aula
                INNER JOIN turno t
                on t.idTurno = l.turno
                where u.idUtente = :id';
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
				header("HTTP/1. 500 Internal server error");
				echo $e;
				echo $this->_id;
			}
	}	
 
}
?>