import TopBar from "../common/TopBar/TopBar";
import Header from "../common/LandingHeader/LandingHeader";
import CTA from "../common/cta/LandingCTA";
import Footer from "../common/LandingFooter/LandingFooter";
import ContactUsHeroSection from "./sections/contactUsHeroSection/ContactUsHeroSection";
import ContactUsFormandDetailSection from "./sections/contactUsFormandDetailSection/ContactUsFormandDetailSection";
import FAQAccordion from "./sections/faqSection/FAQAccordion";

const Contact: React.FC = () => {
    return (
        <section className="contact-section">
            <TopBar />
            <Header />
            <ContactUsHeroSection />
            <ContactUsFormandDetailSection />
            <FAQAccordion />
            <CTA />
            <Footer />
        </section>
    );
};

export default Contact;