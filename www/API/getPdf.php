<?php
require "../lib/fpdf.php";
include_once('class/aula.php');
class myPDF extends FPDF
{
    function header()
    {
        //$this->Image("../img/logo.png",120,7);
        $this->SetFont('Arial','B',14);
        $this->Cell(180,5,"Meucci for Africa",0,0,"C");
        $this->Ln();
        $this->SetFont("Times","",12);
        $this->Cell(180,10,"Disposizione Classi",0,0,"C");
        $this->Ln(20);
    }
    function footer()
    {
        $this->SetY(-15);
        $this->SetFont("Arial","",8);
        $this->Cell(0,10,"Page".$this->PageNo()."/{nb}",0,0,"C");

    }
    function headerTable()
    {
        $this->SetFont("Times","B",12);
        $this->Cell(95,10,"IdAula",1,0,"C");
        $this->Cell(95,10,"Nome Aula",1,0,"C");
        
        $this->Ln();
    }
    function viewTable()
    {
        $aula = new Aula();
        $result = $aula->get();
        //print_r($result);
        foreach($result as $row){
        
            $this->Cell(95,10,$row["idAula"],1,0,"C");
            $this->Cell(95,10,$row["nomeAula"],1,0,"C");
            $this->Ln();
        }
        $this->SetFont("Times","",12);
    }
}
    $pdf = new  myPDF();
    $pdf->AliasNbPages();
    $pdf->AddPage("P","A4",0);
    $pdf->headerTable();
    $pdf->viewTable();
    $pdf->Output();
?>