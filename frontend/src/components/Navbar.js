import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/students">Students</Link> |{" "}
      <Link to="/drives">Drives</Link> |{" "}
      <Link to="/reports">Reports</Link> |{" "}
      <Link to="/">Logout</Link>
    </nav>
  );
}

export default Navbar;
