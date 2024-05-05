import React, { useState } from "react";

function JobsContainer({ job, filterjobs }) {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const toggleDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={job?.logoUrl} alt={job?.companyName} style={{ width: '100px', height: '100px', marginLeft: '10px',}} />
        <div>
          <h2 style={{ marginLeft: '10px' }}>{job?.companyName}</h2>
          <p style={{ marginLeft: '10px' }}>{job?.jobRole}</p>
          <p style={{ marginLeft: '10px' }}>{job?.location}</p>
        </div>
      </div>
      
      <p style={{ marginLeft: "15px" }}>Estimated Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode} ✅</p>
      <p style={{ marginLeft: "15px" }}>About Company:</p>
      <p style={{ marginLeft: "15px" }}>About US:</p>
      <p style={{ marginLeft: "15px" }}>{showFullDetails ? job?.jobDetailsFromCompany : job?.jobDetailsFromCompany.slice(0, 300)}</p>
      {job?.jobDetailsFromCompany.length > 300 && (
        <button onClick={toggleDetails} style={{ marginLeft: "120px", color: "#6666ff", backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
          {showFullDetails ? "View less" : "View more"}
        </button>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a href={job.jdLink} style={{ marginBottom: '10px', color: '#6666ff', textDecoration: 'none' }}>View Job</a>
      </div>
      
      {job?.minExp ? (
        <>
          <p style={{ marginLeft: "15px" }}>Minimum Experience:</p>
          <p style={{ marginLeft: "15px" }}>{job?.minExp}</p>
        </>
      ) : <div style={{ height: "100px" }}></div>}
      
      <button style={{ position: 'sticky', marginTop: '10px', backgroundColor: 'rgb(85, 239, 196)', color: 'black', border: 'none', padding: '8px 16px', borderRadius: '5px', width: "90%", marginLeft: "15px" }}>⚡ Easy Apply</button>
      
      <button style={{ position: 'sticky', marginTop: '10px', marginBottom: '10px', backgroundColor: '#6666ff', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', width: "90%", marginLeft: "15px" }}>Unlock referral asks</button>
    </>
  );
}

export default JobsContainer;