import Button from '../Button/Button';
import './LandingCTA.css';

const LandingCTA = () => {
    return (
        <div className="cta-container">
            <p className='cta-heading'>Ready to Land Your <span>Dream</span> Job?</p>
            <p className='cta-heading'>Start Now!</p>
            <p className='cta-description'>Whether you're in need of a standout resume, interview coaching, or a personalized job search plan, we’ve got you covered. Join the thousands of professionals who’ve successfully advanced their careers with our tailored solutions.</p>
            <p className='cta-sub-heading'>Take the First Step Today!</p>
            <Button text='Get Started' to='/contact' />
        </div>
    );
};

export default LandingCTA;