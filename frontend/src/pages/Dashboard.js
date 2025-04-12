import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    API.get('/dashboard/summary').then((res) => {
      setSummary(res.data);
    });
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Students: {summary.totalStudents}</p>
      <p>Vaccinated: {summary.vaccinatedStudents}</p>
      <p>Vaccination Rate: {summary.vaccinationRate}%</p>

      <h3>Upcoming Drives</h3>
      {summary.upcomingDrives.length === 0 ? (
        <p>No upcoming drives</p>
      ) : (
        <ul>
          {summary.upcomingDrives.map((drive) => (
            <li key={drive._id}>{drive.vaccineName} on {new Date(drive.date).toDateString()}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
