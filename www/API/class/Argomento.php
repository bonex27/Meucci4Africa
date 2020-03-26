<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
class Argomento 
{
    protected $db;
	public $_id;
	public $_titolo;
	public $_descrizione;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
	public function get() {

		
		if(!isset($this->_id))
		{
			try
			{
				$sql = 'select * from argomento';
				$stmt = $this->db->prepare($sql);
				$stmt->execute();
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				return $result;			
	
			}
			catch (Exception $e)
			{
				header("HTTP/1.1 500 Internal server error");
			}
		}
		else if(isset($this->_titolo))
		{
			try
			{
				$sql = 'select idArgomento from argomento where titolo = :titolo';
				$data = [
					'titolo' => $this->_titolo,
				];
				$stmt = $this->db->prepare($sql);
				$stmt->execute($data);
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				return $result;			
	
			}
			catch (Exception $e)
			{
				header("HTTP/1.1 400 Bad request");
			}
		}
		else
		{
			try
			{
				$sql = 'select * from argomento where idArgomento = :id';
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
				header("HTTP/1.1 400 Bad request");
				echo $e;
			}
		}


	}	

	public function put() {
		
		try
		{
			$sql = "INSERT INTO argomento ('titolo', 'descrizione') VALUES (:titolo, :descrizione);";
			$data = [
				'titolo' => $this->_titolo,
				'descrizione' => $this->_descrizione,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			
			
			$sql = 'select idArgomento from argomento where titolo = :titolo';
				$data = [
					'titolo' => $this->_titolo,
				];
				$stmt = $this->db->prepare($sql);
				$stmt->execute($data);
				$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
				return $result;	
	
		}
		catch (Exception $e)
		{
			header("HTTP/1.1 400 Bad request");
		}
		
	}
}
?>