<?php
/**
 * @package Meucci 4 Africa
 *
 * @author 
 *   
 */
 
include_once("DBConnection.php");
class nuovoCorso 
{
    protected $db;
    public $idArgomento;
    public $idAula;
    public $idTurno; 
    public $postiTotali; 
    public $postiOccupati;

	public function __construct()
	{
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
    public function post() 
    {
        try
        {
            $sql = "INSERT INTO lezione (aula, argomento, turno, postiTotali, postiOccupati) VALUES (:aula, :argomento, :turno, :postiTotali, :postiOccupati);";
            
            $data = [
                'aula' => $this->idAula,
                'argomento' => $this->idArgomento,
                'turno' => $this->idTurno,
                'postiTotali' => $this->postiTotali,
                'postiOccupati' => $this->postiOccupati,

            ];
            $stmt = $this->db->prepare($sql);
            $stmt->execute($data);
        }
        catch (Exception $e)
        {
            echo $e;
            header("HTTP/1.1 500 Internal server error");
        }
    }
}
?>