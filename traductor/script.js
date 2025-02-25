
document.addEventListener('DOMContentLoaded', () => {
    const palabraBuscar=document.getElementById("palabraBuscar")
    const Buscar=document.getElementById("Buscar")
    const palabraBuscarEsp=document.getElementById("palabraBuscarEsp")
    const BuscarEsp=document.getElementById("BuscarEsp")
    const busqueda=document.getElementById("busqueda")
    let dic = [];
    fetch("../todas.json")
        .then(response => response.json())
        .then(data => {
            dic=data
        })
    .catch(error => console.error("Error cargando el JSON:", error));

    function d1(word){
        palabra.innerHTML=word["Español"]
        frase.innerHTML=word["Traducida"]
        audio.src=word["Audio"]
        audio.play();
        imagen.src=word["Link"]
    }

    Buscar.addEventListener("click",f1)
    palabraBuscar.addEventListener('keydown', function(event){
        if (event.key === 'Enter') {
            event.preventDefault(); 
            f1();
        }
    })
    async function f1(){
        const palabraBuscar=document.getElementById("palabraBuscar").value.trim().toLowerCase()
        let resultado = dic.find(element => element["Ingles"] === palabraBuscar);    
        if(resultado){
            busqueda.innerHTML=`
            <div class="inicio">
                <!-- bloque de la imagen y otros -->
                <!-- traduccion palabra a fonetica el &nbsp es para que gener un espacio-->
                <h2 class="text-white mt-3 mb-0" id="palabraFonetica">&nbsp</h2>

                <!-- imagen mas los dos botones -->
                <div class="medio">
                    <span>&nbsp</span>
                    <img class="item" id="imagen" src="" alt="imagen">
                    <span>&nbsp</span>
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

            <audio id="audio" src="" autoplay></audio> 
            `

            const palabraFonetica=document.getElementById("palabraFonetica")
            const palabra=document.getElementById("palabra")
            const frase=document.getElementById("frase")
            const imagen=document.getElementById("imagen")   
            const traducir=document.getElementById("traducir")
            const fonetica=document.getElementById("fonetica")
            const sonar=document.getElementById("sonar")

            let a=0
            traducir.addEventListener("click",function(){
                if(a===0){
                    palabra.innerHTML=resultado["Ingles"]
                    frase.innerHTML=resultado["Frases"]
                    a=1
                }else{
                    palabra.innerHTML=resultado["Español"]
                    frase.innerHTML=resultado["Traducida"]
                    a=0
                }
            });
            let b=0
            fonetica.addEventListener("click",function(){
                if(b===0){
                    palabraFonetica.innerHTML=resultado["Fonetica"]
                    b=1
                }else{
                    palabraFonetica.innerHTML='&nbsp'
                    b=0
                }
            });
            d1(resultado)
            const audio=document.getElementById("audio")             
            sonar.addEventListener("click",function(){
                audio.play();
            });
        }else{
            const f1_palabra_esp=await traducir_español(palabraBuscar)
            const f1_frase=''
            const f1_imagen=await buscarImagenes(palabraBuscar)
            const f1_traducir=''
            const f1_fonetica=''
            const f1_sonar=await `https://gamedata.britishcouncil.org/sites/default/files/attachment/${palabraBuscar}.mp3`
            busqueda.innerHTML=`
            <div class="inicio">
                <h2 class="text-white mt-3 mb-0" id="palabraFonetica">${f1_fonetica}</h2>

                <!-- imagen mas los dos botones -->
                <div class="medio">
                    <span>&nbsp</span>
                    <img class="item" id="imagen" src="${f1_imagen}" alt="imagen">
                    <span>&nbsp</span>
                </div>
                <div class="contenidoFrases pt-0">
                    <!-- palabra a aprender -->
                    <h1 class="frases mt-1" id="palabra">${f1_palabra_esp}</h1>
                    <!-- frase -->
                    <h2 class="text-white mb-0" id="frase">${f1_frase}</h2>
                </div>
                <!-- los tres botones -->
                <div class="padding-y">
                    <button class="btn btn-success opciones" id="traducir">TRADUCTOR</button>
                    <button class="btn btn-success opciones" id="fonetica">PRON.</button>
                    <button class="btn btn-success opciones" id="sonar">SONIDO</button>
                </div>
            </div>     

            <audio id="audio" src="${f1_sonar}" autoplay></audio> 
            `

            const palabraFonetica=document.getElementById("palabraFonetica")
            const palabra=document.getElementById("palabra")
            const frase=document.getElementById("frase")
            const imagen=document.getElementById("imagen")   
            const traducir=document.getElementById("traducir")
            const fonetica=document.getElementById("fonetica")
            const sonar=document.getElementById("sonar")
            const audio=document.getElementById("audio")    
            let a=0
            traducir.addEventListener("click",function(){
                if(a===0){
                    palabra.innerHTML=f1_palabra_esp
                    frase.innerHTML=f1_frase
                    a=1
                }else{
                    palabra.innerHTML=palabraBuscar
                    frase.innerHTML=f1_traducir
                    a=0
                }
            });
            let b=0
            fonetica.addEventListener("click",function(){
                if(b===0){
                    palabraFonetica.innerHTML=f1_fonetica
                    b=1
                }else{
                    palabraFonetica.innerHTML='&nbsp'
                    b=0
                }
            });
            sonar.addEventListener("click",function(){
                audio.play();
            });
        }
    };

    function d2(word){
        palabra.innerHTML=word["Ingles"]
        frase.innerHTML=word["Traducida"]
        audio.src=word["Audio"]
        audio.play();
        imagen.src=word["Link"]
    }
    
    BuscarEsp.addEventListener("click",f2)
    palabraBuscarEsp.addEventListener('keydown', function(event){
        if (event.key === 'Enter') {
            event.preventDefault(); 
            f2();
        }
    })
    async function f2(){
        const palabraBuscarEsp=document.getElementById("palabraBuscarEsp").value.trim().toLowerCase()
        let resultado = dic.find(element => element["Español"] === palabraBuscarEsp);    
        if(resultado){
            busqueda.innerHTML=`
            <div class="inicio">
                <!-- bloque de la imagen y otros -->
                <!-- traduccion palabra a fonetica el &nbsp es para que gener un espacio-->
                <h2 class="text-white mt-3 mb-0" id="palabraFonetica">&nbsp</h2>

                <!-- imagen mas los dos botones -->
                <div class="medio">
                    <span>&nbsp</span>
                    <img class="item" id="imagen" src="" alt="imagen">
                    <span>&nbsp</span>
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

            <audio id="audio" src="" autoplay></audio> 
            `
            const palabraFonetica=document.getElementById("palabraFonetica")
            const palabra=document.getElementById("palabra")
            const frase=document.getElementById("frase")
            const imagen=document.getElementById("imagen")   
            const traducir=document.getElementById("traducir")
            const fonetica=document.getElementById("fonetica")
            const sonar=document.getElementById("sonar")

            let a=0
            traducir.addEventListener("click",function(){
                if(a===0){
                    palabra.innerHTML=resultado["Ingles"]
                    frase.innerHTML=resultado["Frases"]
                    a=1
                }else{
                    palabra.innerHTML=resultado["Español"]
                    frase.innerHTML=resultado["Traducida"]
                    a=0
                }
            });

            let b=0
            fonetica.addEventListener("click",function(){
                if(b===0){
                    palabraFonetica.innerHTML=resultado["Fonetica"]
                    b=1
                }else{
                    palabraFonetica.innerHTML='&nbsp'
                    b=0
                }
            });
            d2(resultado)
            const audio=document.getElementById("audio")             
            sonar.addEventListener("click",function(){
                audio.play();
            });
        }else{
            const f2_palabra_ing=await traducir_español(palabraBuscarEsp)
            const f2_frase=''
            const f2_imagen=await buscarImagenes(f2_palabra_ing)
            const f2_traducir=''
            const f2_fonetica=''
            const f2_sonar=await `https://gamedata.britishcouncil.org/sites/default/files/attachment/${f2_palabra_ing}.mp3`
            busqueda.innerHTML=`
            <div class="inicio">
                <h2 class="text-white mt-3 mb-0" id="palabraFonetica">${f2_fonetica}</h2>

                <!-- imagen mas los dos botones -->
                <div class="medio">
                    <span>&nbsp</span>
                    <img class="item" id="imagen" src="${f2_imagen}" alt="imagen">
                    <span>&nbsp</span>
                </div>
                <div class="contenidoFrases pt-0">
                    <!-- palabra a aprender -->
                    <h1 class="frases mt-1" id="palabra">${f2_palabra_ing}</h1>
                    <!-- frase -->
                    <h2 class="text-white mb-0" id="frase">${f2_frase}</h2>
                </div>
                <!-- los tres botones -->
                <div class="padding-y">
                    <button class="btn btn-success opciones" id="traducir">TRADUCTOR</button>
                    <button class="btn btn-success opciones" id="fonetica">PRON.</button>
                    <button class="btn btn-success opciones" id="sonar">SONIDO</button>
                </div>
            </div>     

            <audio id="audio" src="" autoplay></audio> 
            `

            const palabraFonetica=document.getElementById("palabraFonetica")
            const palabra=document.getElementById("palabra")
            const frase=document.getElementById("frase")
            const imagen=document.getElementById("imagen")   
            const traducir=document.getElementById("traducir")
            const fonetica=document.getElementById("fonetica")
            const sonar=document.getElementById("sonar")
            const audio=document.getElementById("audio")    
            let a=0
            traducir.addEventListener("click",function(){
                if(a===0){
                    palabra.innerHTML=f2_palabra_ing
                    frase.innerHTML=f2_frase
                    a=1
                }else{
                    palabra.innerHTML=palabraBuscar
                    frase.innerHTML=f2_traducir
                    a=0
                }
            });
            let b=0
            fonetica.addEventListener("click",function(){
                if(b===0){
                    palabraFonetica.innerHTML=f2_fonetica
                    b=1
                }else{
                    palabraFonetica.innerHTML='&nbsp'
                    b=0
                }
            });
            sonar.addEventListener("click",function(){
                audio.play();
            });
            //busqueda.innerHTML=`
            //    <h1 style="text-align: center;" class="text-white mt-4">La palabra no se encuentra!</h1>
            //`
        }
    }
})
