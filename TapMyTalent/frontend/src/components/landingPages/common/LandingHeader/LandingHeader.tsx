import './LandingHeader.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tmtLogo from '../../../../assets/logos/Tap My Talent Logo.svg';

const LandingHeader = () => {
    const location = useLocation();
    const path = location.pathname;
    
    // Set active nav based on current path
    const getInitialActiveNav = () => {
        if (path === '/') return 'home';
        if (path === '/services') return 'services';
        if (path === '/pricing') return 'pricing';
        if (path === '/bootcamp') return 'bootcamp';
        if (path === '/contact') return 'contact';
        return 'home';
    };
    
    const [activeNav, setActiveNav] = useState(getInitialActiveNav());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (navItem: string) => {
        setActiveNav(navItem);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className='landing-header'>
            <div className='landing-header-container'>
                <Link to="/" onClick={() => handleNavClick('home')}>
                    <div className='landing-header-logo'>
                        <img src={tmtLogo} alt="Tap My Talent Logo" className="logo-image" />
                        <span className="logo-text">Tap My Talent</span>
                    </div>
                </Link>

                <div className={`landing-header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <nav>
                        <ul>
                            <li className={activeNav === 'home' ? 'active' : ''}>
                                <Link to="/" onClick={() => handleNavClick('home')}>Home</Link>
                                {activeNav === 'home' && <div className="active-indicator"></div>}
                            </li>
                            <li className={activeNav === 'services' ? 'active' : ''}>
                                <Link to="/services" onClick={() => handleNavClick('services')}>Services</Link>
                                {activeNav === 'services' && <div className="active-indicator"></div>}
                            </li>
                            <li className={activeNav === 'pricing' ? 'active' : ''}>
                                <Link to="/pricing" onClick={() => handleNavClick('pricing')}>Pricing</Link>
                                {activeNav === 'pricing' && <div className="active-indicator"></div>}
                            </li>
                            <li className={activeNav === 'bootcamp' ? 'active' : ''}>
                                <Link to="/bootcamp" onClick={() => handleNavClick('bootcamp')}>Bootcamp</Link>
                                {activeNav === 'bootcamp' && <div className="active-indicator"></div>}
                            </li>
                            <li className={activeNav === 'contact' ? 'active' : ''}>
                                <Link to="/contact" onClick={() => handleNavClick('contact')}>Contact Us</Link>
                                {activeNav === 'contact' && <div className="active-indicator"></div>}
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='landing-header-auth'>
                    <button className="signup-login-btn">Sign up/Login</button>
                </div>

                <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;