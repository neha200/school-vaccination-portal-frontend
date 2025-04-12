import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useRef } from 'react';

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: '', name: '', class: '', age: '', gender: ''
  });

  const fetchStudents = () => {
    API.get('/students').then(res => setStudents(res.data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    API.post('/students', form).then(() => {
      fetchStudents();
      setForm({ studentId: '', name: '', class: '', age: '', gender: '' });
    });
  };

  const fileInput = useRef();

  const handleCSVUpload = () => {
    const formData = new FormData();
    formData.append('file', fileInput.current.files[0]);

    API.post('/students/upload', formData).then(() => {
      alert('Bulk upload successful!');
      fetchStudents();
    }).catch((err) => {
      alert(err.response?.data?.error || 'Upload failed');
    });
  };

  return (
    <div>
      <h2>Manage Students</h2>
      <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="class" placeholder="Class" value={form.class} onChange={handleChange} />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
      <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Student</button>

      <h3>Student List</h3>
      <ul>
        {students.map((s) => (
          <li key={s._id}>{s.name} ({s.class})</li>
        ))}
      </ul>

      <h3>Bulk Upload Students (CSV)</h3>
      <input type="file" ref={fileInput} />
      <button onClick={handleCSVUpload}>Upload</button>
    </div>
  );
}

export default Students;
