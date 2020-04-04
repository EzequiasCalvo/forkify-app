import Search from './models/Search';

// Creamos nuestro objeto state. Para almacenar nuestra data y sus cambios.
const state = {};
const controlSearch = async () => {
    // 1) Get query from view
    const query = 'pizza';

    if (query) {
    
        // 2) New search object and add to state
        state.search = new Search(query);
    
        // 3) Prepare UI for results
        
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault() //Prevenimos acciones nativas. En este caso no queremos que se recargue la pagina al darle submit.
    controlSearch();
});