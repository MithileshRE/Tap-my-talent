import ContactUsDetails from "../details/ContactUsDetails";
import ContactUsForm from "../form/ContactUsForm";
import './ContactUsFormandDetailSection.css';

const ContactUSFormandDetailSection = () => {
    return (
        <section 
            className="contact-us-form-and-detail-section"
    >
            <div className="contact-us-form-and-detail-section-container">
                <ContactUsForm />
                <ContactUsDetails />
            </div>
        </section>
    );
};

export default ContactUSFormandDetailSection;