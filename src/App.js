import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './Page/Login';
import Dashboard from './Page/Dashboard';
import DashboardAdmin from './Page/DashboardAdm';
import Transactions from './Page/Transactions';
import ProtectedRoute from './utils/ProtectedRoute';

export const AuthContext = createContext();

const App = () => {
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem('token'))?.role || null
  );

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="customer">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboardadmin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute role="admin">
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history-customer"
          element={
            <ProtectedRoute role="customer">
              <Transactions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
