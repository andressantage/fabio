async function traducir_ingles(inputText) {
    const sourceLang = "en"
    const targetLang = "es"
    const apiKey = "tmf3EM88QieFaD0BLlhyFDewF1TWGT6D";
    const apiUrl = "https://api.mistral.ai/v1/chat/completions";

    try {
        const prompt = `Traduce el siguiente texto de ${sourceLang === 'auto' ? 'su idioma original' : sourceLang} a ${targetLang}:\n\n"${inputText}"\n\nSolo devuelve el texto traducido, sin comentarios adicionales.`;
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "mistral-large-latest", // Usando el modelo más reciente
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.1 // Temperatura baja para traducciones precisas
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error en la solicitud: ${response.statusText} - ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        const translation = data.choices[0].message.content.trim();

    } catch (error) {
        console.error("Error al traducir:", error);
    }
}