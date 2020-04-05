import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};


const limitRecipeTitle = (title, limit = 17) => { //valor por default de limit = 17
    const newTitle = []; 
    if (title.length > limit) {
        // Convertimos un array de palabras(split) y reducimos las palabras una vez que superan los 17 caracteres.
        title.split(' ').reduce ((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // Usamos join para armar la frase original con la excepcion de que si supera los 17 caracteres reemplaza los demas con 3 puntos.
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

// No la exportamos porque queremos usarla en el forEach(localmente);
const renderRecipe = recipe => {
    // El markup se podria mejorar usando algun template engine(pug o ejs);
    const markup = `
    <li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
`;
elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

// Recorremos cada receta una por una
export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};