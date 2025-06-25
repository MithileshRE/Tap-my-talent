import Header from '../common/LandingHeader/LandingHeader';
import TopBar from '../common/TopBar/TopBar';
import CTA from '../common/cta/LandingCTA';
import Footer from '../common/LandingFooter/LandingFooter';
import ServicesHeroSection from './sections/ServicesHeroSection/ServicesHeroSection';
import ServicesOurServicesSection from './sections/ServicesOurServicesSection/ServicesOurServicesSection';
import './Services.css';
import ServicesOurProcessSection from './sections/ServicesOurProcessSection/ServicesOurProcessSection';

const Services = () => {
    return (
        <div className='services'>
            <TopBar />
            <Header />
            <ServicesHeroSection />
            <ServicesOurServicesSection />
            <ServicesOurProcessSection />
            <CTA />
            <Footer />
        </div>
    );
};

export default Services;