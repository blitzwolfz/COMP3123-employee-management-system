import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeService } from '../services/employeeService';
import '../styles/Employee.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    position: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAll(filters);
      setEmployees(response.data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.delete(id);
        fetchEmployees();
      } catch (err) {
        setError(err.message || 'Failed to delete employee');
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h2>Employee Directory</h2>
        <Link to="/employees/add" className="btn btn-primary">
          Add New Employee
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={handleFilterChange}
          className="filter-input"
        />
        
        <select
          name="department"
          value={filters.department}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
          <option value="Sales">Sales</option>
        </select>

        <input
          type="text"
          name="position"
          placeholder="Filter by position..."
          value={filters.position}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>

      {employees.length === 0 ? (
        <div className="no-data">No employees found</div>
      ) : (
        <div className="employee-grid">
          {employees.map((employee) => (
            <div key={employee._id} className="employee-card">
              <div className="employee-card-header">
                <h3>{employee.firstName} {employee.lastName}</h3>
                <span className="department-badge">{employee.department}</span>
              </div>
              
              <div className="employee-details">
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Salary:</strong> ${employee.salary.toLocaleString()}</p>
                <p><strong>Joined:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
              </div>

              <div className="employee-actions">
                <Link to={`/employees/edit/${employee._id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
