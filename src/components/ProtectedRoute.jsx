import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Login ചെയ്യുമ്പോൾ localStorage-ൽ save ചെയ്ത JWT token ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു
  const token = localStorage.getItem('token');

  // Token ഉണ്ടെങ്കിൽ protected components കാണിക്കും, ഇല്ലെങ്കിൽ /admin/login -ലേക്ക് redirect ചെയ്യും
  return token ? children : <Navigate to="/admin/login" replace />;
}