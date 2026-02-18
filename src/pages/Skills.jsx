import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import colorSharp from "../assets/img/color-sharp.png";
import { skillsData, certificates } from "../data";

gsap.registerPlugin(ScrollTrigger);

export const Skills = () => {
  const skillRef = useRef(null);

  useEffect(() => {
    if (skillRef.current) {
      gsap.fromTo(
        ".skill-grid-item",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.05, 
          duration: 0.6, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <section className="skill" id="skills">
      <div className="container" ref={skillRef}>
        <div className="row">
          <div className="col-12">
            <div className="skill-bx">
              <h2>Technical Expertise</h2>
              <h5>Passionate Web Developer & Tech Creator</h5>
              
              <p>
                With a focus on building scalable full-stack applications, I specialize in 
                creating responsive, accessible, and performant web solutions. I am 
                dedicated to solving complex problems with elegant code and 
                continuously evolving my technical stack with modern industry standards.
              </p>

              <div className="skill-grid">
                {skillsData.map((skill, idx) => (
                  <div className="skill-grid-item" key={idx}>
                    <div className="icon-box">
                      <img 
                        src={skill.img} 
                        alt={skill.title} 
                        
                       
                        className={
                          skill.title.includes("React") || skill.title.includes("Motion") 
                          ? "physics" 
                          : ""
                        } 
                      />
                    </div>
                    <h5>{skill.title}</h5>
                  </div>
                ))}
              </div>

              <h3 className="mt-5">Certificates</h3>
              <div className="certificates-grid">
                {certificates.map((cert, idx) => (
                  <div className="certificate-card" key={idx}>
                    <img src={cert.img} alt={cert.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="background-decoration" />
    </section>
  );
};