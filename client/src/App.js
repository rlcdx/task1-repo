import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/TestPage";
import Songs from "./pages/Songs";
import Home from "./pages/HomePage";
import UpdateSong from "./pages/UpdateSong";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waw" element={<Test />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/update/:id" element={<UpdateSong />} />
      </Routes>
    </BrowserRouter>
  );
}
