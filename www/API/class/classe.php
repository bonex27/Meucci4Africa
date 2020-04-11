<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
class Classe 
{
    protected $db;
	public $_id;
	public $_titolo;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
    public function get() 
    {
		try
		{
			$sql = 'select * from classi';
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
	public function getClassId($alias)
	{
		$sql = "select * from classi where alias = :alias";
		$data = [
			'alias' => $alias,
		];

		$stmt = $this->db->prepare($sql);
		$stmt->execute($data);
		$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

		if (count($result) > 0)
		{	
			return (int)$result[0]["idClasse"];
		}
	}
}
?>