<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
include_once("iscrizione.php");
class Utente 
{
    protected $db;
    public $_id;
    public $_nome;
    public $_cognome;
    public $_email;
    public $_password;
    public $_classe;
 
	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
    }

	public function insert()
	{
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
 
		}
		catch (Exception $e)
		{
			echo $e;
			header("HTTP/1.0 400 Bad request");
		}
	}
	
	
	
	public function get()
	{
		try
		{
			if(isset($this->_id))
			{
				$sql = 'select u.nome, u.cognome, u.email, u.authLevel, c.nome as classe
				from utente u
				left join classi c on u.classe = c.idClasse
				where idUtente = :id';
				$data = [
					'id' => $this->_id,
				];

			}
			else
    		{
				$sql = 'select idUtente, password from utente where email = :email';
				$data = [
					'email' => $this->_email,
				];
			}
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			return $result;			
 
		}
		catch (Exception $e)
		{
			header("HTTP/1.0 500 Internal server error");
		}
	}	

	public function list()
	{
		try
		{
			$sql = 'select u.idUtente, u.nome, u.cognome, u.email, u.authLevel, c.nome as classe
				from utente u inner join classi c 
				on u.classe = c.idClasse';
			
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

	public function delete()
	{
		try
		{
			$iscrizioni = new Iscrizione();
			$iscrizioni->_idUtente = $this->_id;
			$iscrizioni->del();

			$sql = 'DELETE FROM utente WHERE idUtente = :id';
			$data = [
				'id' => $this->_id
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			session_destroy();
		}
		catch (Exception $e)
		{
			header("HTTP/1.0 500 Internal server error");
		}
	}

	public function update()
	{
		try
		{
			$data["id"] = (int)$this->_id;

			$sql = 'UPDATE utente SET ';

			if(isset($this->_nome))
			{
				$sql.=' nome = :nome,';
				$data["nome"] = $this->_nome;
			}

			if(isset($this->_cognome))
			{
				$sql.=' cognome = :cognome,';
				$data["cognome"] = $this->_cognome;
			}

			if(isset($this->_email))
			{
				$sql.=' email = :email,';
				$data["email"] = $this->_email;
			}

			if(isset($this->_classe))
			{
				
				$sql.=' classe = :classe';
				$data["classe"] = $this->_classe;
			}
			else
				$sql = substr_replace($sql, '', -1);
			
			$sql.=" WHERE idUtente = :id";

	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();

		}
		catch (Exception $e)
		{
			header("HTTP/1.0 400 Bad request");
		}
	}
}
?>