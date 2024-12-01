import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

const PurchaseModal = ({ open, onClose, phoneNumber, setPhoneNumber, paymentMethod, setPaymentMethod, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Complete Your Purchase</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Payment Method"
          >
            <MenuItem value="Credit Card">Credit Card</MenuItem>
            <MenuItem value="Debit Card">Debit Card</MenuItem>
            <MenuItem value="GoPay">GoPay</MenuItem>
            <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseModal;
