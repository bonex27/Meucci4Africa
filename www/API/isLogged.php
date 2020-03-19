<?php
session_start();

echo isset($_SESSION["id"])?"true":"false";
?>