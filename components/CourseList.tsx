import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,          // MUI responsive container
  Typography,         // MUI text component
  AppBar,            // MUI top navigation bar
  Toolbar,           // MUI toolbar for AppBar
  Button,            // MUI button
  Box,               // MUI layout component
  CircularProgress,  // MUI loading spinner
  Alert,             // MUI alert component
  Fade,              // MUI fade animation
  Avatar,            // MUI user avatar
  IconButton,        // MUI icon button
  Menu,              // MUI dropdown menu
  MenuItem,          // MUI menu item
  Divider,           // MUI divider line
  Skeleton,          // MUI loading skeleton
  Grid               // MUI grid layout
} from '@mui/material';
import {
  Logout,            // Logout icon
  School,            // School/education icon
  Person,            // Person icon
  Refresh,           // Refresh icon
  } from '@mui/icons-material';
import Course from './Course';
import { useFetch } from '../hooks/useFetch';
import type { Course as CourseType, User } from '../types';

/**
 * CourseList Component - Main dashboard for viewing and managing courses
 * Features:
 * - TypeScript type safety
 * - Material UI responsive design
 * - User authentication
 * - Course management (view, delete)
 * - Loading states and error handling
 * - Professional navigation bar
 * - Responsive grid layout
 */
const CourseList: React.FC = () => {
  // ===== CUSTOM HOOKS =====
  
  // Fetch courses using typed custom hook
  const { 
    data: initialCourses, 
    error: fetchError, 
    loading: fetchLoading 
  } = useFetch<CourseType[]>('http://localhost:3001/courses');

  // ===== STATE MANAGEMENT =====
  
  // Course data state
  const [courses, setCourses] = useState<CourseType[]>([]);
  
  // User authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  
  // Delete operation state
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string>('');
  
  // UI state
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // React Router navigation
  const navigate = useNavigate();

  // ===== DERIVED STATE =====
  
  // Calculate statistics
  const totalCourses = courses.length;
  const averagePrice = courses.length > 0 
    ? courses.reduce((sum, course) => sum + course.price, 0) / courses.length 
    : 0;
  const averageRating = courses.length > 0
    ? courses.reduce((sum, course) => sum + course.rating, 0) / courses.length
    : 0;

  // ===== EFFECT HOOKS =====

  /**
   * Effect: Authentication Check
   * Runs on component mount to verify user authentication
   */
  useEffect(() => {
    console.log('CourseList mounted - checking authentication');
    
    const checkAuthentication = (): void => {
      try {
        const userData = localStorage.getItem('currentUser');
        
        if (!userData) {
          console.log('❌ No authenticated user found - redirecting to login');
          navigate('/login');
          return;
        }

        const user: User = JSON.parse(userData);
        
        // Validate user object structure
        if (!user.id || !user.username) {
          throw new Error('Invalid user data structure');
        }

        setCurrentUser(user);
        console.log('Authenticated user:', user.username);
        
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser'); // Clean up corrupted data
        navigate('/login');
      } finally {
        setAuthChecking(false);
      }
    };

    checkAuthentication();

    // Cleanup function
    return () => {
      console.log('CourseList component unmounting');
    };
  }, [navigate]);

  /**
   * Effect: Sync Courses Data
   * Updates local courses state when data is fetched
   */
  useEffect(() => {
    if (initialCourses && initialCourses.length > 0) {
      setCourses(initialCourses);
      console.log('Courses loaded:', initialCourses.length, 'courses');
      console.log('Course statistics:', {
        total: initialCourses.length,
        averagePrice: (initialCourses.reduce((sum, c) => sum + c.price, 0) / initialCourses.length).toFixed(2),
        averageRating: (initialCourses.reduce((sum, c) => sum + c.rating, 0) / initialCourses.length).toFixed(1)
      });
    }
  }, [initialCourses]);

  /**
   * Effect: Clear delete error after delay
   */
  useEffect(() => {
    if (deleteError) {
      const timer = setTimeout(() => {
        setDeleteError('');
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [deleteError]);

  // ===== EVENT HANDLERS =====

  /**
   * Handle user logout
   */
  const handleLogout = (): void => {
    console.log('User logging out:', currentUser?.username);
    
    // Clear user data
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    
    // Close user menu
    setUserMenuAnchor(null);
    
    // Navigate to login
    navigate('/login');
  };

  /**
   * Handle course deletion
   * @param courseId - ID of course to delete
   */
  const handleDelete = async (courseId: string): Promise<void> => {
    // Find course to delete
    const courseToDelete = courses.find(course => course.id === courseId);
    
    if (!courseToDelete) {
      console.error('Course not found for deletion:', courseId);
      return;
    }

    console.log('Deleting course:', courseToDelete.name);

    // Set loading state for specific course
    setDeleteLoading(courseId);
    setDeleteError('');

    try {
      // Make DELETE request to API
      const response = await fetch(`http://localhost:3001/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Course deleted successfully from server');

      // Update local state - remove deleted course
      setCourses(prevCourses => {
        const updatedCourses = prevCourses.filter(course => course.id !== courseId);
        console.log('Local state updated, remaining courses:', updatedCourses.length);
        return updatedCourses;
      });

      // Show success message
      console.log(`"${courseToDelete.name}" course deleted successfully!`);

    } catch (error) {
      console.error(' Error deleting course:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setDeleteError(`Failed to delete "${courseToDelete.name}": ${errorMessage}`);
    } finally {
      // Clear loading state
      setDeleteLoading(null);
    }
  };

  /**
   * Handle manual refresh
   */
  const handleRefresh = (): void => {
    setRefreshing(true);
    
    // Simulate refresh delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  /**
   * Handle user menu toggle
   */
  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = (): void => {
    setUserMenuAnchor(null);
  };

  // ===== LOADING STATES =====

  // Authentication checking
  if (authChecking) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Data fetching loading
  if (fetchLoading && courses.length === 0) {
    return (
      <>
        {/* Navigation Bar Skeleton */}
        <AppBar position="static">
          <Toolbar>
            <School sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Course Platform
            </Typography>
            <Skeleton variant="rectangular" width={100} height={36} />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {/* Loading Skeletons for Courses */}
           <Grid container spacing={3}>
            {[1,2,3,4,5,6].map((item) => (
               <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
                 <Skeleton 
                   variant="rectangular"
                     height={200}/>
                     </Grid>
            ))}
            </Grid> 
            
          
        </Container>
      </>
    );
  }

  // Fetch error state
  if (fetchError && courses.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Retry
            </Button>
          }
        >
          Error loading courses: {fetchError}
        </Alert>
      </Container>
    );
  }

  // Not authenticated state
  if (!currentUser) {
    return (
      <Container>
        <Typography>Redirecting to login...</Typography>
      </Container>
    );
  }

  // ===== MAIN RENDER =====

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          {/* Logo and Title */}
          <School sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
            Vconstruct Self E-Learn
          </Typography>

          {/* Course Statistics */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
            <Typography variant="body2" sx={{ mr: 8 }}>
              {totalCourses} Courses
            </Typography>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Avg: ${averagePrice.toFixed(1)}
            </Typography>
            <Typography variant="body2" sx={{ mr: 2 }}>
              ★ {averageRating.toFixed(1)}
            </Typography>
          </Box>

          {/* Refresh Button */}
          <IconButton
            color="inherit"
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{ mr: 1 }}
          >
            {refreshing ? <CircularProgress size={24} color="inherit" /> : <Refresh />}
          </IconButton>

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
              {currentUser.username}
            </Typography>
            
            <IconButton
              color="inherit"
              onClick={handleUserMenuClick}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <Person />
              </Avatar>
            </IconButton>
          </Box>

          {/* User Dropdown Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem disabled>
              <Typography variant="body2" color="text.secondary">
                Signed in by
              </Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography variant="body1" fontWeight="bold">
                {currentUser.username}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Delete Error Alert */}
        <Fade in={Boolean(deleteError)}>
          <Alert 
            severity="error" 
            sx={{ mb: 3 }} 
            onClose={() => setDeleteError('')}
            action={
              <Button color="inherit" size="small" onClick={() => setDeleteError('')}>
                Dismiss
              </Button>
            }
          >
            {deleteError}
          </Alert>
        </Fade>

        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Allocated courses for you
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Explore Your mandatory courses need to be covered for next 6 months, "PAY for it PASS" the Assesment get 2wice in your V-wallet. 
          </Typography>
          
          {/* Statistics Cards */}
          <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
            <Grid>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                <Typography variant="h4" color="primary">
                  {totalCourses}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Courses
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                <Typography variant="h4" color="success.main">
                  ${averagePrice.toFixed(0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Price
                </Typography>
              </Box>
            </Grid>
            <Grid>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'warning.50', borderRadius: 2 }}>
                <Typography variant="h4" color="warning.main">
                  {averageRating.toFixed(1)}★
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Empty State */}
        {courses.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 8,
              p: 4,
              textAlign: 'center'
            }}
          >
            <School sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No Courses Available
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              All courses have been removed or there was an error loading them.
              Contact the administrator to add new courses.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              sx={{ mt: 2 }}
            >
              Refresh Page
            </Button>
          </Box>
        ) : (
          /* Courses Grid */
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
                <Course
                  {...course}
                  onDelete={handleDelete}
                  isDeleting={deleteLoading === course.id}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Footer */}
        <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Course Platform • {new Date().getFullYear()} • Built with TypeScript & Material UI
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default CourseList;
