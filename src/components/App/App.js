import React from "react";
import { useState, useEffect } from 'react';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from '../Login/Login';
import Register from '../Register/Register';
import SignOut from '../SignOut/SignOut';
import Header from '../Header/Header';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    function onLogin() {

    }

    function onRegister() {

    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/signup" element={<Register onRegister={onRegister} isLoading={isLoading} />} />
                    <Route path="/signin" element={<Login onLogin={onLogin} isLoading={setIsLoading} />} />
                    <Route path="/signout" element={<SignOut onLoggedIn={setIsLoggedIn} />} />
                    <Route path="*" element={<Navigate to="/" />} />


                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );


}

export default App;