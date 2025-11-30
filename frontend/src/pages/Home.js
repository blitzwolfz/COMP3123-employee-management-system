import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Employee Management System</h1>
        <p className="subtitle">Streamline your workforce management</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>📊 Easy Management</h3>
            <p>Add, update, and manage employee records with ease</p>
          </div>
          
          <div className="feature-card">
            <h3>🔍 Quick Search</h3>
            <p>Find employees by name, department, or position</p>
          </div>
          
          <div className="feature-card">
            <h3>📈 Track Performance</h3>
            <p>Monitor salary and department information</p>
          </div>
        </div>

        <div className="cta-buttons">
          {isAuthenticated ? (
            <Link to="/employees" className="btn btn-primary btn-large">
              View Employees
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
