import './BootcampJoinSection.css';
import GuranteeStamp from "../../../../../assets/icons/guaranteeIcon.webp"
import TrialStamp from "../../../../../assets/icons/trialIcon.webp"
interface StampBoxProps {
    image: string;
    title: string;
    subtitle: string;
}

const StampBox: React.FC<StampBoxProps> = ({ image, title, subtitle }) => {
    return (
        <div className="stamp-box">
            <img src={image} alt={title} className="stamp-box-image" />
            <h3 className="stamp-box-title">{title}</h3>
            <p className="stamp-box-subtitle">{subtitle}</p>
        </div>
    );
};

const BootcampJoinSection = () => {
    return (
        <section
            className="bootcamp-join-section"
        >
            <div className="container bootcamp-join-container">
                <h1 className="bootcamp-join-title">Join with <span>Confidences</span></h1>
                <div className="bootcamp-join-stamps">
                    <StampBox
                        image={TrialStamp}
                        title="14-Days"
                        subtitle="Free Trial"
                    />
                    <StampBox
                        image={GuranteeStamp}
                        title="6 Months"
                        subtitle="Guarantee"
                    />
                </div>
            </div>
        </section>
    );
};

export default BootcampJoinSection;