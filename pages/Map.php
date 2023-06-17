<?php
//phpinfo();
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="../assets/css/Bootstrap.min.css">
<style type="text/css">
    html { 
        height: 100%;
    }
    body { 
        height: 100%; 
        margin: 0; 
        padding: 0; 
    }
    div{
        text-align: center;
    }
    #carteId{ 
        height: 500px; 
        width: 100%;
    }
</style>
</head>
<body>
    <div class="container"> 
        <div class="row">
            <div class="col-md-2">
                <img src="../assets/images/logo.png" style="max-width: 100%; max-height: 100%;">
            </div>
            <div class="col-md-7">
            </div>
            <div class="col-md-3">
                <h2 style="margin-top:15%;">Trouvez de l'aide</h2>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div id="carteId"></div>
            </div>
            <div class="col-md-4">
                <ul class="list-group">
                    <li class="list-group-item" style="text-align: left;"><strong>Localisation :</strong> <p id="nom"> ... </p> </li>
                    <li class="list-group-item" style="text-align: left;"><strong>Numero :</strong> <p id="numero"> ... </p> </li>
                    <li class="list-group-item" style="text-align: left;"><strong>Latitude :</strong> <p id="latitude"> ... </p> </li>
                    <li class="list-group-item" style="text-align: left;"><strong>Longitude :</strong> <p id="longitude"> ... </p> </li>
                    <li class="list-group-item" style="text-align: left;"><strong>Distance (kilometre):</strong> <p id="distance"> ... </p> </li>
                </ul>
            </div>
        </div>
        <div class="row" style="margin-top:5%;">
            <div class="col-md-5">
                <h3>Demander a vous localiser</h3>      
                <div class="row">
                    <div class="col-md-12 style="text-align:center;"><p class="btn">Se localiser</p></div>
                </div>  
                <input onclick="getLocalisation()" class="btn btn-primary" type="submit" value="Localiser" width="100%">
            </div>
            <div class="col-md-7">
                <h3>Saisir manuellement vos coordonnees</h3>
                <div class="row">
                    <div class="col-md-4"><p class="btn">Latitude</p></div>
                    <div class="col-md-4"><p class="btn">Longitude</p></div>
                    <div class="col-md-3"><p class="btn"></p></div>
                </div>  
                <div class="row">
                    <form id="saisie">
                        <input class="btn btn-dark" style="border: 1px;" type="number" step="0.0000000001" name="latitude" value=-18.985980>
                        <input class="btn btn-dark" style="border: 1px;" type="number" step="0.0000000001" name="longitude" value=47.53280>
                        <input type="submit" class="btn btn-primary" value="Localiser">
                    </form>
                </div>  
            </div>
        </div>
    </div>
    <!-- <script type="text/javascript" src="../assets/js/googleApi.js">
    </script> -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false">
    </script> 
    <script type="text/javascript" src="../assets/js/script.js">
    </script>
</body>
</html>
