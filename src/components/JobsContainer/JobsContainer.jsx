import React, { useEffect, useRef, useState } from 'react'
import { JobCard } from "../JobCard/JobCard"
import styles from "./JobsContainer.module.scss"
import JobsFilter from '../JobsFilter/JobsFilter';

const JobContainer = () => {

  const [jobsData, setJobsData] = useState([]);
  const [pageItem, setPageItem] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef(1);

  const fetchJobsData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      "limit": 10,
      "offset": (pageRef.current - 1) * 10
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body
    };

    const jobData = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    const data = await jobData.json();
    setJobsData([...jobsData, ...data.jdList]);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchJobsData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jobsData]);

  useEffect(() => {
    fetchJobsData();
  }, [])

  return (
    <>
      <JobsFilter
        jobsData={jobsData}
      />
      <div style={{ display: 'flex', justifyContent: 'center', width: '60%', marginRight: '20%', marginLeft: '20%' }}>
        <div className={styles['job-card-wrapper']}>
          {
            jobsData?.map((jobData, index) => {
              return (
                <JobCard jobData={jobData} key={jobData.jdUid} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default JobContainer;