import React, { useState } from 'react';
import styles from './JobsFilter.module.scss';

const JobsFilter = ({ jobsData }) => {
    const [selectedJobRole, setSelectedJobRole] = useState('');
    const [minExpFilter, setMinExpFilter] = useState('');
    const [companyNameFilter, setCompanyNameFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [minBasePayFilter, setMinBasePayFilter] = useState('');

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

    const filteredJobDetails = jobsData ? jobsData.filter(job => {
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
        <div className={styles.filtersContainer}>
            <div className={styles.filters}>
                <div className={styles.filter}>
                    <label htmlFor="jobRole">Filter by Job Role:</label>
                    <select id="jobRole" value={selectedJobRole} onChange={handleJobRoleChange} className={styles.jobRole}>
                        <option value="" disabled hidden>All</option>
                        <option value="android">Android</option>
                        <option value="ios">iOS</option>
                        <option value="frontend">Frontend</option>
                    </select>
                </div>
                <div className={styles.filter}>
                    <label htmlFor="minExp">Minimum Experience:</label>
                    <select id="minExp" value={minExpFilter} onChange={handleMinExpChange} className={styles.minExp}>
                        <option value="" disabled hidden>Any</option>
                        {minExpOptions.map(exp => (
                            <option key={exp} value={exp}>{exp}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.filter}>
                    <label htmlFor="companyName">Search by Company Name:</label>
                    <input type="text" id="companyName" value={companyNameFilter} onChange={handleCompanyNameChange} className={styles.companyName} />
                </div>
                <div className={styles.filter}>
                    <label htmlFor="location">Filter by Location:</label>
                    <select id="location" value={locationFilter} onChange={handleLocationChange} className={styles.location}>
                        <option value="" disabled hidden>Any</option>
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.filter}>
                    <label htmlFor="minBasePay">Minimum Base Pay:</label>
                    <select id="minBasePay" value={minBasePayFilter} onChange={handleMinBasePayChange} className={styles.minBasePay}>
                        <option value="" disabled hidden>Any</option>
                        {minBasePayOptions.map(pay => (
                            <option key={pay} value={pay}>{pay}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default JobsFilter;