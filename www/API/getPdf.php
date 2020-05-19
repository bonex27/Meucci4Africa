<?php
require "../lib/fpdf.php";
include_once('class/ElencoCorsi.php');

class myPDF extends FPDF
{

    function header()
    {
        $this->Image("../img/logo.png",5,5,32,32);
        $this->SetFont('Arial','B',14);
        $this->Cell(190,5,"Meucci for Africa",0,0,"C");
        $this->Ln();
        $this->SetFont("Times","",12);
        $this->Cell(190,10,"Disposizione Classi",0,0,"C");
        $this->Ln(20);
    }
    function footer()
    {
        $this->SetY(-15);
        $this->SetFont("Arial","",8);
        $this->Cell(0,10,"Page".$this->PageNo()."/{nb}",0,0,"C");

    }
    function getProfessor($idAula,$nTurno)
    {
        // create & initialize a curl session
        $curl = curl_init();

        // set our url with curl_setopt()
        curl_setopt($curl, CURLOPT_URL, "https://orariofacile.itismeucci.it/api/orario/aule.php?id=".$idAula."&sostituzioni=true");

        // return the transfer as a string, also with setopt()
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        // curl_exec() executes the started curl session
        // $output contains the output string
        $json = curl_exec($curl);
        $json = json_decode($json);
        // close curl resource to free up system resources
        // (deletes the variable made by curl_init)
        curl_close($curl);
        //print_r($json);
        $professor = "";
        for($i=0;$i< count($json->orario[0]);$i++)
        {

            //console($json->orario[0][$i]->inizio);
            //console_log($nTurno);

            if($json->orario[0][$i]->inizio == $nTurno)
            {
                $professor = $json->orario[0][$i]->docenti[0]->nome;


                if($json->orario[0][$i]->inizio == $nTurno++)
                {
                    $professor .= $json->orario[0][$i]->docenti[0]->nome;
                    //$professor .= $json->orario[0][$i]->materia;
                }
                else
                 {
                    $professor .= "Empty";
                    //$professor .= $json->orario[0][$i]->materia;
                }
                return $professor;
            }
            else
            {
                $professor = "Empty";

                if($json->orario[0][$i]->inizio == $nTurno++)
                {
                    $professor .= $json->orario[0][$i]->docenti[0]->nome;
                    //$professor .= $json->orario[0][$i]->materia;
                }
                else
                 {
                    $professor .= "Empty";
                    //$professor .= $json->orario[0][$i]->materia;
                }
                return $professor;
            }
            
        }
    }
    function classTitle($nomeAula)
    {
        $this->SetFont("Times","B",16);
        $this->Cell(190,10,"Classe".$nomeAula,0,0,"C");      
        $this->Ln();
    }
    function turnNumber($turno,$titolo,$aula)
    {
        $t = 0;
           switch($turno)
           {
               case 2:
                $t = 3;
               break;
               case 3:
                $t = 5;
               break;
           }
        $this->SetFont("Times","B",12);
        $this->Cell(190,10,$titolo."   Turno ".$turno."Docenti ". $this->getProfessor($aula,$t),0,0,"C");      
        $this->Ln();
    }
    function viewTable($nome,$cognome)
    {
            $this->Cell(80,10,$nome."   ".$cognome,1,0,"C");
            //$this->Cell(80,10,$cognome,0,0,"C");
            $this->Ln();
        }
        
}
    $pdf = new  myPDF();
    $EC = new ElencoCorsi();
    $pdf->AliasNbPages();
    $pdf->AddPage("P","A4",0);
    $data = $EC->get();
    $aula = $data[0]["aula"];
    $turno = -1;

for($i=0;$i< count($data);$i++)
{ 
    if($data[$i]["aula"] != $aula)
       { 
        $pdf->AddPage("P","A4",0);
           $pdf->classTitle($data[$i]["nomeAula"]);
           $aula = $data[$i]["aula"];
           $turno = -1;

       }
       if($data[$i]["turno"] != $turno)
       { 
           $pdf->turnNumber($data[$i]["turno"],$data[$i]["titolo"],$data[$i]["aula"]);
           //echo $pdf->getProfessor($data[$i]["aula"],$t);
           $turno = $data[$i]["turno"];
       }
    $pdf->viewTable($data[$i]["nome"],$data[$i]["cognome"]);
}
    


    $pdf->Output();
?>