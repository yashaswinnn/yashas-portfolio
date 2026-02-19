import React, { useState } from "react";
import "./App.css";
import profile from "./assets/profile.jpg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className={darkMode ? "dark app-container" : "light app-container"}>

              {/* Navbar */}
              <nav className="navbar">
                <h2>Yashaswin M</h2>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#skills">Skills</a></li>
                  <li><a href="#projects">Projects</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>

                <button className="theme-toggle" onClick={toggleTheme}>
                  {darkMode ? "🌙" : "☀"}
                </button>
              </nav>

              {/* Hero Section */}
              <section className="hero">
                <div className="hero-content">

                  <img
                    src={profile}
                    alt="Yashas Kamble"
                    className="profile-img"
                  />

                 <h1 className="hero-title">
  👋 <span className="title-text">Hi, I'm Yashaswin</span>
</h1>


                  <p className="hero-subtitle">
                    <span className="typing-line line1">
                      AI & ML Engineer
                    </span>
                    <br />
                    <span className="typing-line line2">
                      Building Web Applications 
                    </span>
                    <br />
                    <span className="typing-line line3">
                      Turning Real Word Problems Into Solutions
                    </span>
                  </p>

                  <div className="hero-buttons">
                    <a href="/resume.pdf" download>
                      <button className="primary-btn">
                        Download My Resume
                      </button>
                    </a>
                  </div>

                </div>
              </section>

              {/* About Section */}
              <section id="about" className="about-modern">
                <h2 className="about-title">About Me</h2>

                <div className="about-card">
                  <p>
                    I am  AIML student specializing in Machine Learning and Deep Learning.
                  </p>
                  <p>
                    I build  web applications using the MERN stack.
                  </p>
                  <p>
                    My goal is to develop real-world solutions that create impact.
                  </p>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="skills-modern">
                <h2 className="skills-title">Skills & Expertise</h2>

                <div className="skills-grid">

                  <div className="skill-card">
                    <h3>Frontend</h3>

                    <div className="skill-item">
                      <p>HTML</p>
                      <div className="bar"><div className="fill html"></div></div>
                    </div>

                    <div className="skill-item">
                      <p>CSS</p>
                      <div className="bar"><div className="fill css"></div></div>
                    </div>

                    <div className="skill-item">
                      <p>React</p>
                      <div className="bar"><div className="fill react"></div></div>
                    </div>
                  </div>

                  <div className="skill-card">
                    <h3>Backend</h3>

                    <div className="skill-item">
                      <p>Node.js</p>
                      <div className="bar"><div className="fill node"></div></div>
                    </div>

                    <div className="skill-item">
                      <p>JavaScript</p>
                      <div className="bar"><div className="fill js"></div></div>
                    </div>

                    <div className="skill-item">
                      <p>Python</p>
                      <div className="bar"><div className="fill python"></div></div>
                    </div>
                  </div>

                  <div className="skill-card">
                    <h3>AI / ML</h3>

                    <div className="skill-item">
                      <p>Machine Learning</p>
                      <div className="bar"><div className="fill ml"></div></div>
                    </div>

                    <div className="skill-item">
                      <p>Deep Learning</p>
                      <div className="bar"><div className="fill dl"></div></div>
                    </div>
                  </div>

                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="projects-modern">
                <h2 className="projects-title">Projects</h2>

                <div className="projects-grid">

                  <div className="project-card-modern">
                    <Link to="/project/resume">
                      <h3>AI Based Resume Builder</h3>
                      <p>
                        AI-powered system that generates ATS-friendly resumes using NLP
                        and Machine Learning.
                      </p>
                    </Link>
                  </div>

                  <div className="project-card-modern">
                    <Link to="/project/retinopathy">
                      <h3>Diabetic Retinopathy Detection System</h3>
                      <p>
                        Deep learning model using DenseNet + ResNet for retinal disease
                        classification.
                      </p>
                    </Link>
                  </div>

                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="section">
                <h2>CONTACT ME</h2>

                <div className="contact-info">
                  <p><strong>Name:</strong> Yashaswin M</p>
                  <p><strong>Phone:</strong> 6360167744</p>

                  <p>
                    <strong>Email:</strong>
                    <a href="mailto:yashaskamble02@gmail.com">
                      yashaskamble02@gmail.com
                    </a>
                  </p>

                  <p>
                    <strong>LinkedIn:</strong>
                    <a
                      href="https://linkedin.com/in/yashaswin-m-49a80633b"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/yashaswin-m-49a80633b
                    </a>
                  </p>

                  <p>
                    <strong>GitHub:</strong>
                    <a
                      href="https://github.com/yashaswinnn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/yashaswinnn
                    </a>
                  </p>

                  <footer className="footer">
                    <p>© 2026 Yashaswin M</p>
                    <p>All rights reserved.</p>
                  </footer>

                </div>
              </section>

            </div>
          }
        />

        <Route path="/project/:id" element={<ProjectDetails />} />

      </Routes>
    </Router>
  );
}

export default App;
