import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

import NavBar from "./NavBar";
import { Banner } from "../pages/Banner";
import { Skills } from "../pages/Skills";
import { ProjectsSection } from "../pages/Projects";
import { Contact } from "../pages/Contact";
import { Footer } from "./Footer";
import BubblesCSSBackground from "./BubblesCSSBackground";
import { IntroLogo } from "./IntroLogo";

const AppContent = ({ visible }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (visible) {
      // Плавное проявление всего контейнера
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Анимация «всплытия» внутренних блоков
      gsap.fromTo(
        ".section-anchor",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, [visible]);

  return (
    <div className="App" ref={contentRef} style={{ opacity: 0 }}>
      <NavBar />
      
      {/* ВАЖНО: Эти id — единственные на странице. 
        Внутри компонентов Banner, Skills и т.д. удали атрибуты id, если они там есть.
      */}
      <section id="home" className="section-anchor">
        <Banner />
      </section>
      
      <section id="skills" className="section-anchor">
        <Skills />
      </section>
      
      <section id="projects" className="section-anchor">
        <ProjectsSection />
      </section>
      
      <section id="contact" className="section-anchor">
        <Contact />
      </section>
      
      <Footer />
    </div>
  );
};

export const MainApp = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const introRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (introRef.current) {
        gsap.to(introRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setShowIntro(false);
            setShowContent(true);
          },
        });
      }
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="main-wrapper">
      <BubblesCSSBackground />
      
      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
        {showIntro && (
          <div
            ref={introRef}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              background: "#121212" 
            }}
          >
            <IntroLogo />
          </div>
        )}
        
        {showContent && <AppContent visible={showContent} />}
      </div>
    </div>
  );
};

export default MainApp;