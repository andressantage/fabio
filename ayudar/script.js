// Firebase imports y configuración
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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
const nombreUsuarioElement = document.getElementById("nombreUsuarioComentario");
const comentarioInput = document.getElementById("comentario");
const enviarBtn = document.getElementById("enviar");
const mensajeElement = document.getElementById("mensaje");

// Verifica autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        nombreUsuarioElement.textContent = `Usuario: ${localStorage.getItem("nombre_fabio") || user.email}`;
        document.getElementById("nombreUsuario").textContent=localStorage.getItem("nombre_fabio") || ''
        enviarBtn.addEventListener("click", () => guardarComentario(user.email));
    } else {
        window.location.href = "../index.html"; // Redirige al login si no está autenticado
    }
});

// Guardar comentario en Firestore
async function guardarComentario(userEmail) {
    const comentario = comentarioInput.value.trim();
    if (comentario === "") {
        mensajeElement.textContent = "Por favor, escribe un comentario antes de enviar.";
        mensajeElement.style.color = "red";
        return;
    }

    const data = {
        email: userEmail,
        comentario: comentario,
        fecha: new Date().toISOString() // Fecha y hora en formato ISO
    };

    try {
        await addDoc(collection(db, "comentarios"), data);
        mensajeElement.textContent = "¡Comentario enviado con éxito!";
        mensajeElement.style.color = "white";
        comentarioInput.value = ""; // Limpiar el campo
    } catch (error) {
        console.error("Error al guardar comentario:", error);
        mensajeElement.textContent = "Error al enviar el comentario. Intenta de nuevo.";
        mensajeElement.style.color = "red";
    }
}