import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Drives() {
  const [form, setForm] = useState({
    vaccineName: '',
    date: '',
    dosesAvailable: '',
    applicableClasses: ''
  });
  const [drives, setDrives] = useState([]);

  const fetchDrives = () => {
    API.get('/drives/upcoming').then((res) => setDrives(res.data));
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      applicableClasses: form.applicableClasses.split(',').map(cls => cls.trim())
    };

    API.post('/drives', payload)
      .then(() => {
        fetchDrives();
        setForm({ vaccineName: '', date: '', dosesAvailable: '', applicableClasses: '' });
      })
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div>
      <h2>Vaccination Drives</h2>
      <input name="vaccineName" placeholder="Vaccine Name" value={form.vaccineName} onChange={handleChange} />
      <input name="date" type="date" value={form.date} onChange={handleChange} />
      <input name="dosesAvailable" type="number" placeholder="Available Doses" value={form.dosesAvailable} onChange={handleChange} />
      <input name="applicableClasses" placeholder="Classes (comma-separated)" value={form.applicableClasses} onChange={handleChange} />
      <button onClick={handleSubmit}>Create Drive</button>

      <h3>Upcoming Drives</h3>
      <ul>
        {drives.map((d) => (
          <li key={d._id}>
            {d.vaccineName} — {new Date(d.date).toDateString()} — Classes: {d.applicableClasses.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drives;
