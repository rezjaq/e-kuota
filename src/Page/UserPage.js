import React, { useState, useEffect } from 'react';
import { getPackages, createTransaction } from '../Service/api';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';

const UserPage = () => {
  const [packages, setPackages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Ambil data paket
    const fetchPackages = async () => {
      const data = await getPackages();
      setPackages(data);
    };

    // Simulasikan login untuk mendapatkan userId
    const token = JSON.parse(localStorage.getItem('token'));
    setUserId(token.userId);

    fetchPackages();
  }, []);

  const handleBuy = async (packageId) => {
    if (!userId) return;

    const transaction = {
      customerId: userId,
      packageId,
      date: new Date().toISOString().split('T')[0]
    };

    await createTransaction(transaction);
    alert('Paket berhasil dibeli!');
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Beli Paket Data
      </Typography>
      <Grid container spacing={3}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{pkg.name}</Typography>
                <Typography variant="body1">Harga: Rp {pkg.price}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleBuy(pkg.id)}
                >
                  Beli Paket
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserPage;
