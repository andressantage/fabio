<?php
   session_start();
   if(!isset($_SESSION['correo'])){
       header('Location: ../index.php');
       exit;
   } 
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if($_SESSION['categoria']==='todas'){
        $_SESSION['nivel']=$_POST['niv'];
        header("Location: todas.php");
       exit();
    }else{
        $_SESSION['nivel']=$_POST['niv'];
        header("Location: index.php");
       exit();
    }
   }
?>