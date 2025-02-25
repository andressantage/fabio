async function buscarImagenes(inputText) {  
    const unsplashAccessKey = "I_BCvjakvbq0s_RTOz2qVWNUXLKQiKazWFgPsfvfMjQ";
    
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(inputText)}&per_page=1`, {
            headers: {
                "Authorization": `Client-ID ${unsplashAccessKey}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error al buscar imágenes: ${response.statusText}`);
        }
        
        const data = await response.json();
        dic=data
        if (data.results.length === 0) {
            resultadoDiv.textContent = "No se encontraron imágenes para esta búsqueda.";
            return;
        }
        return dic.results[0].urls.small
    } catch (error) {
        console.error("Error:", error);
        resultadoDiv.textContent = "Hubo un error al buscar imágenes. Inténtalo de nuevo.";
    }
}