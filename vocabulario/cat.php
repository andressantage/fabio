<?php
   session_start();
   if(!isset($_SESSION['correo'])){
       header('Location: ../index.php');
       exit;
   } 
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if($_POST['cat']==='todas'){
        $_SESSION['categoria']=$_POST['cat'];
       header("Location: todas.php");
       exit();
    }else{
        $_SESSION['categoria']=$_POST['cat'];
       header("Location: index.php");
       exit();
    }
       
   }
?>