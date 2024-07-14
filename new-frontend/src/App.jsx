import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import JobForm from "./pages/JobForm";
import Jobs from "./pages/Jobs";
import UserForm from "./pages/UserForm";
import SideBar from "./components/SideBar";
import './App.css'
import './index.css'
import './output.css'
import Navbar from "./components/Navbar";

function App() {

  return (
    <div className={`flex`} data-theme='light'>
            <SideBar/>
            <main className="flex-1 overflow-auto">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/jobform" element={<JobForm />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/userform" element={<UserForm />} />
                </Routes>
            </main>
    </div>
  )
}

export default App
