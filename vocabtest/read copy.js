// Firebase imports y configuración
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { doc, getFirestore, collection, addDoc, query, where, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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

// Elementos del DOM
const catElement = document.getElementById("cat");
const pracElement = document.getElementById("prac");
const nombreUsuarioElement = document.getElementById("nombreUsuario");
const next = document.getElementById("next");
const sonar = document.getElementById("sonar");
const palabra = document.getElementById("palabra");
const audio = document.getElementById("audio");
const imagenes = document.querySelectorAll('.itemImagen');

// Variables globales
let dic = []; // Lista de palabras con sus datos
let listaPalabras = []; // Lista solo de palabras en inglés
let interfazInicializada = false;
let indicePalabra = 0; // Índice de la palabra actual
let intentosFallidos = 0; // Contador de intentos fallidos

// Cargar datos previos de localStorage
if (localStorage.getItem("categoria")) {
    document.getElementById("ponerCategoria").innerHTML = localStorage.getItem("categoria");
}
if (localStorage.getItem("practica")) {
    document.getElementById("ponerPractica").innerHTML = localStorage.getItem("practica");
}

// Listeners para cambios en categoría y práctica
if (catElement) {
    catElement.addEventListener("change", () => {
        localStorage.setItem("categoria", catElement.value);
        window.location = "index.html";
    });
}
if (pracElement) {
    pracElement.addEventListener("change", () => {
        localStorage.setItem("practica", pracElement.value);
        if (pracElement.value === "listening") window.location = "index.html";
        else if (pracElement.value === "reading") window.location = "read.html";
        else if (pracElement.value === "wr. imagen") window.location = "wimg.html";
        else if (pracElement.value === "wr. audio") window.location = "waudio.html";
    });
}

// Función para mezclar un array (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Cargar datos desde JSON
async function cargarDatos() {
    try {
        let response;
        if (localStorage.getItem("categoria") === "todas") {
            response = await fetch("../todas.json");
        } else {
            response = await fetch("../datos.json");
        }
        const data = await response.json();
        dic = localStorage.getItem("categoria") === "todas" ? data : data[localStorage.getItem("categoria")] || [];
        listaPalabras = dic.map(item => item["Ingles"]); // Extraer solo las palabras en inglés
        shuffleArray(dic);
        console.log("Datos cargados:", dic);
    } catch (error) {
        console.error("Error cargando datos:", error);
        dic = [];
    }
}

// Guardar respuesta en Firestore
async function guardarRespuestaFirebase(palabraIngles, nivel, userEmail) {
    const data = {
        email: userEmail,
        palabra: palabraIngles,
        categoria: localStorage.getItem("categoria"),
        nivel: nivel,
    };

    try {
        const q = query(
            collection(db, "respuestas"),
            where("email", "==", userEmail),
            where("palabra", "==", palabraIngles),
            where("categoria", "==", localStorage.getItem("categoria"))
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            await addDoc(collection(db, "respuestas"), data);
            console.log("Respuesta guardada en Firestore");
        } else {
            const docId = querySnapshot.docs[0].id;
            await updateDoc(doc(db, "respuestas", docId), { nivel: nivel });
            console.log("Respuesta actualizada en Firestore");
        }
    } catch (error) {
        console.error("Error al guardar en Firestore:", error);
    }
}

// Actualizar la interfaz con la palabra actual y sus imágenes
function actualizarInterfaz(userEmail) {
    if (indicePalabra >= dic.length) {
        palabra.innerHTML = "Ya terminaste. Recarga la página para empezar de nuevo";
        imagenes.forEach(img => img.src = "https://lamenteesmaravillosa.com/wp-content/uploads/2021/11/rosa-blanca.jpg");
        audio.src = "";
        next.disabled = true;
        return;
    }

    const palabraActual = dic[indicePalabra];
    audio.src = palabraActual["Audio"] || "";
    palabra.innerHTML = " "; // Espacio en blanco inicial

    // Preparar lista de imágenes
    let imagenesLista = [palabraActual["Link"] || "https://lamenteesmaravillosa.com/wp-content/uploads/2021/11/rosa-blanca.jpg"];
    let palabrasOtras = [...listaPalabras];
    shuffleArray(palabrasOtras);
    palabrasOtras = palabrasOtras.filter(p => p !== palabraActual["Ingles"]).slice(0, 5); // 5 palabras diferentes
    palabrasOtras.forEach(palabra => {
        const item = dic.find(d => d["Ingles"] === palabra);
        imagenesLista.push(item["Link"] || "https://lamenteesmaravillosa.com/wp-content/uploads/2021/11/rosa-blanca.jpg");
    });

    shuffleArray(imagenesLista);
    imagenes.forEach((img, index) => img.src = imagenesLista[index]);

    // Limpiar eventos anteriores y añadir nuevos
    imagenes.forEach(boton => {
        boton.removeEventListener("click", boton.clickHandler); // Limpiar eventos previos
        boton.clickHandler = (event) => {
            const srcClicado = event.target.src;
            if (srcClicado === palabraActual["Link"]) {
                palabra.innerHTML = `Muy bien! es: ${palabraActual["Ingles"]}: ${palabraActual["Español"]}`;
                if (intentosFallidos === 0) {
                    guardarRespuestaFirebase(palabraActual["Ingles"], "facil", userEmail);
                }
                intentosFallidos = 0;
            } else {
                intentosFallidos++;
                palabra.innerHTML = intentosFallidos === 1 ? "La embarraste!" : "La embarraste de nuevo!";
                if (intentosFallidos === 1) {
                    guardarRespuestaFirebase(palabraActual["Ingles"], "dificil", userEmail);
                }
            }
        };
        boton.addEventListener("click", boton.clickHandler);
    });
}

// Avanzar a la siguiente palabra
function siguientePalabra(userEmail) {
    intentosFallidos = 0;
    indicePalabra++;
    actualizarInterfaz(userEmail);
}

// Configurar la interfaz
function inicializarInterfaz(userEmail) {
    actualizarInterfaz(userEmail);
    sonar.addEventListener("click", () => audio.play());
    next.addEventListener("click", () => siguientePalabra(userEmail));
}

// Verifica autenticación y carga datos
auth.onAuthStateChanged(async (user) => {
    if (user) {
        if (!interfazInicializada) {
            await cargarDatos();
            inicializarInterfaz(user.email);
            interfazInicializada = true;
        }
        nombreUsuarioElement.textContent = localStorage.getItem("nombre_fabio");
    } else {
        window.location.href = "../index.html";
    }
});