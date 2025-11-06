import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,        // MUI responsive container
  Paper,           // MUI elevated surface
  TextField,       // MUI input field
  Button,          // MUI button
  Typography,      // MUI text component
  Box,             // MUI layout component
  Alert,           // MUI alert/notification
  CircularProgress // MUI loading spinner
} from '@mui/material';
import type { LoginCredentials, User } from '../types';

/**
 * Login Component - Handles user authentication
 * Features:
 * - TypeScript type safety
 * - Material UI design
 * - Form validation
 * - Loading states
 * - Error handling
 */
const Login: React.FC = () => {
  // ===== STATE MANAGEMENT =====
  
  // Form data state with TypeScript interface
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',  // User input for username/email
    password: ''   // User input for password
  });
  
  // UI state management
  const [isLoading, setIsLoading] = useState<boolean>(false);    // Form submission loading
  const [error, setError] = useState<string>('');               // Error messages
  const [users, setUsers] = useState<User[]>([]);               // Available users from API
  
  // React Router navigation hook
  const navigate = useNavigate();

  // ===== EFFECT HOOKS =====
  
  /**
   * Effect: Fetch users from API on component mount
   * Runs once when component loads
   */
  useEffect(() => {
    console.log('🚀 Login component mounted - fetching users');
    
    const fetchUsers = async (): Promise<void> => {
      try {
        // Make API call to get all users
        const response = await fetch('http://localhost:3001/users');
        
        // Check if request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse JSON response with proper typing
        const userData: User[] = await response.json();
        
        // Update state with fetched users
        setUsers(userData);
        console.log('✅ Users loaded:', userData.length, 'users');
        
      } catch (error) {
        console.error('❌ Error fetching users:', error);
        setError('Failed to load user data. Please check your connection.');
      }
    };

    fetchUsers();

    // Cleanup function (optional for this use case)
    return () => {
      console.log('🧹 Login component cleanup');
    };
  }, []); // Empty dependency array = run once on mount

  // ===== EVENT HANDLERS =====
  
  /**
   * Handle input field changes
   * @param event - React change event from input field
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    
    console.log(`📝 Input changed - ${name}: ${value}`);
    
    // Update credentials state using functional update
    setCredentials(prevCredentials => ({
      ...prevCredentials,      // Spread existing credentials
      [name]: value           // Update specific field
    }));
    
    // Clear error when user starts typing (better UX)
    if (error) {
      setError('');
    }
  };

  /**
   * Handle form submission and authentication
   * @param event - React form submission event
   */
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    // Prevent default form submission behavior
    event.preventDefault();
    
    console.log('🔐 Login attempt for:', credentials.username);
    
    // Set loading state
    setIsLoading(true);
    setError('');

    // Simulate processing time (matching your original 3-second delay)
    setTimeout(() => {
      // Find matching user in fetched users array
      const validUser = users.find((user: User) => 
        user.username === credentials.username && 
        user.password === credentials.password
      );

      if (validUser) {
        console.log('✅ Login successful for user:', validUser.username);
        
        // Store user data in localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        
        // Navigate to courses page
        navigate('/courses');
        
      } else {
        console.log('❌ Login failed - invalid credentials');
        setError('Invalid username or password. Please try again.');
      }
      
      // Clear loading state
      setIsLoading(false);
    }, 3000);
  };

  // ===== RENDER =====
  
  return (
    <Container maxWidth="sm">
      {/* Main container with responsive max width */}
      
      <Box
        sx={{
          marginTop: 8,           // Top margin
          display: 'flex',        // Flexbox layout
          flexDirection: 'column', // Vertical stacking
          alignItems: 'center'    // Center alignment
        }}
      >
        {/* Elevated paper container for form */}
        <Paper 
          elevation={3}           // Shadow depth
          sx={{ 
            padding: 4,           // Internal padding
            width: '100%',        // Full width
            borderRadius: 2       // Rounded corners
          }}
        >
          {/* Page title */}
          <Typography 
            component="h1"        // HTML h1 tag
            variant="h4"          // MUI typography variant
            align="center"        // Center alignment
            gutterBottom          // Bottom margin
            color="primary"       // Primary theme color
          >
            Course Platform Login
          </Typography>
          
          {/* Error alert - only shown when error exists */}
          {error && (
            <Alert 
              severity="error"    // Red error styling
              sx={{ mb: 2 }}      // Bottom margin
              onClose={() => setError('')} // Allow dismissing
            >
              {error}
            </Alert>
          )}

          {/* Login form */}
          <Box 
            component="form"      // HTML form element
            onSubmit={handleLogin} // Form submission handler
            sx={{ mt: 1 }}        // Top margin
          >
            {/* Username input field */}
            <TextField
              margin="normal"         // Standard margin
              required                // HTML required attribute
              fullWidth              // 100% width
              id="username"          // HTML id
              label="Username"       // Floating label
              name="username"        // Form field name
              autoComplete="username" // Browser autocomplete hint
              autoFocus              // Focus on load
              value={credentials.username}
              onChange={handleInputChange}
              disabled={isLoading}   // Disable during loading
              variant="outlined"     // MUI variant style
              error={Boolean(error)} // Show error state if error exists
            />
            
            {/* Password input field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"        // Hide input text
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
              disabled={isLoading}
              variant="outlined"
              error={Boolean(error)}
            />

            {/* Submit button */}
            <Button
              type="submit"          // Form submission trigger
              fullWidth
              variant="contained"    // Filled button style
              sx={{ 
                mt: 3,               // Top margin
                mb: 2,               // Bottom margin
                height: 48           // Fixed height
              }}
              disabled={isLoading || !credentials.username || !credentials.password}
            >
              {isLoading ? (
                <>
                  {/* Loading spinner */}
                  <CircularProgress 
                    size={20}        // Small spinner
                    sx={{ mr: 1 }}   // Right margin
                    color="inherit"  // Inherit button color
                  />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </Box>

          {/* Demo credentials display */}
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              <strong>Demo Credentials:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              admin / admin123
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              arun@gmail.com / arun123
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
