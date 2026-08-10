import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import TrustBar from '../components/TrustBar/TrustBar';
import TechnologyBar from '../components/TechnologyBar/TechnologyBar';
import Services from '../components/Services/Services';
import Portfolio from '../components/Portfolio/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import OurProcess from '../components/OurProcess/OurProcess';
import Team from '../components/Team/Team';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQs from '../components/FAQs/FAQs';
import Pricing from '../components/Pricing/Pricing';
import FinalCTA from '../components/FinalCTA/FinalCTA';
import Contact from '../components/Contact/Contact';
import ProjectInquiry from '../components/ProjectInquiry/ProjectInquiry';
import Footer from '../components/Footer/Footer';

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <Hero />
        <TrustBar />
        <TechnologyBar />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <OurProcess />
        <Team />
        <Testimonials />
        <FAQs />
        <Pricing />
        <FinalCTA />
        <Contact />
        <ProjectInquiry />
        <Footer />
      </main>
    </div>
  );
}
