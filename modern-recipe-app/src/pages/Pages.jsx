import Home from "./Home";
import Cuisine from "./Cuisine";
import Recipe from "./Recipe";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Pages = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} Location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:category" element={<Cuisine />} />
        <Route path="/recipe/:name" element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
