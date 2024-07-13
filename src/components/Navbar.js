import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

function NavBar() {

    const navigate = useNavigate();
    const nextPage = (page) => {
        navigate(`/${page}`)
    }
       
    return (
        <nav className="nav">

            <p className="navText2">
                HeReFanMi<p className="dot">.</p> 
            </p>
        

            <ul className="navbar">
                <li className="navText" onClick={() => nextPage("welcom")}>Home</li>
                <li className="navText" onClick={() => nextPage("features")}>Features</li>
                <li className="navText" onClick={() => nextPage("pricing")}>Pricing</li>
                <li className="navText" onClick={() => nextPage("about")}>About</li>
                <li className="navText" onClick={() => nextPage("contact")}>Contact</li>
            </ul>

            <div className="space"/>

            <button className="signin-button" onClick={ ()=> nextPage("login")}>
                Sign in 
            </button>

            <button className="register-button" onClick={ ()=> nextPage("login")}>
                Register
            </button>

        </nav>
    )
}

export default NavBar;