import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardHome.css';
import Card from '../../../../common/card/Card';
import { ScreenProps } from '../ScreenProps';

// Import icons
import jobsIcon from '../../../../../assets/icons/jobs.svg';
import scheduleIcon from '../../../../../assets/icons/schedule-clock.svg';
import assignmentIcon from '../../../../../assets/icons/assignment-pending.svg';
import networkIcon from '../../../../../assets/icons/network-connection.svg';
import resumeIcon from '../../../../../assets/icons/resume-score.svg';
import documentIcon from '../../../../../assets/icons/resume-score.svg';

interface CardData {
  id: string;
  title: string;
  value: number | string;
  icon: string;
  link?: string;
  summary?: string;
}

const DashboardHome: React.FC<ScreenProps> = ({ userType }) => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [dashboardData, setDashboardData] = useState<{
    statistics: CardData[];
    documents: CardData[];
  }>({ statistics: [], documents: [] });
  
  // Static dashboard structure - only the values will come from API
  const dashboardStructure = {
    statistics: [
      {
        id: 'jobs-applied',
        title: 'Jobs Applied',
        icon: jobsIcon,
        summaryTemplate: 'You have applied to {value} jobs in the last 30 days. 5 applications are still under review.'
      },
      {
        id: 'scheduled-interviews',
        title: 'Scheduled Interviews',
        icon: scheduleIcon,
        summaryTemplate: 'You have {value} upcoming interviews scheduled. The next one is on April 10th at 2:00 PM.'
      },
      {
        id: 'pending-assignments',
        title: 'Pending Assignments',
        icon: assignmentIcon,
        summaryTemplate: 'You have {value} pending assignments to complete. The nearest deadline is April 15th.'
      },
      {
        id: 'network-connections',
        title: 'Network Connections',
        icon: networkIcon,
        summaryTemplate: 'You have {value} connections in your professional network. 5 new connections were added this week.'
      },
      {
        id: 'resume-score',
        title: 'Resume Score',
        icon: resumeIcon,
        summaryTemplate: 'Your resume has a score of {value}/100. There are a few minor improvements that could be made.'
      },
      {
        id: 'applications',
        title: 'Applications',
        link: '/dashboard/jobs',
        summaryTemplate: 'You have {value} active applications. 3 have moved to the next round.'
      }
    ],
    documents: [
      {
        id: 'resumes',
        title: 'Your Resumes',
        link: '/dashboard/documents',
        summaryTemplate: 'You have {value} resumes saved. The last update was 3 days ago.'
      },
      {
        id: 'cover-letters',
        title: 'Cover Letters',
        link: '/dashboard/documents',
        summaryTemplate: 'You have {value} cover letters saved. The last update was 5 days ago.'
      }
    ]
  };

  // Function to fetch data from API
  const fetchDashboardData = async () => {
    try {
      // This would be replaced with an actual API call
      // const response = await fetch('/api/dashboard-data');
      // const apiData = await response.json();
      
      // Mock API data - in real implementation, this would come from the API
      const apiData = {
        jobsApplied: 15,
        scheduledInterviews: 11,
        pendingAssignments: '06',
        networkConnections: 25,
        resumeScore: '92.8',
        applications: 12,
        resumes: 15,
        coverLetters: 11
      };
      
      // Map API data to dashboard structure
      const mappedData = {
        statistics: dashboardStructure.statistics.map(item => {
          let value;
          switch(item.id) {
            case 'jobs-applied': value = apiData.jobsApplied; break;
            case 'scheduled-interviews': value = apiData.scheduledInterviews; break;
            case 'pending-assignments': value = apiData.pendingAssignments; break;
            case 'network-connections': value = apiData.networkConnections; break;
            case 'resume-score': value = apiData.resumeScore; break;
            case 'applications': value = apiData.applications; break;
            default: value = 0;
          }
          
          // For cards with links, we don't need icons
          // For cards without links, we need to keep the icon
          const cardData: CardData = {
            ...item,
            value,
            icon: item.link ? '' : (item.icon || documentIcon), // Empty icon if has link, otherwise use original or default
            summary: item.summaryTemplate.replace('{value}', value.toString())
          };
          
          return cardData;
        }),
        documents: dashboardStructure.documents.map(item => {
          let value;
          switch(item.id) {
            case 'resumes': value = apiData.resumes; break;
            case 'cover-letters': value = apiData.coverLetters; break;
            default: value = 0;
          }
          
          // For document cards, we need to add the icon property
          // If the card has a link, we use an empty string for the icon
          const cardData: CardData = {
            ...item,
            value,
            icon: item.link ? '' : documentIcon, // Empty icon if has link, otherwise use document icon
            summary: item.summaryTemplate.replace('{value}', value.toString())
          };
          
          return cardData;
        })
      };
      
      setDashboardData(mappedData);
      // Set the first card as selected by default
      if (mappedData.statistics.length > 0) {
        setSelectedCard(mappedData.statistics[0]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
    if (card.link) {
      // Navigate to the linked page
      navigate(card.link);
    }
  };
  
  return (
    <div className="dashboard-home">
      <h1>Welcome to Your Personalized Job Search Hub!</h1>
      
      <section className="dashboard-section">
        <h2>Statistics {userType === 'admin' ? '(AI)' : '(Human)'}</h2>
        <div className="dashboard-cards">
          {dashboardData.statistics.map((card) => (
            <div key={card.id} className="card-wrapper" onClick={() => handleCardClick(card)}>
              <Card 
                title={card.title} 
                value={card.value} 
                icon={card.icon}
                link={card.link}
              />
            </div>
          ))}
        </div>
      </section>
      
      <section className="dashboard-section">
        <h2>Documents {userType === 'admin' ? '(AI)' : '(Human)'}</h2>
        <div className="dashboard-cards">
          {dashboardData.documents.map((card) => (
            <div key={card.id} className="card-wrapper" onClick={() => handleCardClick(card)}>
              <Card 
                title={card.title} 
                value={card.value} 
                icon={card.icon}
                link={card.link}
              />
            </div>
          ))}
        </div>
      </section>
      
      {selectedCard && (
        <section className="dashboard-section">
          <h2>Summary</h2>
          <div className="dashboard-summary">
            <p>{selectedCard.summary || `No summary available for ${selectedCard.title}.`}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default DashboardHome;
