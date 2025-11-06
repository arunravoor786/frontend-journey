import { createTheme } from '@mui/material/styles';

/**
 * Material UI Theme Configuration
 * Customizes the default Material UI theme with:
 * - Brand colors
 * - Typography settings
 * - Component overrides
 * - Responsive breakpoints
 */
export const theme = createTheme({
  // Color palette configuration
  palette: {
    // Primary color (used for main actions, links, etc.)
    primary: {
      main: '#1976d2',        // Blue
      light: '#42a5f5',       // Lighter blue
      dark: '#1565c0',        // Darker blue
      contrastText: '#ffffff'  // White text on primary
    },
    
    // Secondary color (used for accents, floating action buttons, etc.)
    secondary: {
      main: '#dc004e',        // Pink/red
      light: '#ff5983',       // Lighter pink
      dark: '#9a0036',        // Darker red
      contrastText: '#ffffff'  // White text on secondary
    },
    
    // Error color (for error messages, invalid states, etc.)
    error: {
      main: '#f44336',        // Red
      light: '#ff7961',       // Light red
      dark: '#ba000d',        // Dark red
    },
    
    // Warning color (for warning messages, caution states, etc.)
    warning: {
      main: '#ff9800',        // Orange
      light: '#ffb74d',       // Light orange
      dark: '#f57c00',        // Dark orange
    },
    
    // Info color (for informational messages, etc.)
    info: {
      main: '#2196f3',        // Blue
      light: '#64b5f6',       // Light blue
      dark: '#1976d2',        // Dark blue
    },
    
    // Success color (for success messages, valid states, etc.)
    success: {
      main: '#4caf50',        // Green
      light: '#81c784',       // Light green
      dark: '#388e3c',        // Dark green
    },
    
    // Background colors
    background: {
      default: '#fafafa',     // Light grey background
      paper: '#ffffff'        // White paper background
    },
    
    // Text colors
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',      // Dark text
      secondary: 'rgba(0, 0, 0, 0.6)',     // Medium grey text
      disabled: 'rgba(0, 0, 0, 0.38)'      // Light grey text
    }
  },
  
  // Typography configuration
  typography: {
    // Font family
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    
    // Heading styles
    h1: {
      fontWeight: 700,        // Bold
      fontSize: '2.125rem',   // 34px
      lineHeight: 1.2
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.875rem',   // 30px
      lineHeight: 1.2
    },
    h3: {
      fontWeight: 600,        // Semi-bold
      fontSize: '1.5rem',     // 24px
      lineHeight: 1.3
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',    // 20px
      lineHeight: 1.3
    },
    h5: {
      fontWeight: 500,        // Medium
      fontSize: '1.125rem',   // 18px
      lineHeight: 1.4
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',       // 16px
      lineHeight: 1.4
    },
    
    // Body text styles
    body1: {
      fontSize: '1rem',       // 16px
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',   // 14px
      lineHeight: 1.5
    },
    
    // Button text
    button: {
      fontWeight: 500,
      fontSize: '0.875rem',
      textTransform: 'none' as const  // Disable uppercase
    }
  },
  
  // Responsive breakpoints
  breakpoints: {
    values: {
      xs: 0,      // Extra small devices
      sm: 600,    // Small devices (tablets)
      md: 900,    // Medium devices (small laptops)
      lg: 1200,   // Large devices (desktops)
      xl: 1536    // Extra large devices
    }
  },
  
  // Spacing configuration (used for margins, paddings, etc.)
  spacing: 8, // Base spacing unit (8px)
  
  // Shape configuration (border radius, etc.)
  shape: {
    borderRadius: 8  // Default border radius
  },
  
  // Component-specific overrides
  components: {
    // Button component overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',      // Disable uppercase text
          borderRadius: 8,            // Rounded corners
          fontWeight: 500,            // Medium font weight
          padding: '8px 16px',        // Custom padding
          boxShadow: 'none',          // Remove default shadow
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'  // Hover shadow
          }
        },
        // Contained variant (filled buttons)
        contained: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
          }
        }
      }
    },
    
    // Card component overrides
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,           // More rounded corners
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          transition: 'box-shadow 0.2s ease-in-out', // Smooth transitions
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)' // Enhanced shadow on hover
          }
        }
      }
    },
    
    // TextField component overrides
    MuiTextField: {
      defaultProps: {
        variant: 'outlined' as const  // Default to outlined style
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,          // Rounded input fields
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2'  // Blue border on hover
            }
          }
        }
      }
    },
    
    // Paper component overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,           // Consistent rounded corners
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' // Subtle shadow
        }
      }
    },
    
    // AppBar component overrides
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
          backgroundColor: '#1976d2'   // Consistent primary color
        }
      }
    },
    
    // Chip component overrides
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,           // Rounded chips
          fontWeight: 500             // Medium font weight
        }
      }
    }
  }
});

export default theme;
