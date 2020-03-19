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
    public $_nome;
    public $_cognome;
    public $_email;
    public $_password;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
    }
 
    //insert
	public function insert()
	{
		/*
		Nella prima parte esegue l' aggiunta del nuovo studente
		*/
		try
		{
    		$sql = 'INSERT INTO utente (nome, cognome, email, password)  VALUES (:nome, :cognome, :email, :password)';
    		$data = [
			    'nome' => $this->_nome,
			    'cognome' => $this->_cognome,
			    'email' => $this->_email,
				'password' => $this->_password,

			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
 
		} catch (Exception $e)
		{
    		die("Errore inserimento".$e);
		}
	}	
	public function login()
	{
		/*
		Nella prima parte esegue l' aggiunta del nuovo studente
		*/
		try
		{
    		$sql = 'select idUtente from utente where email = :email and password = :password';
    		$data = [
			    'email' => $this->_email,
				'password' => $this->_password,

			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			return $result;			
 
		} catch (Exception $e)
		{
    		die("Oh noes! There's an error in the query!".$e);
		}
	}	
}
?>