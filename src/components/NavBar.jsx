import { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-scroll';
import logo from "../assets/img/logo-s.png";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Фон при скролле
      setScrolled(currentScrollY > 50);

      // 2. Логика скрытия навбара
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // СКРЫВАЕМ навбар при скролле вниз, ТОЛЬКО если меню ЗАКРЫТО
        if (!expanded) {
          setVisible(false);
        }
      } else {
        // ПОКАЗЫВАЕМ при скролле вверх
        setVisible(true);
      }

      // 3. АВТО-ЗАКРЫТИЕ шторки при скролле вниз
      if (currentScrollY > lastScrollY && expanded) {
        setExpanded(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, expanded]); // Добавили expanded в зависимости

  return (
    <Navbar 
      expand="lg" 
      fixed="top"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
      // Если меню открыто (expanded), класс navbar--hidden НЕ должен добавляться
      className={`${scrolled ? "scrolled" : ""} ${(!visible && !expanded) ? "navbar--hidden" : ""}`}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" style={{ width: '42px' }} />
          <span className="brand-text ms-2">
            <span className="brand-white">Filatova</span>{" "}
            <span className="brand-accent">Elena</span>
          </span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <div className="custom-toggler">
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
          </div>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="home" spy={true} smooth={true} offset={-100} duration={500} className="nav-link navbar-link" activeClass="active" onClick={() => setExpanded(false)}>Home</Link>
            <Link to="skills" spy={true} smooth={true} offset={-100} duration={500} className="nav-link navbar-link" activeClass="active" onClick={() => setExpanded(false)}>Skills</Link>
            <Link to="projects" spy={true} smooth={true} offset={-100} duration={500} className="nav-link navbar-link" activeClass="active" onClick={() => setExpanded(false)}>Projects</Link>
            <Link to="contact" spy={true} smooth={true} offset={-100} duration={500} className="nav-link navbar-link" activeClass="active" onClick={() => setExpanded(false)}>Contact</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;