import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}


export const limitRecipeTitle = (title, limit = 17) => { //valor por default de limit = 17
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
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
`;
elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>            
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    //  Usamos Math.ceil para rendondear hacia arriba en el caso de que la division de recetas en paginas de un decimal.
    const pages = Math.ceil(numResults/resPerPage);

    let button;
    if (page === 1) {
        // Botón para ir a la próxima página.
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Ambos botones 
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    } else if (page === pages && pages > 1) {
        // Solo página anterior
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

// Recorremos cada receta una por una
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Renderizamos los resultados de la página correspondiente.
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    // Renderizamos los botones para pasar o volver de página.
    renderButtons(page, recipes.length, resPerPage);
};