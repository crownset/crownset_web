import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generatePDF = createAsyncThunk(
  'quotation/generatePDF',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/generate-pdf', formData, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotation.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const QuotationSlice = createSlice({
  name: 'quotation',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generatePDF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePDF.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generatePDF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to generate PDF';
      });
  },
});

export default QuotationSlice.reducer;
