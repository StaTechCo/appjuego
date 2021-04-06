<?php
 include_once 'dbConfig.php';
    if(isset($_POST["tipo"])){
        if($_POST["tipo"] == "estados"){
            $query = "SELECT * FROM estados ORDER BY nombre ASC";
            $statement = $con->prepare($query);
            $statement->execute();
            $data = $statement->fetchAll();
                foreach($data as $row){
                    $output[] = array(
                        'id'  => $row["idEstado"],
                        'name'  => $row["nombre"]
                );
            }
            echo json_encode($output);
        }
    else {
        $query = "SELECT * FROM municipios WHERE idEstado = :idestado  ORDER BY nombre ASC";
        $statement = $con->prepare($query);
        $idestado = $_POST["idestado"];
        $statement->bindParam(':idestado', $idestado, PDO::PARAM_INT); 
        $statement->execute();
        $data = $statement->fetchAll();
            foreach($data as $row){
                $output[] = array(
                    'id'  => $row["idMunicipio"],
                    'name'  => $row["nombre"]
                );
            }
        echo json_encode($output);
    }
}

?>
