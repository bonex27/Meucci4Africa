<?php
session_start();

echo isset($_SESSION["id"])?"True":"False";
?>