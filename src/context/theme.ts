import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: '"EB Garamond", serif'
  },
  palette: {
    primary: {
      main: '#1E3A8A', // Navy Blue
    },
    secondary: {
      main: '#ADADAD', // Silver
    },
    background: {
      default: '#F9FAFB', // Off-White
      paper: '#FFFFFF', // Paper background, slightly lighter
    },
    text: {
      primary: '#374151', // Dark Charcoal for main text
      secondary: '#6B7280', // Lighter text color, useful for placeholders or less prominent text
    },
    error: {
      main: '#BB0A21', // Coral Red for error messages
    },
    warning: {
      main: '#FACC15', // Bright Yellow for warnings or important information
    },
    success: {
      main: '#10B981', // Optional: Green for success messages or checkmarks
    },

  }
})

export default theme;