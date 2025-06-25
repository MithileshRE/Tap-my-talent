import './Bootcamp.css'
import Header from '../common/LandingHeader/LandingHeader';
import TopBar from '../common/TopBar/TopBar';
import CTA from '../common/cta/LandingCTA';
import Footer from '../common/LandingFooter/LandingFooter';
import BootcampAndCourcesSection from './sections/bootcampAndCourcesSection/BootcampAndCourcesSection';
import BootcampCandidateSuccessSection from './sections/bootcampCandidateSuccessSection/BootcampCandidateSuccessSection';
import BootcampHeroSection from './sections/bootcampHeroSection/BootcampHeroSection';
import BootcampOfferSection from './sections/bootcampOfferSection/BootcampOfferSection';
import BootcampTestimonialSection from './sections/bootcampTestimonialSection';
import BootcampJoinSection from './sections/bootcampJoinSection/BootcampJoinSection';

const Bootcamp = () => {
    return (
        <section className="bootcamp-section">
            <TopBar />
            <Header />
            <BootcampHeroSection />
            <BootcampOfferSection />
            <BootcampAndCourcesSection />
            <BootcampCandidateSuccessSection />
            <BootcampTestimonialSection />
            <BootcampJoinSection />
            <CTA />
            <Footer />
        </section>
    );
};  

export default Bootcamp;