import { dictionary } from './dictionary.js';

const translateWord = (word, language) => {
    word = word.toLowerCase(); // Asegúrate de que no haya problemas con mayúsculas.
    
    for (const category in dictionary.categories) {
      const items = dictionary.categories[category];
      
      // Buscar en la categoría actual
      for (const item of items) {
        if (language === "en" && item.english.toLowerCase() === word) {
          return { translation: item.spanish, example: item.example };
        }
        if (language === "es" && item.spanish.toLowerCase() === word) {
          return { translation: item.english, example: item.example };
        }
      }
    }
    
    return { translation: "No encontrada", example: "No disponible" };
  };

  const listWordsByCategory = (category) => {
    const items = dictionary.categories[category];
    if (items) {
      return items.map(item => `${item.english} (${item.spanish})`).join(", ");
    }
    return "No hay palabras en esta categoría.";
  };

  document.addEventListener("DOMContentLoaded", () => {
    const wordInput = document.getElementById("word");
    const translateBtn = document.getElementById("translate-btn");
    const responseDiv = document.getElementById("response");
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const newWordBtn = document.getElementById("new-word-btn");
  
    // Evento para traducir palabras
    translateBtn.addEventListener("click", () => {
      const word = wordInput.value.trim();
      const language = document.querySelector('input[name="language"]:checked').value;
      const result = translateWord(word, language);
      
      responseDiv.innerHTML = `
        <p>Traducción: <strong>${result.translation}</strong></p>
        <p>Ejemplo: <em>${result.example}</em></p>
      `;
    });
  
    // Evento para listar palabras de una categoría
    categoryRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const category = radio.value;
        const words = listWordsByCategory(category);
        responseDiv.innerHTML = `<p>${words}</p>`;
      });
    });
  
    // Evento para limpiar el campo de entrada y el resultado
    newWordBtn.addEventListener("click", () => {
      wordInput.value = "";
      responseDiv.textContent = "Respuesta aquí";
    });
  });
  