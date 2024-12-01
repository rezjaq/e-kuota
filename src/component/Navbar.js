import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme } from '@mui/material'; // Import useTheme
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // Gunakan useTheme untuk mendapatkan akses ke theme

  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(token).role : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#0073e6',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        height: 70, // Tinggi navbar tetap
        justifyContent: 'center', // Posisikan item di tengah secara vertikal
        [theme.breakpoints.down('md')]: { // Responsif untuk layar lebih kecil
          height: 60,
        },
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '1.5rem',
              color: '#fff',
              textAlign: 'left',
              [theme.breakpoints.down('md')]: {
                fontSize: '1.2rem',
              },
            }}
          >
            KuotaKita
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              margin: '0 auto',
              justifyContent: 'center',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                gap: 2,
              },
            }}
          >
            {userRole === 'admin' && (
              <>
                <Button
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': { backgroundColor: '#005bb5', color: '#fff' },
                  }}
                  onClick={() => navigate('/dashboardadmin')}
                >
                  Dashboard
                </Button>
                <Button
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': { backgroundColor: '#005bb5', color: '#fff' },
                  }}
                  onClick={() => navigate('/transactions')}
                >
                  Transactions
                </Button>
              </>
            )}
            {userRole === 'customer' && (
              <>
                <Button
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': { backgroundColor: '#005bb5', color: '#fff' },
                  }}
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '&:hover': { backgroundColor: '#005bb5', color: '#fff' },
                  }}
                  onClick={() => navigate('/history-customer')}
                >
                  History Transactions
                </Button>
              </>
            )}
          </Box>
          <Button
            sx={{
              color: '#fff',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': { backgroundColor: '#005bb5', color: '#fff' },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
