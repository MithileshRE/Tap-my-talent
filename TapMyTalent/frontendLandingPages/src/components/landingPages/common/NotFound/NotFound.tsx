import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import TopBar from '../TopBar/TopBar';
import Header from '../LandingHeader/LandingHeader';
import error404Image from '../../../../assets/images/error404.webp';

const NotFound = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/');
  };

  return (
    <>
      <TopBar />
      <Header />
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-text">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <img 
            src={error404Image} 
            alt="404 Error - Page Not Found" 
            className="not-found-image"
            onClick={handleImageClick}
            title="Click to go back to home page"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;
