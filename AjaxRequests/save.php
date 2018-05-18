<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");

    $name = $_POST['name'];
    $quote = $_POST['quote'];
    $pic = $_POST['pic'];

    $myObj->name = $name;
    $myObj->pic = $pic;
    $myObj->quote = $quote;

    $inp = file_get_contents('./assets/data/musicians.json');
    $tempArray = json_decode($inp);
    array_push($tempArray, $myObj);
    $jsonData = json_encode($tempArray);
    file_put_contents('./assets/data/musicians.json', $jsonData);
?>