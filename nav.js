let nav=document.getElementById("nav")
nav.innerHTML=`
<nav class="navbar navbar-expand-lg" style="background-color: white;">
    <div class="d-flex align-items-center justify-content-between w-100">
    <!--  <li><a class="navbar-brand" href="#"></a></li> -->
    <button class="botonNavbar navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="botonNav navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse m-2" id="navbarNavAltMarkup">
        <div class="navbar-nav centrar gap-4">
            <li><a class="nav-link" aria-current="page" href="../vocabulario/index.html">VOCABULARIO</a></li>
            <li><a class="nav-link" href="../gramatica/index.html">GRAMATICA</a></li>
            <li><a class="nav-link" href="../traductor/index.html">TRADUCTOR</a></li>
            <li><a class="nav-link" href="../vocabtest/index.html">VOCABTEST</a></li>
            <li><a class="nav-link" href="../chat/index.html">CHAT</a></li>
            <li><a class="nav-link" href="../ayudar/index.html">AYUDA A MEJORAR</a></li>
        </div>
    </div>
    <div class="d-flex align-items-center justify-content-end">
        <p style="color: black;" class="nUsuario m-0" id="nombreUsuario"></p>
        <div class="cerra">
            <a href="../salir.html"><button class="cerrasesion">Cerrar sesión</button></a>
        </div>
    </div>
    </div>
</nav>
`
