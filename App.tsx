import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Login from './components/Login';
import CourseList from './components/CourseList';

/**
 * Main App Component - Root component with routing and theme setup
 * Features:
 * - TypeScript type safety
 * - Material UI theming
 * - Global CSS baseline
 * - Client-side routing
 * - Route protection
 */
const App: React.FC = () => {
  console.log('App component initialized');

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides consistent CSS baseline across browsers */}
      <CssBaseline />
      
      {/* Router setup for navigation */}
      <Router>
        <Routes>
          {/* Default route - redirect to login */}
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />
          
          {/* Login route */}
          <Route path="/login" element={<Login />} 
          />
          
          {/* Protected courses route */}
          <Route 
            path="/courses" 
            element={<CourseList />} 
          />
          
          {/* Catch-all route for 404s */}
          <Route 
            path="*" 
            element={<Navigate to="/login" replace />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
