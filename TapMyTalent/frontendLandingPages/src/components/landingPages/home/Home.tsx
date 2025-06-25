import TopBar from '../common/TopBar/TopBar';
import LandingHeader from '../common/LandingHeader/LandingHeader';
import HomeHeroSection from './sections/HomeHeroSection/HomeHeroSection';
import AIvsHuman from './sections/AIvsHuman/AIvsHuman';
import HomeHowWeWork from './sections/HomeHowWeWork/HomeHowWeWork';
import HomeServicesSection from './sections/HomeServicesSection/HomeServicesSection';
import HomeTestimonialSection from './sections/HomeTestimonialSection/HomeTestimonialSection';
import CTA from '../common/cta/LandingCTA';
import Footer from '../common/LandingFooter/LandingFooter';

import './Home.css';

const Home = () => {
    return (
        <div className='home'>
            <TopBar />
            <LandingHeader />
            <HomeHeroSection />
            <AIvsHuman />
            <HomeHowWeWork />
            <HomeServicesSection />
            <HomeTestimonialSection />
            <CTA />
            <Footer />
        </div>
    );
};

export default Home;