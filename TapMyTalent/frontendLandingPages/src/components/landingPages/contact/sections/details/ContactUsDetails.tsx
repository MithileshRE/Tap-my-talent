import './ContactUsDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SocialIcon } from 'react-social-icons';

const ContactUsDetails = () => {
    return (
        <div className="contact-details-container">
            <h2>Get in Touch</h2>
            <p className="contact-us-details-subtitle">
                We'd love to hear from you! Reach out to us through the details below or send us a message. Our team is here to assist you.
            </p>

            {/* Map Section */}
            <div className="contact-us-map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24262.08019201988!2d-74.412911!3d40.524795!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c7fcbaaa88bd%3A0xcd9d2e1e7bd8850b!2s1005%20Merrywood%20Dr%2C%20Edison%2C%20NJ%2008817!5e0!3m2!1sen!2sus!4v1738096507353!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Contact Information */}
            <div className="contact-us-info">
                <div className="contact-us-info-item">
                    <div className="icon location-icon">
                        <FontAwesomeIcon icon={faMapLocationDot} className="icon" />
                    </div>
                    <div className="contact-us-info-content">
                        <h3>Reach us at Office</h3>
                        <a href="https://maps.app.goo.gl/X8Ma12Q7HfWKTjnF7">320 South Harrison, East Orange, NJ 07018</a>
                    </div>
                </div>

                <div className="contact-us-info-item">
                    <div className="icon email-icon">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    </div>
                    <div className="contact-us-info-content">
                        <h3>Write us a Mail</h3>
                        <a href="mailto:info@tapmytalent.com">info@tapmytalent.com</a>
                    </div>
                </div>

                <div className="contact-us-info-item">
                    <div className="icon phone-icon">
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                    </div>
                    <div className="contact-us-info-content">
                        <h3>Make us a Call</h3>
                        <a href="tel:+15199535756">+1 (519) 953-5756</a>
                    </div>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="social-links">
                <h3>Follow Us</h3>
                <div className="contact-us-social-icons">
                    <SocialIcon url="https://www.linkedin.com/company/tap-my-talent/posts/?feedView=all"
                        target="_blank"      // This opens in new tab
                        bgColor="transparent" // This removes the background
                        fgColor="#000000"    // This makes the icon black
                    />
                    <SocialIcon url="https://www.instagram.com/tapmytalent"
                        target="_blank"      // This opens in new tab
                        bgColor="transparent" // This removes the background
                        fgColor="#000000"    // This makes the icon black
                    />
                    {/* <SocialIcon url="https://x.com/hashtech_info/"
                        target="_blank"      // This opens in new tab
                        bgColor="transparent" // This removes the background
                        fgColor="#000000"    // This makes the icon black
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default ContactUsDetails;