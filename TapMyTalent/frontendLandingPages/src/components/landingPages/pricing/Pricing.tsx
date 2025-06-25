import PricingHeroSection from './sections/PricingHeroSection/PricingHeroSection';
import PricingPlansSection from './sections/PricingPlansSection';
import PricingWhyChooseUSSection from './sections/PricingWhyChooseUSSection';
import Header from '../common/LandingHeader/LandingHeader';
import TopBar from '../common/TopBar/TopBar';
import CTA from '../common/cta/LandingCTA';
import Footer from '../common/LandingFooter/LandingFooter';
import './Pricing.css';

const Pricing: React.FC = () => {
    return (
        <section className="pricing-section">
            <TopBar />
            <Header />
            <PricingHeroSection />
            <PricingPlansSection />
            <PricingWhyChooseUSSection />
            <CTA />
            <Footer />
        </section>
    );
};

export default Pricing;