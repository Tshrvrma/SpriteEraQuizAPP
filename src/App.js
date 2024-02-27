import React from "react";
import './App.css'
// Corrected import statement
import { Routes, Route } from "react-router-dom";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
function App ()
{
    return(
      <div>
        <Routes>
          <Route path="/" element={<Page1/>}/>
          <Route path="/Page2" element={<Page2/>}/>
          <Route path="/Page3" element={<Page3/>}/>
        </Routes>

      </div>
    );
}
export default App;