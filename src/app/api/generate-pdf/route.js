
import html_to_pdf from 'html-pdf-node';

export async function POST(req,res) {
    const { name, email, message } = req.body;

    // Define the HTML template with dynamic fields
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
            }
            h1 {
              color: #4CAF50;
            }
            p {
              font-size: 16px;
            }
            .info {
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Generated PDF</h1>
          <div class="info">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          <div class="message">
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        </body>
      </html>
    `;

    // Create the PDF file
    let file = { content: htmlContent };

    try {
        // Generate the PDF
        const pdfBuffer = await html_to_pdf.generatePdf(file, { format: 'A4' });

        // Set the response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
}