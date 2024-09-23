// components/InvoiceTemplate.js

import React from 'react';
import logo from "../../assets/images/crownsetfinalGRADIENT.png";
import Image from 'next/image';

const InvoiceTemplate = React.forwardRef(({ formData, visible }, ref) => {
  const calculateAmount = (quantity, rate) => {
    return quantity * rate;
  };

  return (
    <div ref={ref} className="container" style={{ display: visible ? 'block' : 'none' }}>
      <table
        style={{
          border: '1px solid white',
          backgroundColor: '#3a95ef',
          borderCollapse: 'collapse',
          width: '1000px',
          margin: 'auto',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        <thead>
          <tr>
            <th style={{ fontSize: '28px', fontWeight: '300', textAlign: 'left', paddingLeft: '10px' }}>
              Invoice
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style={{ height: '100%', padding: '10px', textAlign: 'center' }}>
                <Image src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginRight: '10px', backgroundColor: 'white', borderRadius: '5px' }} />
              </div>
            </td>
            <td>
              <ul>
                <li style={{ listStyle: 'none', fontSize: '25px', fontWeight: 'bold', color: 'white', paddingBottom: '10px' }}>
                  Crownset Marketing Agency
                </li>
                <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px' }}>
                  127, Tower B, Logix Technova, Sector 132, Noida,
                </li>
                <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px' }}>
                  Uttar Pradesh, India - 201304
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li style={{ listStyle: 'none', color: 'white', fontSize: '12px', paddingBottom: '5px', fontWeight: '100' }}>
                  BILLED TO
                </li>
                <li style={{ listStyle: 'none', fontWeight: 'bolder', fontSize: '20px', color: 'white', paddingBottom: '5px' }}>
                  {formData.bill_to}
                </li>
                <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                  {formData.district}, {formData.state},
                </li>
                <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                  Uttar Pradesh, India - {formData.gstin}
                </li>
                <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                  GSTIN: {formData.gstin}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td colSpan="3">
              <div style={{ display: 'flex', borderTop: '1px solid white' }}>
                <ul>
                  <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                    Invoice No #
                  </li>
                  <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                    {formData.invoice_no}
                  </li>
                </ul>
                <ul>
                  <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                    Invoice Date
                  </li>
                  <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                    {formData.invoice_date}
                  </li>
                </ul>
                <ul>
                  <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                    Due Date
                  </li>
                  <li style={{ listStyle: 'none', color: 'white', paddingBottom: '5px', fontWeight: '100' }}>
                    {formData.due_date}
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table
        style={{
          border: '1px solid white',
          borderCollapse: 'collapse',
          width: '1000px',
          margin: 'auto',
          marginTop: '10px',
          borderRadius: '10px',
        }}
      >
        <thead>
          <tr style={{ padding: '5px', borderRadius: '10px' }}>
            <td style={{ fontSize: '20px', margin: '0', fontWeight: 'bold', backgroundColor: '#c0dfff', color: '#0a549d' }}>
              Item
            </td>
            <td style={{ fontSize: '20px', margin: '0', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#c0dfff', color: '#0a549d' }}>
              Quantity
            </td>
            <td style={{ fontSize: '20px', margin: '0', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#c0dfff', color: '#0a549d' }}>
              Rate
            </td>
            <td style={{ fontSize: '20px', margin: '0', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#c0dfff', color: '#0a549d' }}>
              Amount
            </td>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index} style={{ padding: '10px' }}>
              <td style={{ fontSize: '18px', margin: '0' }}>
                {index + 1}. {item.name}
              </td>
              <td style={{ fontSize: '18px', margin: '0', textAlign: 'center' }}>
                {item.quantity}
              </td>
              <td style={{ fontSize: '18px', margin: '0', textAlign: 'center' }}>
                ₹ {item.rate}
              </td>
              <td style={{ fontSize: '18px', margin: '0', textAlign: 'center' }}>
                ₹ {calculateAmount(item.quantity, item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Additional tables and content can be added here */}
    </div>
  );
});

InvoiceTemplate.displayName = "InvoiceTemplate";

export default InvoiceTemplate;
