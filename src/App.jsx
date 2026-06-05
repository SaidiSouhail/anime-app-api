import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SearchPage from "./pages/Search/SearchPage";
import AnimeDetails from "./pages/AnimeDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchPage />} />
         <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </>
  );
}

export default App;