import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandStory from '@/components/BrandStory';
import About from '@/components/About';
import WhyChooseUs from '@/components/WhyChooseUs';
import Facilities from '@/components/Facilities';
import Programs from '@/components/Programs';
import Membership from '@/components/Membership';
import Trainers from '@/components/Trainers';
import Transformations from '@/components/Transformations';
import VirtualTour from '@/components/VirtualTour';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsApp from '@/components/WhatsApp';

export default function Home() {
  return (
    <SmoothScroll>
      {/* Custom Luxury cursor feedback */}
      <CustomCursor />
      
      {/* Sticky blurred glass navbar */}
      <Navbar />

      {/* 16 Sequential Page Sections */}
      <Hero />
      <BrandStory />
      <About />
      <WhyChooseUs />
      <Facilities />
      <Programs />
      <Membership />
      <Trainers />
      <Transformations />
      <VirtualTour />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      
      {/* Footer */}
      <Footer />

      {/* Floating CTA WhatsApp */}
      <WhatsApp />
    </SmoothScroll>
  );
}
