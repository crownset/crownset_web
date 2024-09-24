import ejs from 'ejs';
import path from 'path';
import html_to_pdf from 'html-pdf-node';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const {
            bill_to,
            business_name,
            state,
            district,
            gstin,
            invoice_date,
            invoice_no,
            due_date,
            items,
            reductions,
            total,
            term_conditions
        } = await req.json();

        // Path to the EJS template
        const templatePath = path.join(process.cwd(), 'src', 'views', 'invoice.ejs');

        // Render the EJS template with the dynamic data
        const html = await ejs.renderFile(templatePath, {
            bill_to,
            business_name,
            state,
            district,
            gstin,
            invoice_date,
            invoice_no,
            due_date,
            reductions,
            total,
            items,
            term_conditions
        });

        // Prepare HTML content for PDF generation
        let file = { content: html };

        // Generate the PDF using html-pdf-node
        const pdfBuffer = await html_to_pdf.generatePdf(file, { format: 'A4', printBackground: true });

        // Return the PDF as a response
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="invoice.pdf"',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to generate PDF' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
