"use client"
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdSend } from "react-icons/md";

const page = () => {
    const [mailData, setMailData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.SheetNames[0];
            const sheet = workbook.Sheets[worksheet]
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log("jsonDAta==>", jsonData)
            const mailData = jsonData

            setMailData(mailData);
        };
        reader.readAsArrayBuffer(file);
    };

    const onDrop = (acceptedFiles) => {
        handleFile(acceptedFiles[0]);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFile(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleSend = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/automation/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ mailData }),
            });
            const result = await response.json();
            console.log("response", result)
            // Handle success/failure response
        } catch (error) {
            console.error('Error sending automation:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className='h-screen flex flex-col  justify-center items-center'>
            <div {...getRootProps()} className="bg-red-400">
                <input {...getInputProps()} />
                <p>Drag and drop an Excel file here, or click to select one</p>
            </div>
            <p>Or upload a file:</p>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <button onClick={handleSend} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send'}
            </button>
            <div className='bg-navbar shadow-lg rounded-2xl flex flex-col h-[50%] w-[90%] md:h-[60%]'>
                <div className='flex flex-col text-sm px-3 py-3 mt-5 md:mt-5 md:ml-10'>
                    <p className='font-semibold'>Upload a excel file</p>
                    <p>Make sure a file include name , email and phone number</p>
                </div>
                <div className='border-dashed border-2 border-dashboard w-[90%] m-auto h-[7rem] md:h-[15rem] rounded-lg' {...getRootProps()}>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div>
                            <IoCloudUploadOutline className='h-10 w-10' />
                        </div>
                        <div className='text-sm'>
                            <p>File with upto 10,000 rows works best</p>
                        </div>
                        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    </div>
                </div>
                <div className='text-end md:relative md:mb-5'>
                    <button onClick={handleSend} disabled={isLoading}>
                        <MdSend className='text-dashboard  h-8 w-8 md:h-10 md:w-10 mr-[1rem] mt-2 md:mt-[5px] md:mr-[3.5rem]' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
