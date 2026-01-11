import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Inscription from "./Inscription.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";

import Menu from "./Menu.jsx";


function MyAPP() {
    return (
        <div style={{ 
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "gray",
            onHover: { backgroundColor: "lightgray" }

        }}>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/inscription" element={<Inscription />} />
                </Routes>
            </BrowserRouter>

        </div>
        
    );
}
    
export default MyAPP;