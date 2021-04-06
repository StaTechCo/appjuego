<?php 
// Funcion de sanatizar datos 
function filtrado($datos){
    $datos = trim($datos); // Elimina espacios antes y después de los datos
    $datos = stripslashes($datos); // Elimina backslashes \
    $datos = htmlspecialchars($datos); // Traduce caracteres especiales en entidades HTML
    return $datos;
}

        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $output = array();
            
            $idEstado = filtrado($_POST["estado"]);
            $idMunicipio = filtrado($_POST["municipio"]);
            $correo = filtrado($_POST["email"]);
            $celular = filtrado($_POST["cellphone"]);
           
            // Guarda empresa registro
            $url =  "//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
            $escaped_url = htmlspecialchars( $url, ENT_QUOTES, 'UTF-8' );
            $escaped_url = filtrado($escaped_url);  
            $last = explode("/", $escaped_url);
            $last_word =  $last[3];
            $output['status'] = 'success';
            $msg = "";



 // Valida municipio 
if(empty($idMunicipio)) {
    $msg = 'Seleccione un municipio valido';
    $output['status'] = 'error';     
} 
else if(!is_numeric($idMunicipio)) {
    $msg = 'Seleccione un municipio valido';
    $output['status'] = 'error';
} 
if(is_numeric($idMunicipio)){
    if($idMunicipio < 1){
        $msg  = 'Seleccione un municipio valido ';
        $output['status'] = 'error';
    }
}
// Valida estado 
if(empty($idEstado)) {
    $msg = ' Seleccione un estado valido ';
    $output['status'] = 'error';     
} 
else if(!is_numeric($idEstado)) {
    $msg = ' Seleccione un estado valido ';
    $output['status'] = 'error';
} 
if(is_numeric($idEstado)){
    if($idEstado < 1){
        $msg  = 'Seleccione un estado valido';
        $output['status'] = 'error';
    }
}

// Validar numero
if(!is_numeric($celular)){
    $msg = " Llenar numero de celular ";
    $output['status'] = 'error'; 
}
if(strlen($celular) != 10){
    $msg = " Numero de telefono no valido ";
    $output['status'] = 'error'; 
}

// Valida email PHP
if (empty($correo)) {
    $msg = " Correo es requerido ";
    $output['status'] = 'error';
} 
else{
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $msg = " Correo no valido";
    $output['status'] = 'error';
  }
}
    
    $output['error'] = $msg;
    
    if ($output['status'] == 'error'){
                echo json_encode($output); 
    }
    else {        
        include_once 'dbConfig.php';
        $query ="INSERT INTO registrosjuegos (email,telefono,idmunicipio,idestado,dtime,marca) VALUES (:email, :telefono, :idmunicipio, :idestado, :dtime, :marca)";
        $statement = $con->prepare($query);
        $statement->bindParam(':email', $correo);
        $statement->bindParam(':telefono', $celular , PDO::PARAM_INT);
        $statement->bindParam(':idmunicipio', $idMunicipio,PDO::PARAM_INT);
        $statement->bindParam(':idestado', $idEstado,PDO::PARAM_INT);
        date_default_timezone_set('America/Mexico_City');
        $nowFormat = date('Y-m-d H:i:s');
        $statement->bindParam(':dtime', $nowFormat);
        $statement->bindParam(':marca', $last_word); 
        $statement->execute();
        echo json_encode($output);
    }
                        
        
}
                
    

?> 