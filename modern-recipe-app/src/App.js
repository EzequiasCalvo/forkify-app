import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Category from "./components/Category";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Pages />
        <Category />
      </BrowserRouter>
    </div>
  );
};

export default App;
