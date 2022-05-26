import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import AuthContextProvider from "./context/authContext";
function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
