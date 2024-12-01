import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Container, Paper, Typography, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { getTransactions } from '../Service/api';
import Loader from '../component/Loader';
import Navbar from '../component/Navbar';

const Transactions = () => {
  const { data: transactions, loading } = useFetch(getTransactions);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (loading) return <Loader />;

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const transactionsWithSequentialId = transactions.map((transaction, index) => ({
    ...transaction,
    id: index + 1
  }));

  const displayedTransactions = transactionsWithSequentialId.slice(0, rowsPerPage);

  return (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 10,
          maxWidth: 'lg',
          padding: 3,
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            fontFamily: 'Poppins, sans-serif',
            color: '#333',
          }}
        >
          All Transactions
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item>
            <FormControl>
              <InputLabel id="rows-per-page-label">Rows</InputLabel>
              <Select
                labelId="rows-per-page-label"
                id="rows-per-page"
                value={rowsPerPage}
                label="Rows"
                onChange={handleRowsPerPageChange}
                sx={{ minWidth: 120 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Paper
          sx={{
            overflow: 'hidden',
            marginBottom: 4,
            borderRadius: 3,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555' }}>
                  ID Transaksi
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555' }}>
                  Pelanggan
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555' }}>
                  Paket
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555' }}>
                  Tanggal
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#555' }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedTransactions.map((transaction) => {
                const customerName = transaction.customer || 'Pelanggan Tidak Ditemukan';
                const packageName = transaction.package || 'Paket Tidak Ditemukan';

                let statusColor = '#FF9800';
                if (transaction.status === 'approved') {
                  statusColor = '#4CAF50';
                } else if (transaction.status === 'rejected') {
                  statusColor = '#F44336';
                }

                return (
                  <TableRow
                    key={transaction.id}
                    sx={{
                      '&:hover': { backgroundColor: '#f0f0f0' },
                      transition: 'background-color 0.3s ease-in-out',
                    }}
                  >
                    <TableCell align="center">{transaction.id}</TableCell>
                    <TableCell align="center">{customerName}</TableCell>
                    <TableCell align="center">{packageName}</TableCell>
                    <TableCell align="center">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          color: statusColor,
                          fontWeight: 'bold',
                        }}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </>
  );
};

export default Transactions;
