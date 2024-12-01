// api.js
import axiosInstance from './axiosInstance';  // Import instance axios yang telah dibuat

// Ambil semua pelanggan
export const getCustomers = async () => {
  try {
    const response = await axiosInstance.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error.message);
    throw error;
  }
};

// Ambil semua transaksi
export const getTransactions = async () => {
  try {
    const response = await axiosInstance.get('/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    throw error;
  }
};

// Ambil transaksi berdasarkan pelanggan (customer)
export const getCustomerTransactions = async () => {
  const user = JSON.parse(localStorage.getItem('token')); // Ambil user dari localStorage
  if (!user || !user.username) {
    console.error('User tidak ditemukan di localStorage');
    throw new Error('User is not logged in or username is not available');
  }

  console.log('Fetching transactions for user:', user.username); // Debug

  try {
    const response = await axiosInstance.get('/transactions', {
      params: { customer: user.username },
    });

    console.log('Response dari API:', response.data); // Debug
    return response.data;
  } catch (error) {
    console.error('Error fetching customer transactions:', error); // Debug error
    throw error;
  }
};



// Ambil semua user (simulasi login)
export const login = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
};

// Ambil semua paket
export const getPackages = async () => {
  try {
    const response = await axiosInstance.get('/packages');
    return response.data;
  } catch (error) {
    console.error('Error fetching packages:', error.message);
    throw error;
  }
};

// Tambah transaksi baru
export const createTransaction = async (transaction) => {
  try {
    const response = await axiosInstance.post('/transactions', transaction);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error.message);
    throw error;
  }
};

// Update status transaksi
export const updateTransaction = async (transactionId, status) => {
  try {
    const response = await axiosInstance.patch(`/transactions/${transactionId}`, { status });
    console.log('Updated Transaction:', response.data);  // Log the response to check if status is updated
    return response.data;
  } catch (error) {
    console.error('Error updating transaction:', error.message);
    throw error;
  }
};
