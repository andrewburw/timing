<?php

$database = "timing";
$user = "admin";
$pass = "***********";
$host = "***********";

$allowlist = array(
    '127.0.0.1',
    '127.0.0.2'
   
);
$q = intval($_GET['q']);
$time1 = intval($_GET['time']);
if (!$conn = pg_connect ("host=".$host." port=5432 dbname=".$database." user=".$user." password=".$pass."")) {
    $error = error_get_last();
    echo "Not connected!!, Erorr: ". $error['message']. "\n";
};

 $time = $time1;
if (filter_var($time, FILTER_VALIDATE_INT)) {
	// i'm new in PHP programing, and this part is for not to access throught get variable to sql code.
 switch ($time) {
	
    case 1:
        $tempVar = 1;   // month variable
		$monthDays = 31;// dayz in month
        break;
    case 2:
        $tempVar = 2;
		$monthDays = 28;
        break;
    case 3:
        $tempVar = 3;
		$monthDays = 31;
		break;
    case 4:
         $tempVar = 4;
		 $monthDays = 30;
		 break;
	case 5:
        $tempVar = 5;
		$monthDays = 31;
        break;
	case 6:
        $tempVar = 6;
		$monthDays = 30;
        break;
	case 7:
        $tempVar = 7;
		$monthDays = 31;
        break;
	case 8:
        $tempVar = 8;
		$monthDays = 31;
        break;
	case 9:
        $tempVar = 9;
		$monthDays = 30;
        break;	
	case 10:
        $tempVar = 10;
		$monthDays = 31;
        break;	
	case 11:
        $tempVar = 11;
		$monthDays = 30;
        break;
	case 12:
        $tempVar = 12;
		$monthDays = 31;
        break;	 
	case 13:
        $tempVar = 0;
		$monthDays = 0;
        break;	 	 
    default:
       echo("error in month!");
		$tempVar = 0;
		  break;
} 
} else {
    echo("Time Value is not an integer");
};

$sql3 = "SELECT * ";  // your SQL code to acces data with names and departaments

$sql4 = "SELECT * "; // your SQL code to acces data + $tempVar + $monthDays

if($q == 1){
$array = pg_exec($conn, $sql3);
} elseif ($q == 2) {
$array = pg_exec($conn, $sql4);	
} else {
	echo "<h1>ERROR!</h1>";
}


while ($data_row = pg_fetch_object($array)){

	$data[]=$data_row;
}


if(!in_array($_SERVER['REMOTE_ADDR'],$allowlist)){
   // check for accesability to your api
	$errorAray = array('sorry');
	print_r(json_encode($errorAray));
} else {
	print_array($data);
};


function print_array($aArray) {

 print_r(json_encode($aArray));
   
}

pg_close($conn);

 ?>
