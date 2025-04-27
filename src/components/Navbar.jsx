import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  return (
    <nav className={`${styles.nav} ${scrollNav ? styles.navActive : ''}`}>
      <Link to='home' smooth={true} duration={500} onClick={closeMobileMenu}>
        <img src="/assets/logo.png" alt="Logo" className={styles.logo} />
      </Link>
      <div 
        className={`${styles.menuIcon} ${!scrollNav ? styles.menuIconWhite : ''}`} 
        onClick={handleClick}
      >
        {click ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`${styles.navMenu} ${click ? styles.navMenuActive : ''}`}>
        <li className={styles.navItem}>
          <Link 
            to='home' 
            className={`${styles.navLink} ${!scrollNav && !click ? styles.navLinkWhite : ''}`}
            activeClass={styles.navLinkActive}
            smooth={true} 
            duration={500} 
            spy={true} 
            onClick={closeMobileMenu}
          >
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to='chi-sono' 
            className={`${styles.navLink} ${!scrollNav && !click ? styles.navLinkWhite : ''}`}
            activeClass={styles.navLinkActive}
            smooth={true} 
            duration={500} 
            spy={true} 
            onClick={closeMobileMenu}
          >
            Chi Sono
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to='guide' 
            className={`${styles.navLink} ${!scrollNav && !click ? styles.navLinkWhite : ''}`}
            activeClass={styles.navLinkActive}
            smooth={true} 
            duration={500} 
            spy={true} 
            onClick={closeMobileMenu}
          >
            Guide
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to='video' 
            className={`${styles.navLink} ${!scrollNav && !click ? styles.navLinkWhite : ''}`}
            activeClass={styles.navLinkActive}
            smooth={true} 
            duration={500} 
            spy={true} 
            onClick={closeMobileMenu}
          >
            Video
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to='consigli' 
            className={`${styles.navLink} ${!scrollNav && !click ? styles.navLinkWhite : ''}`}
            activeClass={styles.navLinkActive}
            smooth={true} 
            duration={500} 
            spy={true} 
            onClick={closeMobileMenu}
          >
            Consigli
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link 
            to='contatti' 
            className={`${styles.navLink} ${!scrollNav && !click ? styles.navLinkWhite : ''}`}
            activeClass={styles.navLinkActive}
            smooth={true} 
            duration={500} 
            spy={true} 
            onClick={closeMobileMenu}
          >
            Contatti
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 