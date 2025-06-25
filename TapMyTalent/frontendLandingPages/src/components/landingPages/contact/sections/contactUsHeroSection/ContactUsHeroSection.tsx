import "./ContactUsHeroSection.css";
import NewyYorkBackground from "../../../../../assets/images/new-york-background.webp";

const ContactUsHeroSection = () => {
    return (
        <section style={{ backgroundImage: `url(${NewyYorkBackground})` }}
            className="contact-us-hero-section">
            <div className="container contact-us-hero-container">
                <h1>Contact Us</h1>
                <div className="contact-us-hero-description">
                    <p>
                        Tap My Talent is here to provide tailored solutions to meet your needs. Let’s connect and explore how we can assist you.                    </p>
                </div>
            </div>
        </section>
    );
};

export default ContactUsHeroSection;