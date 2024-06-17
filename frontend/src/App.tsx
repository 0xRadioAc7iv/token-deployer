import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TokenList from "./components/TokenList";
import Token from "./components/Token";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/your-tokens" element={<TokenList />} />
          <Route path="/token/:process" element={<Token />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
