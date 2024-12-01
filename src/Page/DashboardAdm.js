import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import useFetch from '../hooks/useFetch';
import { getTransactions, updateTransaction } from '../Service/api';
import Loader from '../component/Loader';
import Navbar from '../component/Navbar';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const DashboardAdmin = () => {
  const { data: transactions, loading: transactionsLoading, refetch, setData } = useFetch(getTransactions);
  const navigate = useNavigate();

  const handleApprove = async (transactionId) => {
    try {
      await updateTransaction(transactionId, 'approved');
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === transactionId ? { ...transaction, status: 'approved' } : transaction
      );
      setData(updatedTransactions);
    } catch (error) {
      console.error('Error approving transaction:', error);
    }
  };

  const handleReject = async (transactionId) => {
    try {
      await updateTransaction(transactionId, 'rejected');
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === transactionId ? { ...transaction, status: 'rejected' } : transaction
      );
      setData(updatedTransactions);
    } catch (error) {
      console.error('Error rejecting transaction:', error);
    }
  };

  if (transactionsLoading) return <Loader />;

  const pendingTransactions = transactions.filter((transaction) => transaction.status === 'pending');
  const approvedTransactions = transactions.filter((transaction) => transaction.status === 'approved');
  const rejectedTransactions = transactions.filter((transaction) => transaction.status === 'rejected');

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
        <Typography
          variant="h4"
          align="center"
          color="primary"
          sx={{ fontWeight: 'bold', mb: 5 }}
        >
          Admin Dashboard - Transaksi Customer
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 6, textAlign: 'center', p: 4, backgroundColor: '#0073e6', color: '#fff', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Transaksi Pending
              </Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                {pendingTransactions.length}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 6, textAlign: 'center', p: 4, backgroundColor: '#4caf50', color: '#fff', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Transaksi Disetujui
              </Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                {approvedTransactions.length}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: 6, textAlign: 'center', p: 4, backgroundColor: '#f44336', color: '#fff', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Transaksi Ditolak
              </Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                {rejectedTransactions.length}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
            Daftar Transaksi Customer
          </Typography>
          <Box sx={{ maxHeight: '450px', overflowY: 'auto' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><strong>ID Transaksi</strong></TableCell>
                  <TableCell align="center"><strong>Pelanggan</strong></TableCell>
                  <TableCell align="center"><strong>Paket</strong></TableCell>
                  <TableCell align="center"><strong>Tanggal</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Aksi</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingTransactions.map((transaction) => {
                  const customerName = transaction.customer || 'Pelanggan Tidak Ditemukan';
                  const packageName = transaction.package || 'Paket Tidak Ditemukan';

                  return (
                    <TableRow key={transaction.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                      <TableCell align="center">{transaction.id}</TableCell>
                      <TableCell align="center">{customerName}</TableCell>
                      <TableCell align="center">{packageName}</TableCell>
                      <TableCell align="center">{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={transaction.status === 'pending' ? 'Pending' : transaction.status}
                          color={transaction.status === 'pending' ? 'warning' : transaction.status === 'approved' ? 'success' : 'error'}
                          sx={{ fontWeight: 'bold', borderRadius: '16px' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleApprove(transaction.id)}
                          sx={{ marginRight: '8px', padding: '8px 16px', borderRadius: '20px' }}
                          startIcon={<CheckIcon />}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(transaction.id)}
                          sx={{ padding: '8px 16px', borderRadius: '20px' }}
                          startIcon={<ClearIcon />}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default DashboardAdmin;
