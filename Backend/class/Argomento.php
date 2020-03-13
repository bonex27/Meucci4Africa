<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include("DBConnection.php");
class Utente 
{
    protected $db;
    public $_id;
	public $_titolo;
	public $_descrizione;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function get() {
		/*
		Nella prima parte esegue l' aggiunta del nuovo studente
		*/
		
		if($this->_id == null)
		{
			try {
				$sql = 'select * from argomenti';
				$stmt = $this->db->prepare($sql);
				$stmt->execute();
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				return $result;			
	
			}
			catch (Exception $e)
			{
				header("HTTP/1.0 500 Internal server error");
			}
		}
		else
		{
			try
			{
				$sql = 'select * from argomenti where id = :id';
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
			}
		}


	}	
 
}
?>