// src/App.tsx
import "./scrollbar.css";
import Shell from "./components/layout/Shell";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Engineering from "./sections/Engineering";
import Contact from "./sections/Contact";

function App() {
  return (
    <Shell onOpenStudio={() => {}}>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Engineering />
      <Contact />
    </Shell>
  );
}

export default App;
