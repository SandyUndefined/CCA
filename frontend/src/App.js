import React from 'react'
import Home from './pages/Home'
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ControlPannel from "./pages/ControlPannel";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from "./components/Header";


function App() {
  return (
    <div>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/controlPannel" element={<ControlPannel />} />
        <Route path="/dashboard" element={<Dashboard   />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App