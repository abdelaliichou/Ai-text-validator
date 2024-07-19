import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

function NavBar() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // whenever the width of the screen changes, we change the variable wich make us able to change the drop down from top left absolute parent to our page-container flex under the input text  
    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigate = useNavigate();
    const nextPage = (page) => {
        navigate(`/${page}`)
    }
       
    return (
        <>
            { windowWidth > 900 ? (
                <>
                    <nav className="nav">

                        <p className="navText2">
                            HeReFanMi<p className="dot">.</p> 
                        </p>
                    

                        <ul className="navbar">
                            <li className="navText" onClick={() => nextPage("welcom")}>Home</li>
                            <li className="navText" onClick={() => nextPage("features")}>Role</li>
                            <li className="navText" onClick={() => nextPage("pricing")}>Team</li>
                            <li className="navText" onClick={() => nextPage("about")}>Features</li>
                            <li className="navText" onClick={() => nextPage("contact")}>NGI</li>
                            <li className="navText" onClick={() => nextPage("contact")}>FAQ</li>
                        </ul>

                        <div className="space"/>

                        <button className="signin-button" onClick={ ()=> nextPage("login")}>
                            Register
                        </button>

                        <button className="register-button" onClick={ ()=> nextPage("login")}>
                            Sign in
                        </button>

                    </nav>
                </>
            ) : (
                <>
                    <nav className="nav">

                        <p className="navText2">
                            HeReFanMi<p className="dot">.</p> 
                        </p>

                        <div className="space"/>

                        { windowWidth > 320 ? (
                            <button className="signin-button" onClick={ ()=> nextPage("login")}>
                                Register 
                            </button>
                        ) : (
                            <>
                            </>
                        )}

                        <button className="register-button" onClick={ ()=> nextPage("login")}>
                            Signin
                        </button>

                    </nav>

                    <ul className="navbar">

                        <li className="navText" onClick={() => nextPage("welcom")}>Home</li>
                        <li className="navText" onClick={() => nextPage("features")}>Role</li>
                        <li className="navText" onClick={() => nextPage("pricing")}>Team</li>
                        <li className="navText" onClick={() => nextPage("about")}>Features</li>
                        <li className="navText" onClick={() => nextPage("contact")}>NGI</li>
                        <li className="navText" onClick={() => nextPage("contact")}>FAQ</li>

                    </ul>
                </>
            )
            }
        </>
    )
}

export default NavBar;