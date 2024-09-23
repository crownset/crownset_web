import InvoiceTemplate from '@/components/admin/InvoiceTemplate';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateInvoicePDF = createAsyncThunk(
  'invoice/generatePDF',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/generate-invoice', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateInvoicePDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateInvoicePDF.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generateInvoicePDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to generate PDF';
      });
  },
});



export default invoiceSlice.reducer;
