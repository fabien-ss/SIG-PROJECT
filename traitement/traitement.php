<?php
    require_once('../inc/fonction.php');
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $reponse = json_encode(obtenir_centre_proche($latitude, $longitude)); 
    echo $reponse;
?>