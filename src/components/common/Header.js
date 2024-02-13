import React, { useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import Icon from '../../images/icon.png'

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        if (!menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        setMenuOpen(!menuOpen);
    };
    
  return (
    <>
        <nav className="navbar">
            <div className="navbar-left">
                <img id="icon" src={Icon}></img>
                <Link onClick={() => {
                    if (menuOpen) {
                        setMenuOpen(!menuOpen);
                    }
                }} className="navbar-brand" id='outside-navbar-links' to={'/'}>Rate My Course</Link>
            </div>            
            <div className="navbar-middle">
                <Link className="navbar-brand" id='middle-navbar-links' to={'/request-course'}>Add Course</Link>
                <Link className="navbar-brand" id='middle-navbar-links' to={'/request-school'}>Add School</Link>
                <Link className="navbar-brand" id='middle-navbar-links' to={'/contact'}>Contact</Link>
                <Link className="navbar-brand" id='middle-navbar-links' to={'/guidelines'}>Guidelines</Link>
            </div>            
            <div className="navbar-right">
                <Link className="navbar-brand" id='outside-navbar-links' to={'/about'}>About</Link>
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </nav>
        {menuOpen && (
            <div onClick={toggleMenu} className="mobile-menu-overlay">
                <div className="mobile-menu">
                    <Link onClick={toggleMenu} className="mobile-link" to={'/request-course'}>Request Add Course</Link>
                    <Link onClick={toggleMenu} className="mobile-link" to={'/request-school'}>Request Add School</Link>
                    <Link onClick={toggleMenu} className="mobile-link"  to={'/guidelines'}>Guidelines</Link>
                    <Link onClick={toggleMenu} className="mobile-link"  to={'/contact'}>Contact</Link>
                    <Link onClick={toggleMenu} className="mobile-link" id='outside-navbar-links' to={'/about'}>About</Link>
                </div>
            </div>
        )}

    </>
    );
}

export default Header;