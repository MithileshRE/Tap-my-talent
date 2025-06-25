import { useState, FormEvent } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './ContactUsForm.css';

interface FormData {
    FULLNAME: string;
    PHONE: string;
    EMAIL_client: string;
    MESSAGE: string;
    SOURCE: string;
}

interface MessageState {
    type: 'success' | 'error' | null;
    text: string;
}

const ContactUsForm = () => {
    const [formData, setFormData] = useState<FormData>({
        FULLNAME: '',
        PHONE: '',
        EMAIL_client: '',
        MESSAGE: '',
        SOURCE: 'hashtechinfo.com'
    });

    const [message, setMessage] = useState<MessageState>({
        type: null,
        text: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const validatePhoneNumber = (phone: string): boolean => {
        const numbersOnly = phone.replace(/[^\d]/g, '');
        return numbersOnly.length >= 10;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validatePhoneNumber(formData.PHONE)) {
            setPhoneError('Please enter a valid phone number with at least 10 digits');
            return;
        }

        setIsSubmitting(true);
        setPhoneError('');

        // Remove "+" from phone number and convert to integer
        const sanitizedFormData = {
            ...formData,
            PHONE: parseInt(formData.PHONE.replace(/\D/g, ''), 10) // Removes all non-digit characters and converts to integer
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/mail_Service`,
                sanitizedFormData,
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
                    }
                }
            );

            setMessage({
                type: 'success',
                text: 'Thank you for your message! We will get back to you soon.'
            });

            setFormData({
                FULLNAME: '',
                PHONE: '+1',
                EMAIL_client: '',
                MESSAGE: '',
                SOURCE: 'hashtechinfo.com'
            });
        } catch (err) {
            setMessage({
                type: 'error',
                text: 'Sorry, something went wrong. Please try again later.'
            });
            console.error('Error submitting form:', err);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                setMessage({ type: null, text: '' });
            }, 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhoneChange = (value: string) => {
        setPhoneError('');
        setFormData(prev => ({
            ...prev,
            PHONE: '+' + value
        }));
    };

    return (
        <div className="contact-us-form">
            <h2>Send us a Message</h2>
            {message.type && (
                <div className={`message-box ${message.type} show`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="FULLNAME"
                        value={formData.FULLNAME}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className="form-group phone-input">
                    <PhoneInput
                        country="us"
                        value={formData.PHONE.slice(1)}
                        onChange={handlePhoneChange}
                        placeholder="Phone Number"
                        disabled={isSubmitting}
                        inputProps={{
                            required: true,
                            name: 'PHONE'
                        }}
                        specialLabel=""
                        enableSearch
                        disableSearchIcon
                        searchPlaceholder="Search countries"
                    />
                    {phoneError && (
                        <div className="error-message phone-error">
                            {phoneError}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="EMAIL_client"
                        value={formData.EMAIL_client}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="MESSAGE"
                        value={formData.MESSAGE}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ContactUsForm;
