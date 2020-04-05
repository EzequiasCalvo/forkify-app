import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

// Creamos nuestro objeto state. Para almacenar nuestra data y sus cambios.
const state = {};
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query) {
    
        // 2) New search object and add to state
        state.search = new Search(query);
    
        // 3) Prepare UI for results
        searchView.clestInput();
        searchView.clearResults();

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault() //Prevenimos acciones nativas. En este caso no queremos que se recargue la pagina al darle submit.
    controlSearch();
});