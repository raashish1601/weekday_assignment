import React from 'react'
import styles from "./JobCard.module.scss"

// Function to capitalize the first character of a string
const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const JobCard = ({ jobData }) => {

    return (
        <div className={styles['job-card-container']}>
            <h3>⏳ Posted 10 days ago</h3>
            <div className={styles['company-name']}>
                <img src={jobData.logoUrl}></img>
                <div className={styles['company-details']}>
                    <h1>{jobData.companyName}</h1>
                    <span className={styles['role']}>{capitalizeFirstChar(jobData.jobRole)}</span>
                    <p>{capitalizeFirstChar(jobData.location)}</p>
                </div>
            </div>
            <span className={styles['job-salary']}>Estimated Salary:  {jobData.minJdSalary ? (jobData.minJdSalary + "-" + jobData.maxJdSalary) : jobData.maxJdSalary} LPA ⚠️</span>
            <div className={styles['company-about']}>
                <h2>About Company: </h2>
                <p>{jobData.jobDetailsFromCompany}</p>
            </div>
            <h5 style={{ textAlign: 'center', color: 'blue', fontSize: '13px', fontWeight: 400, cursor: 'pointer', display: 'block' }}>Show More</h5>
            <div className={styles['company-requirement']}>
                <h2>Minimum Experience</h2>
                <span>{jobData.minExp} years</span>
            </div>
            <a href={jobData.jdLink} target='_blank'>⚡ Easy Apply</a>
        </div>
    )
}