import { NextResponse } from 'next/server';

import { dbConnect } from "@/helpers/db";
import Quotation from '@/modelCS/quotation'; // Assuming your Quotation model is in models folder


export async function POST(request) {
  await dbConnect(); // Ensure DB connection

  // Parse the request body
  const { quotation_no, quotation_date, valid_date, quotation_for, items, total } = await request.json();

  // Validation checks
  const errors = [];

  if (!quotation_no) errors.push({ field: 'quotation_no', message: 'Quotation number is required' });
  if (!quotation_date || !Date.parse(quotation_date)) errors.push({ field: 'quotation_date', message: 'Invalid or missing quotation date' });
  if (!valid_date || !Date.parse(valid_date)) errors.push({ field: 'valid_date', message: 'Invalid or missing valid date' });
  if (!quotation_for) errors.push({ field: 'quotation_for', message: 'Quotation for is required' });

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push({ field: 'items', message: 'At least one item is required' });
  } else {
    items.forEach((item, index) => {
      if (!item.name || !Array.isArray(item.name) || item.name.length === 0) {
        errors.push({ field: `items[${index}].name`, message: 'Item name is required and must be an array' });
      }
      if (!item.quantity || isNaN(item.quantity)) {
        errors.push({ field: `items[${index}].quantity`, message: 'Item quantity must be a valid number' });
      }
      if (!item.rate || isNaN(item.rate)) {
        errors.push({ field: `items[${index}].rate`, message: 'Item rate must be a valid number' });
      }
      if (!item.amount || isNaN(item.amount)) {
        errors.push({ field: `items[${index}].amount`, message: 'Item amount must be a valid number' });
      }
    });
  }

  if (total === undefined || isNaN(total)) errors.push({ field: 'total', message: 'Total must be a valid number' });

  // Return validation errors if any
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    // Create a new Quotation document
    const newQuotation = new Quotation({
      quotation_no,
      quotation_date: new Date(quotation_date),
      valid_date: new Date(valid_date),
      quotation_for,
      items,
      total,
    });

    // Save the quotation to the database
    await newQuotation.save();

    return NextResponse.json({ message: 'Quotation created successfully', quotation: newQuotation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quotation', details: error.message }, { status: 500 });
  }
}
