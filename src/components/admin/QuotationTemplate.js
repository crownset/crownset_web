// components/QuotationTemplate.js
"use client";
import Image from 'next/image';
import React from 'react';
import logo from "../../assets/images/logo.png"

const QuotationTemplate = React.forwardRef(({ formData, visible }, ref) => {
  console.log("formData>>>>", formData)
  return (
    <div ref={ref} className="container" style={{ display: visible ? 'block' : 'none' }}>
      <table style={{ border: '1px solid white', borderCollapse: 'collapse', width: '1000px', margin: 'auto' }}>
        <tr>
          <td style={{ fontSize: '20px', margin: 0, border: '1px solid white', marginBottom: "15px" }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '25px', color: '#6c46e4', paddingBottom: "10px" }}>
              Quotation
            </h1>
            <div style={{ display: 'flex' }}>
              <ul>
                <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: "10px" }}>Quotation No #</li>
                <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: "10px" }}>Quotation Date </li>
                <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: "10px" }}>Valid Till Date</li>
              </ul>
              <ul>
                <li style={{ listStyle: 'none', fontSize: '12px', fontWeight: 'bold', paddingBottom: "10px" }}>{formData.quotation_no}</li>
                <li style={{ listStyle: 'none', fontSize: '12px', fontWeight: 'bold', paddingBottom: "10px" }}> {formData.quotation_date}</li>
                <li style={{ listStyle: 'none', fontSize: '12px', fontWeight: 'bold', paddingBottom: "10px" }}>{formData.valid_date}</li>
              </ul>
            </div>
          </td>
          <td style={{ fontSize: '15px', margin: 0, border: '1px solid white' }} colSpan="2">
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%', padding: '10px' }}>
              <Image src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
            </div>
          </td>
        </tr>
      </table>
      <table style={{ border: '1px solid white', borderCollapse: 'collapse', width: '1000px', margin: 'auto' }}>
        <tr>
          <td style={{ fontSize: '15px', margin: 0, border: '1px solid white', backgroundColor: '#c9bbf5', width: '50%', padding: "5px", borderRadius: "20px" }}>
            <ul>
              <li style={{ listStyle: 'none', fontSize: '20px', paddingBottom: '5px', color: '#6c46e4', fontWeight: 'bold' }}>
                Quotation From
              </li>
              <li style={{ listStyle: 'none', fontSize: '15px', fontWeight: 'bolder', paddingBottom: '5px' }}>Crownset Marketing Agency</li>
              <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: '5px' }}>127, Tower B, Logix Technova, Sector 132, Noida</li>
              <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: '5px' }}>Utter Pradesh, India - 201304</li>
            </ul>
          </td>
          <td style={{ fontSize: '15px', margin: 0, border: '1px solid white', backgroundColor: '#c9bbf5', width: '50%', padding: "5px", borderRadius: "20px" }}>
            <ul>
              <li style={{ listStyle: 'none', fontSize: '20px', paddingBottom: '5px', color: '#6c46e4', fontWeight: 'bold' }}>
                Quotation For
              </li>
              <li style={{ listStyle: 'none', fontSize: '12px', fontWeight: 'bolder', paddingBottom: '5px' }}>{formData.quotation_for}</li>
              <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: '5px' }}>India</li>
            </ul>
          </td>
        </tr>
      </table>

      <table style={{ border: '0.25px solid black', borderCollapse: 'collapse', width: '1000px', margin: 'auto', marginTop: '10px', borderRadius: "10px" }}>
        <tr>
          <td style={{ fontSize: '20px', margin: 0, backgroundColor: '#6c46e4', color: 'white', padding: "5px" }}>Item</td>
          <td style={{ fontSize: '20px', margin: 0, textAlign: 'center', backgroundColor: '#6c46e4', color: 'white', padding: "5px" }}>Quantity</td>
          <td style={{ fontSize: '20px', margin: 0, textAlign: 'center', backgroundColor: '#6c46e4', color: 'white', padding: "5px" }}>Rate</td>
          <td style={{ fontSize: '20px', margin: 0, textAlign: 'center', backgroundColor: '#6c46e4', color: 'white', padding: "5px" }}>Amount</td>
        </tr>
        {formData.items.map((item, index) => (
          <tr key={index}>
            <td style={{ fontSize: '15px', margin: 0 }}>
              <ul>
                {item.name.map((name, idx) => <li key={idx}>{name}</li>)}
              </ul>
            </td>
            <td style={{ fontSize: '15px', margin: 0, textAlign: 'center' }}>{item.quantity}</td>
            <td style={{ fontSize: '15px', margin: 0, textAlign: 'center' }}>₹ {item.rate}</td>
            <td style={{ fontSize: '15px', margin: 0, textAlign: 'center' }}>₹ {item.amount}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3" style={{ fontSize: '15px', margin: 0, color: 'black', fontWeight: 'bold', textAlign: "right" }}>Total Amount</td>
          <td style={{ fontSize: '15px', margin: 0, textAlign: 'center', color: 'black', fontWeight: '600' }}>
            ₹ {formData.items.reduce((total, item) => total + parseFloat(item.amount || 0), 0).toFixed(2)}
          </td>
        </tr>
      </table>

      <table style={{ border: '1px solid white', borderCollapse: 'collapse', width: '1000px', margin: 'auto', marginTop: '5px' }}>
        <tr>
          <td style={{ fontSize: '15px', margin: 0, color: 'black', paddingBottom: "10px" }}>
            This is an electronically generated document, no signature required.
          </td>
        </tr>
      </table>
    </div>
  );
});

QuotationTemplate.displayName = "QuotationTemplate";

export default QuotationTemplate;
