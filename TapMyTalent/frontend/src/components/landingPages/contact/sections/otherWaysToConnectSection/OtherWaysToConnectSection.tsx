import { useState } from 'react';
import Section from "../../common/Section/Section";
import BackgroundImage from "../../../assets/images/backgroundImage.webp";
import { SocialIcon } from "react-social-icons";
import './OtherWaysToConnectSection.css';

const OtherWaysToConnectSection = () => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const socialButtons = [
        {
            id: 'gogole',
            network: 'google',
            url: 'mailto:info@hashtechinfo.com',
            label: 'Gmail'
        },
        {
            id: 'whatsapp',
            network: 'whatsapp',
            url: 'https://wa.me/16699991087?text=Hello,%20I%20would%20like%20to%20connect%20with%20you',
            label: 'WhatsApp'
        },
        {
            id: 'linkedin',
            network: 'linkedin',
            url: 'https://www.linkedin.com/company/hashtech-info/',
            label: 'Linkedin'
        }
    ];

    return (
        <Section
            backgroundColor="#EAEAEA"
            className="other-ways-to-connect-section"
        >
            <div className="other-ways-to-connect-container" style={{ backgroundImage: `url(${BackgroundImage})` }}>
                <h1 className="other-ways-to-connect-title">Other Ways To Connect</h1>
                <p className="other-ways-to-connect-description">
                    Stay connected and be a part of our growing community through your favorite platforms. 
                    Click below to join our groups and chats directly:
                </p>
                <div className="other-ways-to-connect-buttons">
                    {socialButtons.map((button) => (
                        <button 
                            key={button.id}
                            className="other-ways-to-connect-button"
                            onMouseEnter={() => setHoveredButton(button.id)}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => window.open(button.url, '_blank')}
                        >
                            <SocialIcon
                                network={button.network}
                                url={button.url}
                                target="_blank"
                                bgColor="transparent"
                                fgColor="#000000"
                            />
                            <span>{hoveredButton === button.id ? 'Join Now' : button.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default OtherWaysToConnectSection;