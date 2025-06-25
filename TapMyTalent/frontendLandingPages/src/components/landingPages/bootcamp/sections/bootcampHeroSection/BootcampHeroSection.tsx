import bootcampHeroImage from "../../../../../assets/images/bootcampHeroImage.webp";
import './BootcampHeroSection.css';

const BootcampHeroSection = () => {
    return (
        <section className="bootcamp-hero-section">
            <div className="container bootcamp-hero-container">
                <div className="bootcamp-hero-content">
                    <h1 className="bootcamp-hero-title">
                        <span>Upskill</span> with Targeted Training Programs and <span>Bootcamps</span>
                    </h1>
                    <h6 className="bootcamp-hero-subtitle">Develop the skills in high demand to make you stand out to employers.</h6>
                    <p className="bootcamp-hero-description">
                        Tap My Talent empowers individuals with industry-focused training to excel in their careers. Our bootcamps provide hands-on learning, expert guidance, and in-demand skills to help you stand out. Whether you're starting fresh or advancing your career, we prepare you for new opportunities in a dynamic job market.
                    </p>

                </div>
                <div className="bootcamp-hero-images">
                    <img
                        src={bootcampHeroImage}
                        alt="Bootcamp Hero Image"
                        className="bootcamp-hero-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default BootcampHeroSection;