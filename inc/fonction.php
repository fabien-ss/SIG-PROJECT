<?php
    function obtenir_centre_proche($latitude, $longitude){
        $connexion = connection();
        $sql = "SELECT * FROM POSTE ORDER BY ST_DistanceSphere(geom , ST_SetSRID(ST_MakePoint(".$longitude.",".$latitude."), 4326)) LIMIT 1";
        $statement = $connexion->query($sql);
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $connexion = null;
        return $results;
    }
    function connection(){
        $host = 'localhost';
        $dbname = 'poste_de_police';
        $user = 'fabien';
        $password = '123Fabien$';
        try {
            $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }
?>