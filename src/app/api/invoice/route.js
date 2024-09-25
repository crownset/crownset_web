import { NextResponse } from 'next/server';

import { dbConnect } from "@/helpers/db";
import Invoice from '@/modelCS/invoice';


export async function POST(request) {
    await dbConnect();
  
    try {
      const {
        bill_to,
        term_conditions,
        state,
        district,
        gstin,
        invoice_date,
        invoice_no,
        due_date,
        reductions,
        items,
        total,
      } = await request.json();
  
      // Validate the request payload
      if (!bill_to || !state || !district || !gstin || !invoice_date || !invoice_no || !due_date || !items || !total) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const newInvoice = new Invoice({
        bill_to,
        term_conditions,
        state,
        district,
        gstin,
        invoice_date: new Date(invoice_date), // Convert to date
        invoice_no,
        due_date: new Date(due_date), // Convert to date
        reductions,
        items,
        total,
      });
  
      await newInvoice.save();
  
      return NextResponse.json({ message: 'Invoice created successfully', invoice: newInvoice }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create invoice', details: error.message }, { status: 500 });
    }
  }