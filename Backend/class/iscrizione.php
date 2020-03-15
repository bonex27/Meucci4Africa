<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
class Iscrizione 
{
    protected $db;
    public $_idUtente;
	public $_idLezione;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function insert() {
        try {
			$sql = "INSERT INTO iscrizione VALUE (DEFAULT, :utente, :lezione);";
			$data = [
				'utente' => $this->_idUtente + 0,
				'lezione' => $this->_idLezione + 0,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$result = "OK";
			echo"Iscritto";	
	
		}
		catch (Exception $e)
		{
            header("HTTP/1.1 400 Bad request");
            echo("insert " . $e);
		}
    }

    public function checkSpace() {
		
		try
			{
				$sql = 'SELECT  l.postiLiberi, l.postiOccupati
				FROM lezione l
				where l.idLezione = :idLezione and l.postiliberi > 0';
				$data = [
					'idLezione' => $this->_idLezione,
				];
				$stmt = $this->db->prepare($sql);
				$stmt->execute($data);
                $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                $this->remPlace($result[0]["postiLiberi"]);
				
			}
			catch (Exception $e)
			{
				header("HTTP/1.0 400 Bad request");
				echo("check " . $e);
			}
		
    }
    
    public function remPlace($posti) {
		try
			{
				$posti--;
				print_r($posti);
				$sql = "UPDATE lezione SET postiLiberi = :place WHERE (`idLezione` = :id)";
				$data = [
                    'id' => $this->_idLezione,
                    'place' => $posti,
				];
				$stmt = $this->db->prepare($sql);
				$stmt->execute($data);
                $this->insert();
				
			}
			catch (Exception $e)
			{
				header("HTTP/1.0 400 Bad request");
				echo("update " . $e);
			}
		
	}
}
?>