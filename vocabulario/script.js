// Elementos del DOM
const catElement = document.getElementById("cat");
const nivElement = document.getElementById("niv");
const nombreUsuarioElement = document.getElementById("nombreUsuario");

// Cargar datos previos de localStorage
if (localStorage.getItem("categoria")) {
    document.getElementById("ponerCategoria").innerHTML = localStorage.getItem("categoria");
}else{
    localStorage.setItem("categoria", 'Action')
    document.getElementById("ponerCategoria").innerHTML = 'Action';
}
if (localStorage.getItem("nivel")) {
    document.getElementById("ponerNivel").innerHTML = localStorage.getItem("nivel");
}

// Listeners para cambios en categoría y nivel
if (catElement) {
    catElement.addEventListener("change", () => {
        localStorage.setItem("categoria", catElement.value);
        window.location = "index.html";
    });
}
if (nivElement) {
    nivElement.addEventListener("change", () => {
        localStorage.setItem("nivel", nivElement.value);
        window.location = "index.html";
    });
}

// Firebase imports y configuración
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, collection, addDoc, query, where, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBtl7dzmkO104G7SHO4G-F7cyLiASTbuZE",
    authDomain: "fabio-c2127.firebaseapp.com",
    projectId: "fabio-c2127",
    storageBucket: "fabio-c2127.firebasestorage.app",
    messagingSenderId: "976265620989",
    appId: "1:976265620989:web:e7604348d0968fdb213d94",
    measurementId: "G-LWQLEMGBRV"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Variables globales
let dic = [];
let interfazInicializada = false;

// Función para mezclar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Cargar datos y filtrar según categoría y nivel
async function cargarDatos() {
    try {
        let lista = [];
        if (localStorage.getItem("categoria") === "todas") {
            const response = await fetch("../todas.json");
            lista = await response.json() || [];
            if (localStorage.getItem("nivel") === "facil" || localStorage.getItem("nivel") === "dificil") {
                await filtrarPorNivel(lista, localStorage.getItem("nivel"));
            } else {
                dic = lista;
            }
        } else {
            const response = await fetch("../datos.json");
            const data = await response.json();
            lista = data[localStorage.getItem("categoria")] || [];
            if (localStorage.getItem("nivel") === "facil" || localStorage.getItem("nivel") === "dificil") {
                await filtrarPorNivel(lista, localStorage.getItem("nivel"));
            } else {
                dic = lista;
            }
        }
        shuffleArray(dic);
        //console.log("Datos cargados:", dic);
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

// Filtrar palabras por nivel desde Firebase
async function filtrarPorNivel(lista, nivel) {
    try {
        const q = query(
            collection(db, "respuestas"),
            where("nivel", "==", nivel)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            document.getElementById("frase").innerHTML = "No se encontraron palabras.";
            dic = [];
        } else {
            const palabras = querySnapshot.docs.map(doc => doc.data().palabra);
            dic = lista.filter(element => palabras.includes(element.Ingles));
        }
    } catch (error) {
        console.error("Error al filtrar por nivel:", error);
    }
}

// Verifica autenticación y carga datos antes de inicializar
auth.onAuthStateChanged(async (user) => {
    if (user) {
        if (!interfazInicializada) {
            await cargarDatos(); // Espera a que los datos estén listos
            inicializarInterfaz(user.email);
            interfazInicializada = true;
        }
        nombreUsuarioElement.textContent = localStorage.getItem("nombre_fabio");
    } else {
        window.location.href = "../index.html";
    }
});

// Función principal de la interfaz
function inicializarInterfaz(userEmail) {
    // Elementos del DOM dentro de la interfaz
    const palabraFonetica = document.getElementById("palabraFonetica");
    const facil = document.getElementById("facil");
    const dificil = document.getElementById("dificil");
    const palabra = document.getElementById("palabra");
    const frase = document.getElementById("frase");
    const traducir = document.getElementById("traducir");
    const fonetica = document.getElementById("fonetica");
    const sonar = document.getElementById("sonar");
    const audio = document.getElementById("audio");
    const imagen = document.getElementById("imagen");

    let indicePalabra = 0; // Índice actual de la palabra
    let traducido = false; // Estado de traducción
    let foneticaVisible = false; // Estado de fonética

    // Actualiza la interfaz con la palabra actual
    function actualizarInterfaz() {
        if (!dic[indicePalabra]?.["Ingles"]) {
            palabra.textContent = "Ya terminaste ó apenas inicias!";
            frase.textContent = "Recarga la página para empezar de nuevo ó selecciona una categoria.";
            imagen.src = "https://lamenteesmaravillosa.com/wp-content/uploads/2021/11/rosa-blanca.jpg";
            facil.disabled = true;
            dificil.disabled = true;
            return;
        }
        imagen.src = dic[indicePalabra]["Link"] ?? "https://lamenteesmaravillosa.com/wp-content/uploads/2021/11/rosa-blanca.jpg";
        audio.src = dic[indicePalabra]["Audio"];
        palabra.textContent = dic[indicePalabra]["Ingles"];
        frase.textContent = dic[indicePalabra]["Frases"];
        palabraFonetica.innerHTML = " ";
        traducido = false;
        foneticaVisible = false;
        facil.disabled = false;
        dificil.disabled = false;
    }

    // Guardar respuesta en Firebase
    async function guardarRespuestaFirebase(valor) {
        const data = {
            email: userEmail,
            palabra: dic[indicePalabra]["Ingles"],
            categoria: localStorage.getItem("categoria"),
            nivel: valor,
        };

        const q = query(
            collection(db, "respuestas"),
            where("email", "==", userEmail),
            where("palabra", "==", dic[indicePalabra]["Ingles"]),
            where("categoria", "==", localStorage.getItem("categoria"))
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            await addDoc(collection(db, "respuestas"), data);
            //console.log("Respuesta guardada en Firebase");
        } else {
            const docId = querySnapshot.docs[0].id;
            await updateDoc(doc(db, "respuestas", docId), { nivel: valor });
            //console.log("Respuesta actualizada en Firebase");
        }

        // Avanzar a la siguiente palabra
        indicePalabra++;
        actualizarInterfaz();
    }

    // Configuración inicial
    actualizarInterfaz();

    // Listeners de eventos
    sonar.addEventListener("click", () => audio.play());

    traducir.addEventListener("click", () => {
        if (traducido) {
            palabra.textContent = dic[indicePalabra]["Ingles"];
            frase.textContent = dic[indicePalabra]["Frases"];
        } else {
            palabra.textContent = dic[indicePalabra]["Español"];
            frase.textContent = dic[indicePalabra]["Traducida"];
        }
        traducido = !traducido;
    });

    fonetica.addEventListener("click", () => {
        if (foneticaVisible) {
            palabraFonetica.innerHTML = " ";
        } else {
            palabraFonetica.innerHTML = dic[indicePalabra]["Fonetica"];
        }
        foneticaVisible = !foneticaVisible;
    });

    facil.addEventListener("click", () => {
        facil.disabled = true; // Desactiva el botón para evitar clics múltiples
        guardarRespuestaFirebase("facil");
    });

    dificil.addEventListener("click", () => {
        dificil.disabled = true; // Desactiva el botón para evitar clics múltiples
        guardarRespuestaFirebase("dificil");
    });
}