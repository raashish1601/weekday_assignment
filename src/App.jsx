import React, { useEffect, useState, useRef } from 'react';
import JobsContainer from './components/JobsContainer/JobsContainer';
import './App.css';

function App() {
  const [jobDetails, setJobDetails] = useState([]);
  const [selectedJobRole, setSelectedJobRole] = useState("");
  const [minExpFilter, setMinExpFilter] = useState('');
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minBasePayFilter, setMinBasePayFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jobDetails]); // Add scroll listener

  const fetchData = () => {
    if (loading) return;
    setLoading(true);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: (pageRef.current - 1) * 10 // Adjust offset based on current page
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body
    };

    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then(response => response.json())
      .then(result => {
        setJobDetails(prevJobDetails => [...prevJobDetails, ...result.jdList]); // Append new data to existing job details
        pageRef.current += 1; // Increment page number
        setLoading(false);
      })
      .catch(error => console.error(error));
  };

  const handleJobRoleChange = (event) => {
    setSelectedJobRole(event.target.value);
  };

  const handleMinExpChange = (event) => {
    setMinExpFilter(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyNameFilter(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleMinBasePayChange = (event) => {
    setMinBasePayFilter(event.target.value);
  };

  const minExpOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const locations = ["Mumbai", "Remote", "Chennai", "Delhi NCR", "Bangalore"];
  const minBasePayOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  const filteredJobDetails = jobDetails ? jobDetails.filter(job => {
    if (selectedJobRole !== "" && job.jobRole !== selectedJobRole) {
      return false; 
    }
    if (minExpFilter !== '' && job.minExp < parseInt(minExpFilter)) {
      return false; 
    }
    if (companyNameFilter !== '' && !job.companyName.toLowerCase().includes(companyNameFilter.toLowerCase())) {
      return false; 
    }
    if (locationFilter !== '' && job.location.toLowerCase() !== locationFilter.toLowerCase()) {
      return false; 
    }
    if (minBasePayFilter !== '' && job.minJdSalary < parseInt(minBasePayFilter)) {
      return false; 
    }
    return true; 
  }) : [];

  return (
    <div className="container">
      <div className="filters">
        <div className="filter">
          <label htmlFor="jobRole">Filter by Job Role:</label>
          <select id="jobRole" value={selectedJobRole} onChange={handleJobRoleChange}>
            <option value="" disabled hidden>All</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="frontend">Frontend</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="minExp">Minimum Experience:</label>
          <select id="minExp" value={minExpFilter} onChange={handleMinExpChange}>
            <option value="" disabled hidden>Any</option>
            {minExpOptions.map(exp => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="companyName">Search by Company Name:</label>
          <input type="text" id="companyName" value={companyNameFilter} onChange={handleCompanyNameChange} />
        </div>
        <div className="filter">
          <label htmlFor="location">Filter by Location:</label>
          <select id="location" value={locationFilter} onChange={handleLocationChange}>
            <option value="" disabled hidden>Any</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="minBasePay">Minimum Base Pay:</label>
          <select id="minBasePay" value={minBasePayFilter} onChange={handleMinBasePayChange}>
            <option value="" disabled hidden>Any</option>
            {minBasePayOptions.map(pay => (
              <option key={pay} value={pay}>{pay}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid-container">
        {filteredJobDetails.map(job => (
          <div className="card" key={job.jdUid}>
            <JobsContainer job={job} />
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;