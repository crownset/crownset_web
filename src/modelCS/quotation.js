const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: [String], // Array of strings for item names
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const QuotationSchema = new mongoose.Schema({
  quotation_no: {
    type: String,
    required: true
  },
  quotation_date: {
    type: Date,
    required: true
  },
  valid_date: {
    type: Date,
    required: true
  },
  quotation_for: {
    type: String,
    required: true
  },
  items: {
    type: [ItemSchema], // Array of item sub-documents
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});


 const Quotation = mongoose.models.quotation || mongoose.model("quotation", QuotationSchema);
 export default Quotation