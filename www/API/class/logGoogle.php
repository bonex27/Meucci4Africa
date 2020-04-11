<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
class logGoogle 
{
    protected $db;
	public $_id;
	public $_nome;
    public $_cognome;
    public $_email;
 
	public function __construct($email,$cognome,$nome,$classe)
	{
        $this->db = new DBConnection();
		$this->db = $this->db->returnConnection();
		$this->_nome = $nome;
		$this->_cognome = $cognome;
		$this->_email = $email;
		$this->_classe = $classe;

	}
	
	public function sign()
	{
		try
		{
			$sql = "INSERT INTO utente (nome, cognome, email, classe) VALUES (:nome, :cognome , :email, :classe)";

			$data = [
				'nome' => $this->_nome,
                'cognome' => $this->_cognome,
				'email' => $this->_email,
				'classe' => $this->_classe,
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$this->checkJustLog();
		}
		catch (Exception $e)
		{
			header("HTTP/1.1 400 Bad request");
		}
		
	}
	public function checkJustLog()
	{
        $sql = 'select * from utente where email = :email';
        $data = [
            'email' => $this->_email,
        ];
        $stmt = $this->db->prepare($sql);
        $stmt->execute($data);
		$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
		
        if (count($result) > 0)
        {
            session_start();
			$_SESSION["id"] = (int)$result[0]["idUtente"];
			return true;
        }
		else
		{
			$this->sign();
		}	
	}	
}
?>