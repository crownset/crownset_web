import puppeteer from 'puppeteer';
import ejs from 'ejs';
import path from 'path';
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
        // const total = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

        const templatePath = path.join(process.cwd(), 'src', 'views', 'invoice.ejs');
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

        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: true, // For debugging, set to false
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Useful for certain environments
        });

        const page = await browser.newPage();

        // Set higher navigation timeout (60 seconds)
        await page.setDefaultNavigationTimeout(60000);

        // Set page content and wait for network to stabilize
        await page.setContent(html, { waitUntil: 'networkidle2' });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        // Close browser
        await browser.close();

        // Send PDF back to client
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=qoutation.pdf',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse('Failed to generate PDF', { status: 500 });
    }
}
