<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];
include('class/corsoSeguito.php');
$MieiCorsi = new MieiCorsi();

try
{
	switch($requestMethod)
	{
		case 'GET'://Ok
			session_start();

			if(isset($_SESSION["id"])) 	//if uri doesn't end with 'corsi'
			{
				$MieiCorsi->_id = $_SESSION["id"];	//id is last element of uri
				$result = $MieiCorsi->get();

				$jsonData = json_encode($result, true);

				header('Content-Type: application/json');
				echo $jsonData;
			}
			else
			{
				header("HTTP/1.0 401 Not Authorized");
			}	

			
			break;
		
		default:
			header("HTTP/1.0 405 Method Not Allowed");
			break;
	}
}
catch (Exception $e)
{
	header("HTTP/1.0 500 Internal Server Error");
}
?>	