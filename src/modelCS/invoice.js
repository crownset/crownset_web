import mongoose from 'mongoose';

// Define the schema for invoice items
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Define the schema for invoice
const InvoiceSchema = new mongoose.Schema({
  bill_to: {
    type: String,
    required: true,
  },
  term_conditions: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  gstin: {
    type: String,
    required: true,
  },
  invoice_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return !isNaN(Date.parse(v)); // Validate date format
      },
      message: 'Invalid invoice date format',
    },
  },
  invoice_no: {
    type: String,
    unique: true, // Ensure invoice number is unique
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return !isNaN(Date.parse(v)); // Validate date format
      },
      message: 'Invalid due date format',
    },
  },
  reductions: {
    type: Number,
    required: true,
  },
  items: {
    type: [ItemSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Invoice = mongoose.models.invoice || mongoose.model('invoice', InvoiceSchema);

export default Invoice;
