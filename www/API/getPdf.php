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
    function classTitle($nomeAula)
    {
        $this->SetFont("Times","B",16);
        $this->Cell(190,10,"Classe".$nomeAula,0,0,"C");      
        $this->Ln();
    }
    function turnNumber($turno,$titolo)
    {
        $this->SetFont("Times","B",12);
        $this->Cell(190,10,$titolo."   Turno ".$turno,0,0,"C");      
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
           $pdf->turnNumber($data[$i]["turno"],$data[$i]["titolo"]);
           $turno = $data[$i]["turno"];
       }
    $pdf->viewTable($data[$i]["nome"],$data[$i]["cognome"]);
}
    


    $pdf->Output();
?>