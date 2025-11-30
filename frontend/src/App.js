import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <EmployeeList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/add"
                element={
                  <ProtectedRoute>
                    <EmployeeForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees/edit/:id"
                element={
                  <ProtectedRoute>
                    <EmployeeForm />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
