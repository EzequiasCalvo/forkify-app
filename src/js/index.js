import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader()
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault() //Prevenimos acciones nativas. En este caso no queremos que se recargue la pagina al darle submit.
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);        
        console.log(goToPage);
    }
});

// Recipe controller
const r = new Recipe(46956);
r.getRecipe();
console.log(r);