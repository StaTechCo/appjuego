<?php
// Datos de conexion
$servername = "localhost";
$username = "root";
$password = "";
$database = "appgames";

// Realizqar conexion 
try {
  $con = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password);
  // set the PDO error mode to exception
  $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e){
  echo "Conexion fallida: " . $e->getMessage(); 
}
	
?>