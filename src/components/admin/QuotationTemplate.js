"use client";
import Image from 'next/image';
import React from 'react';
import {logo} from '@/helpers/constant'

const QuotationTemplate = React.forwardRef(({ formData, visible }, ref) => {
    
    
    const calculateAmount = (item) => {
        return (item.quantity * item.rate).toFixed(2);
    };

    return (
        <div ref={ref} className="container" style={{ display: visible ? 'block' : 'none' }}>
            <table style={{ border: '1px solid white', borderCollapse: 'collapse', width: '1000px', margin: 'auto' }}>
                <tr>
                    <td style={{ fontSize: '20px', margin: 0, border: '1px solid white', marginBottom: "15px", width:"50%" }}>
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
                    <td style={{ fontSize: '15px', margin: 0, border: '1px solid white', width:"50%", }} colSpan="2">
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%', padding: '10px' }}>
                            <Image src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginRight: '10px' }} width={100} height={100} />
                        </div>
                    </td>
                </tr>
            </table>

            <table style={{ border: '1px solid white', borderCollapse: 'collapse', width: '1000px', margin: 'auto', marginTop:"20px" }}>
                <tr>
                    <td style={{ fontSize: '15px', margin: 0, border: '1px solid white', backgroundColor: '#F1ECF9', width: '40%', padding: "5px", borderRadius: "20px",marginRight: '10px' }}>
                        <ul style={{ marginLeft: '15px' }}>
                            <li style={{ listStyle: 'none', fontSize: '20px', paddingBottom: '5px', color: '#6c46e4', fontWeight: 'bold' }}>
                                Quotation From
                            </li>
                            <li style={{ listStyle: 'none', fontSize: '15px', fontWeight: 'bolder', paddingBottom: '5px' }}>Crownset Marketing Agency</li>
                            <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: '5px' }}>127, Tower B, Logix Technova, Sector 132, Noida</li>
                            <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: '5px' }}>Utter Pradesh, India - 201304</li>
                        </ul>
                    </td>
                    <td style={{ fontSize: '15px', margin: 0, border: '1px solid white', backgroundColor: '#F1ECF9', width: '40%', padding: "5px", borderRadius: "20px" }}>
                        <ul style={{ marginLeft: '15px', display:"flex", justifyContent:"start", flexDirection:"column", paddingBottom:"20px" }}>
                            <li style={{ listStyle: 'none', fontSize: '20px', paddingBottom: '5px', color: '#6c46e4', fontWeight: 'bold' }}>
                                Quotation For
                            </li>
                            <li style={{ listStyle: 'none', fontSize: '12px', fontWeight: 'bolder', paddingBottom: '5px' }}>{formData.quotation_for}</li>
                            <li style={{ listStyle: 'none', fontSize: '12px', paddingBottom: '5px' }}>India</li>
                        </ul>
                    </td>
                </tr>
            </table>

            <table style={{ border: '0.25px solid black', borderCollapse: 'collapse', width: '1000px', margin: 'auto', marginTop: '20px', borderRadius: "10px" }}>
                <tr>
                    <td style={{ fontSize: '20px', margin: 0, backgroundColor: '#6c46e4', color: 'white', padding: "5px", textAlign:"center" }}>S.No</td>
                    <td style={{ fontSize: '20px', margin: 0, backgroundColor: '#6c46e4', color: 'white' }}>Item</td>
                    <td style={{ fontSize: '20px', margin: 0, textAlign: 'center', backgroundColor: '#6c46e4', color: 'white', padding: "5px" }}>Quantity</td>
                    <td style={{ fontSize: '20px', margin: 0, textAlign: 'center', backgroundColor: '#6c46e4', color: 'white', padding: "5px" }}>Rate</td>
                    <td style={{ fontSize: '20px', margin: 0, textAlign: 'center', backgroundColor: '#6c46e4', color: 'white', padding: "5px" }}>Amount</td>
                </tr>
                {formData.items.map((item, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F1ECF9' : '#ffffff' }}>
                        <td style={{ fontSize: '15px', margin: 0, padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                        <td style={{ fontSize: '15px', margin: 0, padding: '10px' }}>
                            <ul>
                                {item.name.map((name, idx) => <li key={idx} style={{ paddingBottom: '5px' }}>{name}</li>)}
                            </ul>
                        </td>
                        <td style={{ fontSize: '15px', margin: 0, textAlign: 'center', padding: "5px" }}>{item.quantity}</td>
                        <td style={{ fontSize: '15px', margin: 0, textAlign: 'center', padding: "5px" }}>₹ {item.rate}</td>
                        <td style={{ fontSize: '15px', margin: 0, textAlign: 'center', padding: "5px" }}>₹ {calculateAmount(item)}</td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="4" style={{ fontSize: '15px', margin: 0, color: 'black', fontWeight: 'bold', textAlign: "right", padding: "5px" }}>Total Amount</td>
                    <td style={{ fontSize: '15px', margin: 0, textAlign: 'center', color: 'black', fontWeight: '600', padding: "5px" }}>
                        ₹ {formData.items.reduce((total, item) => total + parseFloat(calculateAmount(item)), 0).toFixed(2)}
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
