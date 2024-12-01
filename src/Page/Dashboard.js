import React, { useState, useReducer, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Loader from '../component/Loader';
import { getCustomers, createTransaction } from '../Service/api';
import useFetch from '../hooks/useFetch';
import { Container, Button, Grid, Card, CardContent, Box, Typography } from '@mui/material';
import PurchaseModal from '../utils/PurchaseModal';
import '../style/Dashboard.css';

const initialState = {
  phoneNumber: '',
  paymentMethod: '',
  selectedPackage: null,
  selectedProvider: 'Telkomsel',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'SET_SELECTED_PACKAGE':
      return { ...state, selectedPackage: action.payload };
    case 'SET_SELECTED_PROVIDER':
      return { ...state, selectedProvider: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: customers, loading } = useFetch(getCustomers);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [openModal, setOpenModal] = useState(false);

  const handlePurchase = useCallback((packageDetails) => {
    dispatch({ type: 'SET_SELECTED_PACKAGE', payload: packageDetails });
    setOpenModal(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    const selectedCustomer = customers.find((cust) => cust.phoneNumber === state.phoneNumber);

    if (!selectedCustomer) {
      alert('Customer tidak ditemukan! Harap periksa nomor telepon.');
      return;
    }

    const transactionData = {
      customer: selectedCustomer.name || 'Unknown Customer',
      phoneNumber: state.phoneNumber,
      package: state.selectedPackage?.name || 'Paket Tidak Tersedia',
      price: state.selectedPackage?.price || 'Harga Tidak Tersedia',
      provider: state.selectedProvider,
      paymentMethod: state.paymentMethod,
      date: new Date().toISOString(),
      status: 'pending',
    };

    if (!transactionData.package || !transactionData.phoneNumber || !transactionData.paymentMethod) {
      alert('Semua data harus diisi dengan benar.');
      return;
    }

    try {
      await createTransaction(transactionData);
      alert('Transaksi berhasil dibuat!');
      navigate('/history-customer');
    } catch (error) {
      console.error('Terjadi kesalahan saat membuat transaksi:', error);
      alert('Gagal membuat transaksi.');
    }

    setOpenModal(false);
    dispatch({ type: 'RESET' });
  }, [state, customers, navigate]);

  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleProviderChange = useCallback((provider) => {
    dispatch({ type: 'SET_SELECTED_PROVIDER', payload: provider });
  }, []);

  const packages = useMemo(() => ({
    Telkomsel: [
      { name: '1GB - Daily', price: 'Rp 10.000', type: 'Harian', description: 'Daily use for basic browsing and messaging', logo: 'https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png' },
      { name: '2GB - Daily', price: 'Rp 15.000', type: 'Harian', description: 'Great for daily social media and light streaming', logo: 'https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png' },
      { name: '5GB - Weekly', price: 'Rp 30.000', type: 'Mingguan', description: 'Perfect for weekly moderate browsing and streaming', logo: 'https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png' },
      { name: '10GB - Weekly', price: 'Rp 50.000', type: 'Mingguan', description: 'Great for heavy weekly usage', logo: 'https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png' },
      { name: '20GB - Monthly', price: 'Rp 100.000', type: 'Bulanan', description: 'Perfect for light streaming and work', logo: 'https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png' },
      { name: '50GB - Monthly', price: 'Rp 250.000', type: 'Bulanan', description: 'Ideal for all heavy internet users', logo: 'https://logos-world.net/wp-content/uploads/2023/03/Telkomsel-Logo.png' }
    ],
    Indosat: [
      { name: '1GB - Daily', price: 'Rp 8.000', type: 'Harian', description: 'Basic browsing and messaging', logo: 'https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp' },
      { name: '3GB - Weekly', price: 'Rp 25.000', type: 'Mingguan', description: 'Moderate social media and light streaming', logo: 'https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp' },
      { name: '7GB - Weekly', price: 'Rp 40.000', type: 'Mingguan', description: 'Great for streaming and moderate gaming', logo: 'https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp' },
      { name: '15GB - Monthly', price: 'Rp 70.000', type: 'Bulanan', description: 'Perfect for casual internet use', logo: 'https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp' },
      { name: '30GB - Monthly', price: 'Rp 110.000', type: 'Bulanan', description: 'Suitable for families or shared usage', logo: 'https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp' },
      { name: '100GB - Monthly', price: 'Rp 300.000', type: 'Bulanan', description: 'Massive data plan for all needs', logo: 'https://logowik.com/content/uploads/images/indosat2865.logowik.com.webp' }
    ],
    Smartfren: [
      { name: 'Unlimited Lite', price: 'Rp 150.000', type: 'Unlimited', description: 'Unlimited browsing at limited speed', logo: 'https://lacakhp.com/wp-content/uploads/2023/01/pngwing.com-2.png' },
      { name: '1GB - Daily', price: 'Rp 10.000', type: 'Harian', description: 'Basic daily browsing', logo: 'https://lacakhp.com/wp-content/uploads/2023/01/pngwing.com-2.png' },
      { name: '7GB - Weekly', price: 'Rp 50.000', type: 'Mingguan', description: 'Perfect for moderate gaming and browsing', logo: 'https://lacakhp.com/wp-content/uploads/2023/01/pngwing.com-2.png' },
      { name: '20GB - Monthly', price: 'Rp 80.000', type: 'Bulanan', description: 'Ideal for work and entertainment', logo: 'https://lacakhp.com/wp-content/uploads/2023/01/pngwing.com-2.png' },
      { name: '50GB - Monthly', price: 'Rp 200.000', type: 'Bulanan', description: 'Best for heavy data usage', logo: 'https://lacakhp.com/wp-content/uploads/2023/01/pngwing.com-2.png' },
      { name: 'Unlimited Max', price: 'Rp 250.000', type: 'Unlimited', description: 'Unlimited data for everything!', logo: 'https://lacakhp.com/wp-content/uploads/2023/01/pngwing.com-2.png' }
    ],
    XL: [
      { name: '500MB - Daily', price: 'Rp 5.000', type: 'Harian', description: 'For quick browsing needs', logo: 'https://1.bp.blogspot.com/-1Woqu7HzySo/W_Xc5AQ8thI/AAAAAAAAFGo/kc8Ncbfm2Hc3zthsmghOrTdA3PRqlZmBgCLcBGAs/s1600/XL%2BLogo.png' },
      { name: '1GB - Daily', price: 'Rp 12.000', type: 'Harian', description: 'Good for light browsing', logo: 'https://1.bp.blogspot.com/-1Woqu7HzySo/W_Xc5AQ8thI/AAAAAAAAFGo/kc8Ncbfm2Hc3zthsmghOrTdA3PRqlZmBgCLcBGAs/s1600/XL%2BLogo.png' },
      { name: '5GB - Weekly', price: 'Rp 30.000', type: 'Mingguan', description: 'For daily browsing and light streaming', logo: 'https://1.bp.blogspot.com/-1Woqu7HzySo/W_Xc5AQ8thI/AAAAAAAAFGo/kc8Ncbfm2Hc3zthsmghOrTdA3PRqlZmBgCLcBGAs/s1600/XL%2BLogo.png' },
      { name: '10GB - Monthly', price: 'Rp 50.000', type: 'Bulanan', description: 'Great for moderate internet use', logo: 'https://1.bp.blogspot.com/-1Woqu7HzySo/W_Xc5AQ8thI/AAAAAAAAFGo/kc8Ncbfm2Hc3zthsmghOrTdA3PRqlZmBgCLcBGAs/s1600/XL%2BLogo.png' },
      { name: '25GB - Monthly', price: 'Rp 100.000', type: 'Bulanan', description: 'Perfect for families or shared use', logo: 'https://1.bp.blogspot.com/-1Woqu7HzySo/W_Xc5AQ8thI/AAAAAAAAFGo/kc8Ncbfm2Hc3zthsmghOrTdA3PRqlZmBgCLcBGAs/s1600/XL%2BLogo.png' },
      { name: '50GB - Monthly', price: 'Rp 200.000', type: 'Bulanan', description: 'For heavy users', logo: 'https://1.bp.blogspot.com/-1Woqu7HzySo/W_Xc5AQ8thI/AAAAAAAAFGo/kc8Ncbfm2Hc3zthsmghOrTdA3PRqlZmBgCLcBGAs/s1600/XL%2BLogo.png' }
    ]
  }), []);

  const renderProviderButtons = useCallback(() => {
    return ['Telkomsel', 'Indosat', 'Smartfren', 'XL'].map((provider) => (
      <Button
        key={provider}
        variant={state.selectedProvider === provider ? 'contained' : 'outlined'}
        sx={{
          margin: '5px',
          fontWeight: 'bold',
          textTransform: 'capitalize',
          boxShadow: state.selectedProvider === provider ? 3 : 0,
          '&:hover': {
            backgroundColor: '#ddd',
            color: '#333',
          },
        }}
        onClick={() => handleProviderChange(provider)}
      >
        {provider}
      </Button>
    ));
  }, [state.selectedProvider, handleProviderChange]);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Selamat datang, {customers.length > 0 ? customers[0].name : 'Pengguna'}!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 2 }}>
              {renderProviderButtons()}
            </Box>

            <Grid container spacing={2} sx={{ mt: 3 }}>
              {packages[state.selectedProvider]?.map((pkg, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                    <CardContent>
                      <img src={pkg.logo} alt={`${pkg.name} logo`} style={{ width: '60px', height: 'auto', marginBottom: '10px' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {pkg.name}
                      </Typography>
                      <Typography sx={{ fontSize: '16px', color: 'primary.main', mb: 1 }}>
                        {pkg.price} ({pkg.type})
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {pkg.description}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handlePurchase(pkg)}
                        sx={{
                          fontWeight: 'bold',
                          borderRadius: 2,
                          textTransform: 'capitalize',
                          backgroundColor: '#2196F3',
                          '&:hover': {
                            backgroundColor: '#1976D2',
                          },
                        }}
                      >
                        Beli Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>

      <PurchaseModal
        open={openModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        selectedPackage={state.selectedPackage}
        setPhoneNumber={(val) => dispatch({ type: 'SET_PHONE_NUMBER', payload: val })}
        setPaymentMethod={(val) => dispatch({ type: 'SET_PAYMENT_METHOD', payload: val })}
      />
    </>
  );
};

export default Dashboard;
