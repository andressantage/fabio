<?php
    session_start();
    if(!isset($_SESSION['correo'])){
        header('Location: index.php');
        exit;
    }
    $correo=$_SESSION['correo'];
    // Realizar la conexión a la base de datos MySQL
    include("../index/conexion.php");
    $conexion=conectar();

    // Verificar si la conexión fue exitosa
    if (!$conexion) {
    die("Error al conectar a la base de datos: " . mysqli_connect_error());
    }

    // Realizar la consulta para obtener los datos
    $query = "SELECT * FROM accessories UNION
    SELECT * FROM action UNION
    SELECT * FROM adjetivos UNION
    SELECT * FROM adverbios UNION
    SELECT * FROM airtravel UNION
    SELECT * FROM appearance2 UNION
    SELECT * FROM aroundtown UNION
    SELECT * FROM articulos UNION
    SELECT * FROM bathrooms UNION
    SELECT * FROM beaches UNION
    SELECT * FROM bedrooms UNION
    SELECT * FROM bicyclesandmotorbikes UNION
    SELECT * FROM bodyparts1 UNION
    SELECT * FROM bodyparts2 UNION
    SELECT * FROM cars UNION
    SELECT * FROM christmasintheuk UNION
    SELECT * FROM clothes1 UNION
    SELECT * FROM clothes2 UNION
    SELECT * FROM colours UNION
    SELECT * FROM containers UNION
    SELECT * FROM dailyroutine UNION
    SELECT * FROM drinks UNION
    SELECT * FROM everydayobje UNION
    SELECT * FROM farmanimals UNION
    SELECT * FROM foodinbrain2 UNION
    SELECT * FROM foodinbritain1 UNION
    SELECT * FROM football UNION
    SELECT * FROM fruit1 UNION
    SELECT * FROM fruit2 UNION
    SELECT * FROM gardens UNION
    SELECT * FROM health UNION
    SELECT * FROM holidays UNION
    SELECT * FROM homes UNION
    SELECT * FROM hotels UNION
    SELECT * FROM jobs1 UNION
    SELECT * FROM jobs2 UNION
    SELECT * FROM kitchens1 UNION
    SELECT * FROM kitchens2 UNION
    SELECT * FROM livingroms UNION
    SELECT * FROM mealsandcook UNION
    SELECT * FROM meatandfish UNION
    SELECT * FROM money UNION
    SELECT * FROM moving UNION
    SELECT * FROM nature1 UNION
    SELECT * FROM numeros UNION
    SELECT * FROM otheranimals UNION
    SELECT * FROM othersimportants UNION
    SELECT * FROM otras UNION
    SELECT * FROM placesinatown UNION
    SELECT * FROM preguntas UNION
    SELECT * FROM preposicionesyconjunciones UNION
    SELECT * FROM pronombresdemostrativos UNION
    SELECT * FROM pronombrespersonales UNION
    SELECT * FROM pronombresposesivos UNION
    SELECT * FROM relationship UNION
    SELECT * FROM restaurants1 UNION
    SELECT * FROM saludosycortesia UNION
    SELECT * FROM school UNION
    SELECT * FROM shopping UNION
    SELECT * FROM snacksanddesserts UNION
    SELECT * FROM streetsandroads UNION
    SELECT * FROM time UNION
    SELECT * FROM tools UNION
    SELECT * FROM transport1 UNION
    SELECT * FROM transport2 UNION
    SELECT * FROM vegetables1 UNION
    SELECT * FROM vegetables2 UNION
    SELECT * FROM verbs UNION
    SELECT * FROM weather UNION
    SELECT * FROM wildanimals";
    $resultado = mysqli_query($conexion, $query);

    // Cerrar la conexión a la base de datos
    mysqli_close($conexion);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/principal.css">
    <link rel="stylesheet" href="css/boostrap-css/bootstrap.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Roboto:wght@700&display=swap" rel="stylesheet">
    <script src="css/boostrap.js/bootstrap.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <title>easy</title>
<script>
        let lista=[];
        let dic={
            1:[],//ing
            2:[],//esp
            3:[],//link
            4:[],//frase
            5:[],//frase traducida
            6:[],//fonetica
            7:[],//audio
        }
        $(document).ready(function() {
        var datos = <?php echo json_encode(mysqli_fetch_all($resultado, MYSQLI_ASSOC)); ?>; // Convertir los resultados de MySQL a formato JSON
        //console.log(datos)
            
        for(let i=0; i<datos.length;i++){
            lista.push(datos[i].ing) //aqui en lista se guardan las palabras en ingles
            dic[1].push(datos[i].ing)
            dic[2].push(datos[i].esp)
            dic[3].push(datos[i].link)
            dic[4].push(datos[i].frase)
            dic[5].push(datos[i].traducida)
            dic[6].push(datos[i].fonetica)
            dic[7].push(datos[i].audio)
        }
        //console.log(dic)

        function shuffle(array) { 
            array.sort(() => Math.random() - 0.5);
        }
        shuffle(lista);//funcion para que en array se guarden las palabras de forma desorganizada "aleatoriedad"
        //console.log(lista)
        
        const palabraFonetica=document.getElementById("palabraFonetica")
        const facil=document.getElementById("facil")
        const dificil=document.getElementById("dificil")
        const palabra=document.getElementById("palabra")
        const frase=document.getElementById("frase")
        const traducir=document.getElementById("traducir")
        const fonetica=document.getElementById("fonetica")
        const sonar=document.getElementById("sonar")
        const contenidoPalabra=document.getElementById("contenidoPalabra")
        const contenidoBoton=document.getElementById("contenidoBoton")
        const audio=document.getElementById("audio")
        const imagen=document.getElementById("imagen")

        let m=0
        let p=dic[1].indexOf(lista[m]) //guarda la posicion de cada palabra inglesa

        if(dic[3][p]===undefined){
            imagen.src='https://lamenteesmaravillosa.com/wp-content/uploads/2021/11/rosa-blanca.jpg'
        }else{
            imagen.src=dic[3][p]
        }
        audio.src=dic[7][p]
        palabra.innerHTML=dic[1][p]
        frase.innerHTML=dic[4][p]
        sonar.addEventListener("click",function(){
            audio.play();
        });

        let a=0
        traducir.addEventListener("click",function(){
            if(a===0){
                palabra.innerHTML=dic[2][p]
                frase.innerHTML=dic[5][p]
                a=1
            }else{
                palabra.innerHTML=dic[1][p]
                frase.innerHTML=dic[4][p]
                a=0
            }
        });

        let b=0
        fonetica.addEventListener("click",function(){
            if(b===0){
                palabraFonetica.innerHTML=dic[6][p]
                b=1
            }else{
                palabraFonetica.innerHTML='&nbsp'
                b=0
            }
        });

        function d1(){
            m++
            if(m===datos.length){
                m=0
                p=dic[1].indexOf(lista[m])
                palabra.innerHTML='Ya terminaste'
                frase.innerHTML='Recarga la pagina para empezar de nuevo.'
                imagen.src='https://lamenteesmaravillosa.com/wp-content/uploads/2021/11/rosa-blanca.jpg'
            }else{
                palabraFonetica.innerHTML='&nbsp'
                p=dic[1].indexOf(lista[m])
                audio.src=dic[7][p]
                palabra.innerHTML=dic[1][p]
                frase.innerHTML=dic[4][p]
                audio.play();
                imagen.src=dic[3][p]
            }
            
        }

        facil.addEventListener("click",function(){
            contenidoPalabra.value = dic[1][p];
            contenidoBoton.value = facil.value;
            $.ajax({
            type: 'POST',
            url: '../index/insertar.php',
            data: $("#form1").serialize(),
            success: function(resultado) {
            },
            error: function(xhr, status, error) {
                alert('Error al guardar los datos');
            }
            });
            d1()

             // Evitar que se recargue la página
            return false;
        });
        dificil.addEventListener("click",function(){
            contenidoPalabra.value = dic[1][p];
            contenidoBoton.value = dificil.value;
            $.ajax({
            type: 'POST',
            url: '../index/insertar.php',
            data: $("#form1").serialize(),
            success: function(resultado) {
                $("#resultado").html(resultado);
            },
            error: function(xhr, status, error) {
                alert('Error al guardar los datos');
            }
            });
            d1()
        });
    }); 
</script>
</head>
<body>
    <!-- barra de navegacion -->
    <nav class="navbar navbar-expand-lg" style="background-color: white;">
        <div class="d-flex align-items-center justify-content-between w-100">
         <!--  <a class="navbar-brand" href="#"></a> -->
          <button class="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse m-2" id="navbarNavAltMarkup">
            <div class="navbar-nav centrar gap-4">
              <a class="nav-link" aria-current="page" href="../vocabulario/index.php">VOCABULARIO</a>
              <!-- <a class="nav-link" href="gramatica/index.php">GRAMATICA</a> -->
              <a class="nav-link" href="../traductor/index.php">TRADUCTOR</a>
              <a class="nav-link" href="../vocabtest/index.php">VOCABTEST</a>
              <a class="nav-link" href="../vocabtest/index.php" href="https://docs.google.com/forms/d/e/1FAIpQLSeC7wJfjvqxFBLfc-8nZVT7nEgczoTcH9DL3B_whKMaD8eILw/viewform">AYUDA A MEJORAR</a>
            </div>
          </div>
        <div class="d-flex align-items-center justify-content-end">
            <p  class="nUsuario m-0"><?php echo ucwords($_SESSION['nombre']) ?></p>
            <!-- <img class="usuario" src="/images-pagina/images.png" width="3%" height="3%" alt=""> -->
            <!-- aqui iria emotico para revisar perfil del usuario -->
            <div class="cerra">
            <a href="../index/salir.php"><button class="cerrasesion">Cerrar sesión</button></a>
            </div>
        </div>
        </div>
    </nav>

    <style>
    .ancho{
        padding-left: 5px;
    }
    .anchoSelect{
        width: 9rem;
    }
    .niv{
        padding-right: 5px;
    }
    @media (max-width: 440px){
        .ancho{
            width: 34%;
            padding-left: 2px;
        }
        .niv{
            padding-right: 2px;
        }
    }
</style>
   <div class="d-flex flex-row justify-content-between">
        <div class="pt-1 ancho">
            <form action="cat.php" method="POST">
                <select class="form-select anchoSelect" aria-label="Default select example"  name="cat" onchange="this.form.submit()">
                <option selected>Categorías</option>
                    <option value="todas">Todas</option>
                    <option value="accessories">Accessories</option>
                    <option value="action">Action</option>
                    <option value="bedrooms">Bedrooms</option>
                    <option value="bodyparts1">Body Parts 1</option>
                    <option value="clothes1">Clothes 1</option>
                    <option value="clothes2">Clothes 2</option>
                    <option value="colours">Colours</option>
                    <option value="dailyroutine">Daily routine</option>
                    <option value="drinks">Drinks</option>
                    <option value="everydayobje">Everyday Obje</option>
                    <option value="farmanimals">Farm animals</option>
                    <option value="foodinbritain1">Food in Britain 1</option>
                    <option value="foodinbrain2">Food in Brain 2</option>
                    <option value="fruit1">Fruit 1</option>
                    <option value="holidays">Holidays</option>
                    <option value="homes">Homes</option>
                    <option value="hotels">Hotels</option>
                    <option value="jobs1">Jobs 1</option>
                    <option value="jobs2">Jobs 2</option>
                    <option value="kitchens1">Kitchens 1</option>
                    <option value="livingroms">Living roms</option>
                    <option value="mealsandcook">Meals and cook</option>
                    <option value="relationship">Relationship</option>
                    <option value="money">Money</option>
                    <option value="moving">Moving</option>
                    <option value="nature1">Nature1</option>
                    <option value="placesinatown">Places in a town</option>
                    <option value="restaurants1">Restaurants 1</option>
                    <option value="school">School</option>
                    <option value="shopping">Shopping</option>
                    <option value="snacksanddesserts">Snacks and desserts</option>
                    <option value="transport1">Transport 1</option>
                    <option value="transport2">Transport 2</option>
                    <option value="weather">Weather</option>
                    
                    <option value="preposicionesyconjunciones">Preposiciones y conjunciones</option>
                    <option value="articulos">Articulos</option>
                    <option value="saludosycortesia">Saludos y cortesia</option>
                    <option value="preguntas">Preguntas</option>
                    <option value="adjetivos">Adjetivos</option>
                    <option value="adverbios">Adverbios</option>
                    <option value="numeros">Numeros</option>
                    <option value="verbs">Verbs</option>
                    <option value="otras">Otras</option>
                    <option value="pronombrespersonales">Pronombres Personales</option>
                    <option value="pronombresposesivos">Pronombres Posesivos</option>
                    <option value="pronombresdemostrativos">Pronombres Demostrativos</option>


                    <option value="airtravel">Air travel</option>
                    <option value="aroundtown">Around town</option>
                    <option value="othersimportants">Others importants</option>
                    <option value="bathrooms">Bathrooms</option>
                    <option value="appearance2">Appearance 2</option>
                    <option value="bicyclesandmotorbikes">Bicycles and motorbikes</option>
                    <option value="beaches">Beaches</option>
                    <option value="bodyparts2">Body parts 2</option>
                    <option value="cars">Cars</option>
                    <option value="christmasintheuk">Christmas in the UK</option>
                    <option value="containers">Containers</option>
                    <option value="football">Football</option>
                    <option value="fruit2">Fruit 2</option>
                    <option value="gardens">Gardens</option>
                    <option value="health">Health</option>
                    <option value="kitchens2">Kitchens 2</option>
                    <option value="meatandfish">Meat and fish</option>
                    <option value="otheranimals">Other animals</option>
                    <option value="streetsandroads">Streets and roads</option>
                    <option value="tools">Tools</option>
                    <option value="vegetables1">Vegetables 1</option>
                    <option value="vegetables2">Vegetables 2</option>
                    <option value="wildanimals">Wild animals</option>
                    <option value="time">Time</option>
                </select>
            </form>
            <p class="my-0 text-white"> Categoría: <?php echo $_SESSION['categoria']; ?></p>
        </div>

        <div class="pt-1 niv">
        <form action="niv.php" method="POST">
            <select class="form-select" aria-label="Default select example"  name="niv" onchange="this.form.submit()">
                <option selected>Nivel</option>
                <option value="todas">Todas</option>
                <option value="facil">Facil</option>
                <option value="dificil">Dificil</option>
            </select>
            </form>
            <p class="my-0 text-white"> Nivel: <?php echo $_SESSION['nivel']; ?></p>
        </div>
    </div>

    <div class="inicio">
        <!-- bloque de la imagen y otros -->
        <!-- traduccion palabra a fonetica el &nbsp es para que gener un espacio-->
        <h2 class="text-white mt-3 mb-0" id="palabraFonetica">&nbsp</h2>

        <!-- imagen mas los dos botones -->
        <div class="medio">
            <button name="boton" class="btn btn-success px-4 item" value="facil" id="facil">FACIL</button>
            <img class="item" id="imagen" src="" alt="imagen">
            <button name="boton" class="btn btn-danger item" value="dificil" id="dificil">DIFICIL</button>
        </div>
        <div class="contenidoFrases pt-0">
            <!-- palabra a aprender -->
            <h1 class="frases mt-1" id="palabra">better</h1>
            <!-- frase -->
            <h2 class="text-white mb-0" id="frase">Practice makes perfect, and with each attempt, you become better.</h2>
        </div>
        <!-- los tres botones -->
        <div class="padding-y">
            <button class="btn btn-success opciones" id="traducir">TRADUCTOR</button>
            <button class="btn btn-success opciones" id="fonetica">PRON.</button>
            <button class="btn btn-success opciones" id="sonar">SONIDO</button>
        </div>
    </div>

        <!-- bloque oculto -->
        <!-- este audio a igual que los input con hidden aparece oculto no hay necesidad de hacerle css -->
        <audio id="audio" src="" autoplay></audio>
    <form action="insertar.php" method="POST" id="form1">
        <input type="hidden" name="contenidoPalabra" id="contenidoPalabra"> <!-- //guarda el valor que esta en a1 -->
        <input type="hidden" name="contenidoBoton" id="contenidoBoton"> <!-- //guarda el valor de los botones -->
    </form>

</body>
</html>






