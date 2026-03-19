import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Timeline from '../components/Timeline';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { useScrollReveal } from '../hooks/useScrollReveal';


export default function Home() {
  useScrollReveal();

  return (
    <div className="home-page">
      <Loader />
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Timeline />
        <Projects />
        <Contact />
      </main>
      <Footer />
      </div>
      
  );
}