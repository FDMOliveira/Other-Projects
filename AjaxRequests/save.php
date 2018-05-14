<?php
    $data[] = $_POST['object'];

    $inp = file_get_contents('./assets/data/musicians.json');
    $tempArray = json_decode($inp);
    array_push($tempArray, $data);
    $jsonData = json_encode($tempArray);
    file_put_contents('./assets/data/musicians.json', $jsonData);
?>