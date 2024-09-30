// components/InvoiceTemplate.js

import React from 'react';
import {logo} from '@/helpers/constant'
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
                <Image src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginRight: '10px', backgroundColor: 'white', borderRadius: '5px', textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }} width={100} height={100}/>
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
              <div style={{ display: 'flex', borderTop: '1px solid white' , gap:"15px", marginLeft:"5px" }}>
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
          border: '1px solid #0d78aa',
          borderCollapse: 'collapse',
          width: '1000px',
          margin: 'auto',
          marginTop: '10px',
          
        }}
      >
        <thead>
          <tr style={{ padding: '5px', borderRadius: '10px' ,height:"55px"}}>
            {/* <td style={{ fontSize: '20px', margin: '0', fontWeight: 'bold', backgroundColor: '#c0dfff', color: '#0a549d' }}>
              
            </td> */}
            <td style={{ fontSize: '20px', fontWeight: 'bold', backgroundColor: '#c0dfff', color: '#0a549d' ,textAlign: 'center'}}>
              S.No.
            </td>
            <td style={{ fontSize: '20px', fontWeight: 'bold', backgroundColor: '#c0dfff', color: '#0a549d' ,textAlign: 'center'}}>
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
            <tr key={index} >
              <td style={{ fontSize: '18px', marginBottom:"20px",textAlign: 'center',paddingBottom: '20px'}}>
                {index + 1}. 
              </td>
              <td style={{ fontSize: '18px',marginBottom:"20px",textAlign: 'center',paddingBottom: '20px'}}>
                 {item.name}
              </td>
              <td style={{ fontSize: '18px', marginBottom:"20px", textAlign: 'center' ,paddingBottom: '20px'}}>
                {item.quantity}
              </td>
              <td style={{ fontSize: '18px', marginBottom:"20px", textAlign: 'center' ,paddingBottom: '20px'}}>
                ₹ {item.rate}
              </td>
              <td style={{ fontSize: '18px',marginBottom:"20px", textAlign: 'center',paddingBottom: '20px' }}>
                ₹ {calculateAmount(item.quantity, item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table
        style={{
          border: '1px solid white',
          borderCollapse: 'collapse',
          width: '1000px',
          margin: '10px auto',
          borderRadius: '10px',
        }}
      >
        <tbody>
          <tr>
            <td style={{ fontSize: '18px', margin: '0' }}>
              <div style={{ display: 'flex' }}>
                <ul style={{ padding: '0' }}>
                  {['Account Name', 'Account Number', 'IFSC', 'Account Type', 'Bank'].map((item) => (
                    <li
                      key={item}
                      style={{
                        listStyle: 'none',
                        fontSize: '15px',
                        color: 'black',
                        paddingBottom: '5px',
                        fontWeight: '100',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <ul style={{ padding: '0', marginLeft: '20px' }}>
                  <li  style={{listStyle:"none", fontWeight:"bold", fontSize:"15px", color:"black", paddingBottom:"5px"}}>
                    Crownset Marketing Agency</li>
                  <li
                    style={{listStyle:"none", fontWeight:"bold", fontSize:"15px", color:"black", paddingBottom:"5px"}}>
                    073661900000619</li>
                  <li
                    style={{listStyle:"none", fontWeight:"bold", fontSize:"15px", color:"black", paddingBottom:"5px"}}>
                    YESB0000736</li>
                  <li
                    style={{listStyle:"none", fontWeight:"bold", fontSize:"15px", color:"black", paddingBottom:"5px"}}>
                    Current</li>
                  <li
                    style={{listStyle:"none", fontWeight:"bold", fontSize:"15px", color:"black", paddingBottom:"5px"}}>
                    Yes Bank</li>
                </ul>
              </div>
            </td>
            <td style={{ fontSize: '18px', margin: '0', textAlign: 'center' }}>
              <div style={{display:"flex", justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}}>
                <ul style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '0' }}>
                  <li style={{ listStyle: 'none', fontSize: '15px', color: 'black', paddingBottom: '5px' }}>
                    Reductions
                  </li>
                  <li
                    style={{
                      listStyle: 'none',
                      fontSize: '15px',
                      color: 'black',
                      paddingBottom: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                     ₹{formData?.reductions}
                  </li>
                </ul>
                <ul
                  style={{
                    backgroundColor: '#3a95ef',
                    width: '300px',
                    padding: '10px 8px',
                    display: 'flex',
                   
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                    borderRadius: '10px',
                    gap: '10px',
                    
                  }}
                >
                  <li style={{ listStyle: 'none', fontSize: '18px', color: 'white' , }}>Total (INR)</li>
                  <li
                    style={{
                      listStyle: 'none',
                      fontSize: '18px',
                      color: 'white',
                      fontWeight: 'bold',
                      
                    }}
                  >
                    ₹{formData?.total}
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table
            style={{border:"1px solid white", borderCollapse:"collapse", width:"1000px", margin:"auto", marginTop:"5px", borderRadius:"10px"}}>
            <tr style={{padding:"5px"}}>
                <td style={{fontSize:"15px", margin:"0px", color:"black"}}>
                    <ul style={{width:"50%", display:"flex", flexDirection:"column", gap:"10px"}}>
                        <li style={{listStyle:"none", fontSize:"15px", color:"#3a95ef", paddingBottom:"5px"}}>TERMS AND CONDITIONS</li>
                        <li style={{listStyle:"none", fontSize:"15px", fontWeight:"500", color:"black", paddingBottom:"5px"}}>{formData?.term_conditions}</li>
                    </ul>
                </td>
            </tr>  
            </table>
    </div>
  );
});

InvoiceTemplate.displayName = "InvoiceTemplate";

export default InvoiceTemplate;
