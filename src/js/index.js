import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

// Creamos nuestro objeto state. Para almacenar nuestra data y sus cambios.
const state = {};

// Search controller
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();


    if (query) {
    
        // 2) New search object and add to state
        state.search = new Search(query);
        console.log(state)
    
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();
    
            // 5) Render results on UI
            clearLoader()
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault() //Prevenimos acciones nativas. En este caso no queremos que se recargue la pagina al darle submit.
    controlSearch();
});

// Testing
window.addEventListener('load', e => {
    e.preventDefault() //Prevenimos acciones nativas. En este caso no queremos que se recargue la pagina al darle submit.
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);        
    }
});

// Recipe controller
const controlRecipe = async () => {
    // Obtenemos el id desde la URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Preparamos UI para los cambios
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);
        
        // Creamos un nuevo objeto Recipe
        state.recipe = new Recipe(id);
       
        try {
            // Obtenemos la data del new Recipe y pareseamos los ingredientes.
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
           
            // Calculamos las porciones y el tiempo
            state.recipe.calcTime();
            state.recipe.calcServings();
            
            // Renderizamos la receta
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('Error processing recipe!');
        }
    }
};

// Creamos un array de eventos e iteramos cada uno llamando a la funcion controlRecipe. (Para no repetir codigo. Un solo eventlistener para multiples eventos).
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
});