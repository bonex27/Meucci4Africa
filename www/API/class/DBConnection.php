<?php

class DBConnection
{
    private $_dbHostname ="ideeinbit.it:3306";
    private $_dbName = "ideeinbi_meucciforafrica";
    private $_dbUsername = "ideei_meucci";
    private $_dbPassword = "meucci2020";
    private $_con;

    public function __construct()
    {
        try
        {
            $this->_con = new PDO("mysql:host=$this->_dbHostname;dbname=$this->_dbName", $this->_dbUsername, $this->_dbPassword);    
            $this->_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->_con->exec('SET NAMES utf8');
        }
        catch(PDOException $e)
        {
            header("HTTP/1.0 500 Internal Server Error");
        }

    }

    public function returnConnection()
    {
        return $this->_con;
    }
}

?>