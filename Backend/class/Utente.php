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
    public $_name;
    public $_surname;
    public $_sidiCode;
    public $_taxCode;
 
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
    }
 
    //insert
    public function insert() {
		/*
		Nella prima parte esegue l' aggiunta del nuovo studente
		*/
		try {
    		$sql = 'INSERT INTO utenti (nome, cognome, email, password,sesso)  VALUES (:nome, :cognome, :email, :password, :sesso)';
    		$data = [
			    'nome' => $this->_nome,
			    'cognome' => $this->_cognome,
			    'email' => $this->_email,
				'password' => $this->_password,
				'sesso' => $this->_sesso,
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
			echo "a";
 
		} catch (Exception $e) {
    		die("Oh noes! There's an error in the query!".$e);
		}

		/*
		Nella seconda parte esegue la visualizzazione del nuovo studente
		*/
		try {
    		$sql = "SELECT * FROM student WHERE sidi_Code=:sidiCode";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'sidiCode' => $this->_sidiCode
			];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
 
    }
   
    // getAll 
    public function list() {
    	try {
    		$sql = "SELECT * FROM student";
		    $stmt = $this->db->prepare($sql);
 
		    $stmt->execute();
		    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
    }

    // getOne
    public function one() {
    	try {
    		$sql = "SELECT * FROM student WHERE id=:id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!");
		}
    }
 
    // delete TODO
    public function delete() {
		try {
    		$sql = "DELETE FROM student WHERE id= :id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'id' => $this->_id
			];
		    $stmt->execute($data);
		    return "Ok";
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!".$e);
		}
    }

    // put TODO
    public function put() {
		try {
    		$sql = "UPDATE student SET name = :name, surname = :surname, sidi_Code = :sidiCode, tax_Code = :taxCode WHERE id = :id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
				'id' => $this->_id,
			    'name' => $this->_name,
			    'surname' => $this->_surname,
			    'sidiCode' => $this->_sidiCode,
			    'taxCode' => $this->_taxCode,
			];
		    $stmt->execute($data);
		    return "Ok";
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!".$e);
		}
    }
 
    // patch TODO
    public function patch() {
		try {
			$campi="";
			if(!is_null($this->_name))
				$campi .= "name = :name,";

			if(!is_null($this->_surname))
				$campi .= "surname = :surname,";

			if(!is_null($this->_sidiCode))
				$campi .= "sidi_code = :sidiCode,";

			if(!is_null($this->_taxCode))
				$campi .= "tax_code = :taxCode,";

			$campi = rtrim($campi,",");

    		$sql = "UPDATE student SET ".$campi." WHERE id = :id";
			$stmt = $this->db->prepare($sql);
			
		    $data = [
				'id' => $this->_id,
			];
		if(!is_null($this->_name))
			$data['name'] = $this->_name;

		if(!is_null($this->_surname))
			$data['surname'] = $this->_surname;

		if(!is_null($this->_sidiCode))
			$data['sidiCode'] = $this->_sidiCode;

		if(!is_null($this->_taxCode))
			$data['taxCode'] = $this->_taxCode;

		$stmt->execute($data);
		echo $sql;
		echo var_dump($data);
		    return "Ok";
		} catch (Exception $e) {
		    die("Oh noes! There's an error in the query!".$e);
		}
    }
 
}
?>