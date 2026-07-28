import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Styles/navbar.css';

function Navbar({ isLogin, setIsLogin }) {
    const [isOpen, setIsOpen]             = useState(false);
    const [scrolled, setScrolled]         = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location                         = useLocation();
    const navigate                         = useNavigate();
    const navRef                           = useRef(null);
    const storedUser = (() => {
        try {
            return JSON.parse(localStorage.getItem('user') || 'null');
        } catch {
            return null;
        }
    })();
    const isAdmin                          = Boolean(storedUser?.role === 'admin' || storedUser?.isAdmin === true);

    /* ── Scroll detection ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Close everything on route change ── */
    useEffect(() => {
        setIsOpen(false);
        setDropdownOpen(false);
    }, [location.pathname]);

    /* ── Close menu + dropdown when clicking outside navbar ── */
    useEffect(() => {
        const onClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsOpen(false);
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
        setDropdownOpen(false);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLogin(false);
        navigate('/home');
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`menu-bar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
            <div className="navbar-container">

                {/* Logo */}
                <h1 className="logo">Aminkeng<span>Ivan.</span></h1>

                {/* Nav links */}
                <ul className={`menu-list ${isOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
                    </li>
                    <li className={`dropdown ${dropdownOpen ? 'active' : ''}`}>
                        <button
                            className="dropdown-toggle"
                            onClick={toggleDropdown}
                            aria-expanded={dropdownOpen}
                            aria-haspopup="true">
                            More
                            <i className={`fas fa-caret-down caret${dropdownOpen ? ' rotated' : ''}`}></i>
                        </button>
                        <div className="dropdown-menu" role="menu">
                            <Link to="/portfolio" className={isActive('/portfolio') ? 'active' : ''}>Projects</Link>
                            <Link to="/book"      className={isActive('/book')      ? 'active' : ''}>Book Online</Link>
                            {isLogin && (
                                <Link to="/portfoliodashboard" className={isActive('/portfoliodashboard') ? 'active' : ''}>Dashboard</Link>
                            )}
                            {isAdmin && (
                                <Link to="/admindashboard" className={isActive('/admindashboard') ? 'active' : ''}>Admindashboard</Link>
                            )}
                        </div>
                    </li>
                    <li>
                        <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
                    </li>

                    {/* Login / Logout — mobile menu only */}
                    <li className="mobile-login-wrapper">
                        {isLogin ? (
                            <button className="login-btn logout-btn" onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link to="/login"><button className="login-btn">Login</button></Link>
                        )}
                    </li>
                </ul>

                {/* Login / Logout — desktop only */}
                <div className="auth-buttons">
                    {isLogin ? (
                        <button className="login-btn logout-btn" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login"><button className="login-btn">Login</button></Link>
                    )}
                </div>

                {/* Hamburger */}
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}>
                    <span className={`hamburger ${isOpen ? 'active' : ''}`}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </span>
                    <span className="menu-text">Menu</span>
                </button>

            </div>
        </nav>
    );
}

export default Navbar;