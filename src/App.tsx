import { Suspense, lazy } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Hero } from './sections/Hero';
import { Navbar } from './sections/Navbar';
import { WorkSection } from './sections/WorkSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';

// Lazy-load the 3D scene — it is the heaviest asset on the page.
const ThreeShowcaseLazy = lazy(() => import('./sections/ThreeShowcase'));

export function App() {
  return (
    <div className="relative">
      <BackgroundVideo />
      <Navbar />
      <main id="top">
        <Hero />
        <WorkSection />
        <Suspense fallback={<div className="h-[80vh] bg-[#0b0b0c]" />}>
          <ThreeShowcaseLazy />
        </Suspense>
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}