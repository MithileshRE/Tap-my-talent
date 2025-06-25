import React, { useState, useEffect } from 'react';
import './Jobs.css';
import { ScreenProps } from '../ScreenProps';
import * as XLSX from 'xlsx';

// Mock data for the jobs table
interface JobData {
  id: number;
  title: string;
  date: string;
  company: string;
  location: string;
  jobUrl: string;
  status: string;
  favorite: boolean;
}

const mockJobs: JobData[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    date: '2025-04-25',
    company: 'Tech Solutions',
    location: 'Remote',
    jobUrl: 'https://example.com/job1',
    status: 'Applied',
    favorite: false
  },
  {
    id: 2,
    title: 'UX Designer',
    date: '2025-04-20',
    company: 'Design Co',
    location: 'Mumbai',
    jobUrl: 'https://example.com/job2',
    status: 'Unapplied',
    favorite: true
  },
  {
    id: 3,
    title: 'Product Manager',
    date: '2025-04-15',
    company: 'Product Inc',
    location: 'Bangalore',
    jobUrl: 'https://example.com/job3',
    status: 'Interview',
    favorite: false
  }
];

type FilterType = 'All' | 'New' | 'Applied' | 'Interview' | 'Starred';

const Jobs: React.FC<ScreenProps> = ({ userType: _ }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [jobs, setJobs] = useState<JobData[]>(mockJobs);
  const [sortByDate, setSortByDate] = useState<'asc' | 'desc' | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  
  // Helper function to check if a date is today
  const isToday = (dateString: string) => {
    const today = new Date();
    const jobDate = new Date(dateString);
    return jobDate.getDate() === today.getDate() && 
           jobDate.getMonth() === today.getMonth() && 
           jobDate.getFullYear() === today.getFullYear();
  };
  
  // Filter jobs based on active filter
  const filteredJobs = jobs.filter(job => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Starred') return job.favorite;
    if (activeFilter === 'New') return isToday(job.date);
    return job.status === activeFilter;
  });
  
  // Effect to handle select all checkbox
  useEffect(() => {
    if (selectAll) {
      setSelectedJobs(filteredJobs.map(job => job.id));
    } else if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    }
  }, [selectAll]);
  
  // Update selectAll when all jobs are manually selected/deselected
  useEffect(() => {
    if (filteredJobs.length > 0 && selectedJobs.length === filteredJobs.length) {
      setSelectAll(true);
    } else if (selectAll && selectedJobs.length !== filteredJobs.length) {
      setSelectAll(false);
    }
  }, [selectedJobs, filteredJobs]);
  
  // Handle filter click
  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };
  
  // Handle sort by date
  const handleSortByDate = () => {
    const newSortDirection = sortByDate === 'asc' ? 'desc' : 'asc';
    setSortByDate(newSortDirection);
    
    const sortedJobs = [...jobs].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return newSortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    setJobs(sortedJobs);
  };
  
  // Handle favorite toggle
  const handleToggleFavorite = (id: number) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, favorite: !job.favorite } : job
    );
    setJobs(updatedJobs);
  };
  
  // Handle job selection
  const handleSelectJob = (id: number) => {
    if (selectedJobs.includes(id)) {
      setSelectedJobs(selectedJobs.filter(jobId => jobId !== id));
    } else {
      setSelectedJobs([...selectedJobs, id]);
    }
  };
  
  // Handle select all
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  
  // Handle status change
  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
  };
  
  // Handle download as Excel
  const handleDownloadExcel = () => {
    // Determine which jobs to download
    const jobsToDownload = selectedJobs.length > 0 
      ? jobs.filter(job => selectedJobs.includes(job.id))
      : filteredJobs;
    
    // Prepare data for Excel
    const workbook = XLSX.utils.book_new();
    
    // Format data for Excel
    const excelData = jobsToDownload.map(job => ({
      Title: job.title,
      Company: job.company,
      Location: job.location,
      Date: new Date(job.date).toLocaleDateString(),
      Status: job.status,
      'Job URL': job.jobUrl,
      Favorite: job.favorite ? 'Yes' : 'No'
    }));
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, 'tapmytalent_jobs.xlsx');
    
    console.log(`Downloaded ${jobsToDownload.length} jobs as Excel`);
  };
  
  return (
    <div className="jobs-screen">
      <div className="jobs-filters">
        <div className="filter-options">
          <label className={`filter-option ${activeFilter === 'All' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="jobFilter" 
              checked={activeFilter === 'All'} 
              onChange={() => handleFilterClick('All')} 
            />
            <span>All</span>
          </label>
          
          <label className={`filter-option ${activeFilter === 'New' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="jobFilter" 
              checked={activeFilter === 'New'} 
              onChange={() => handleFilterClick('New')} 
            />
            <span>New</span>
          </label>
          
          <label className={`filter-option ${activeFilter === 'Applied' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="jobFilter" 
              checked={activeFilter === 'Applied'} 
              onChange={() => handleFilterClick('Applied')} 
            />
            <span>Applied</span>
          </label>
          
          <label className={`filter-option ${activeFilter === 'Interview' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="jobFilter" 
              checked={activeFilter === 'Interview'} 
              onChange={() => handleFilterClick('Interview')} 
            />
            <span>Interview</span>
          </label>
          
          {/* Today filter removed as requested */}
        </div>
        
        <div className="table-actions">
          <button className="action-button jobs-download-button" onClick={handleDownloadExcel} title="Download as Excel">
            <span className="material-icons">download</span>
          </button>
          <button 
            className="action-button star-button" 
            onClick={() => handleFilterClick('Starred')} 
            title="Show Starred Jobs"
          >
            <span className="material-icons">
              {activeFilter === 'Starred' ? 'star' : 'star_border'}
            </span>
          </button>
          <button className="action-button sort-button" onClick={handleSortByDate} title="Sort by Date">
            <span className="material-icons">
              {sortByDate === 'asc' ? 'arrow_upward' : sortByDate === 'desc' ? 'arrow_downward' : 'sort'}
            </span>
          </button>
        </div>
      </div>
      
      <div className="jobs-table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input 
                  type="checkbox" 
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Title</th>
              <th>Date</th>
              <th>Company</th>
              <th>Location</th>
              <th>Job URL</th>
              <th>Status</th>
              <th className="actions-column"></th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <tr key={job.id}>
                  <td className="checkbox-column">
                    <input 
                      type="checkbox" 
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => handleSelectJob(job.id)}
                    />
                  </td>
                  <td>{job.title}</td>
                  <td>{new Date(job.date).toLocaleDateString()}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>
                    <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                      {job.jobUrl.length > 30 ? `${job.jobUrl.substring(0, 30)}...` : job.jobUrl}
                    </a>
                  </td>
                  <td>
                    <select 
                      className={`status-dropdown status-${job.status.toLowerCase()}`}
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    >
                      <option value="Unapplied">Unapplied</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                    </select>
                  </td>
                  <td className="actions-column">
                    <button 
                      className="favorite-button" 
                      onClick={() => handleToggleFavorite(job.id)}
                      title={job.favorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <span className="material-icons">
                        {job.favorite ? 'star' : 'star_border'}
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-data-message">
                  No jobs found matching the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobs;
