import React, { useState, useEffect } from 'react';
import API from '../services/api';

function Reports() {
  const [students, setStudents] = useState([]);
  const [vaccineFilter, setVaccineFilter] = useState('');

  const fetchStudents = async () => {
    const res = await API.get('/students');
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = students.filter(s =>
    vaccineFilter === '' || s.vaccinations.some(v => v.vaccineName === vaccineFilter)
  );

  const downloadCSV = () => {
    const rows = [['Student ID', 'Name', 'Class', 'Vaccine', 'Date']];
    filtered.forEach((s) => {
      s.vaccinations.forEach((v) => {
        rows.push([s.studentId, s.name, s.class, v.vaccineName, new Date(v.date).toLocaleDateString()]);
      });
    });

    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.download = 'vaccination-report.csv';
    link.click();
  };

  return (
    <div>
      <h2>Vaccination Reports</h2>
      <input
        placeholder="Filter by vaccine name"
        value={vaccineFilter}
        onChange={(e) => setVaccineFilter(e.target.value)}
      />
      <button onClick={downloadCSV}>Download CSV</button>

      <table border="1">
        <thead>
          <tr>
            <th>Student ID</th><th>Name</th><th>Class</th><th>Vaccine</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.flatMap((s) =>
            s.vaccinations.map((v, idx) => (
              <tr key={`${s._id}-${idx}`}>
                <td>{s.studentId}</td>
                <td>{s.name}</td>
                <td>{s.class}</td>
                <td>{v.vaccineName}</td>
                <td>{new Date(v.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
