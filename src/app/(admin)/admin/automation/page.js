"use client"
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { sendMailData } from '@/redux/slices/automationSlice';

const Page = () => {
    const [mailData, setMailData] = useState([]);
    const dispatch = useDispatch();
    const { isLoading, isSuccess } = useSelector((state) => state.automation);

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.SheetNames[0];
            const sheet = workbook.Sheets[worksheet];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log("jsonDAta==>", jsonData);

            if (jsonData.length === 0) {
                toast.error('You have no data in the file');
                return;
            }

            setMailData(jsonData);
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

    const handleSend = () => {
        if (mailData.length === 0) {
            toast.error('You have no data to send');
            return;
        }
        dispatch(sendMailData(mailData));
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div className='bg-navbar shadow-lg rounded-2xl flex flex-col h-[50%] w-[90%] md:h-[60%]'>
                <div className='flex flex-col text-sm px-3 py-3 mt-5 md:mt-5 md:ml-10'>
                    <p className='font-semibold'>Upload an Excel file</p>
                    <p>Make sure the file includes name, email, and phone number</p>
                </div>
                <div className='border-dashed border-2 border-dashboard w-[90%] m-auto h-[7rem] md:h-[15rem] rounded-lg' {...getRootProps()}>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div>
                            <IoCloudUploadOutline className='h-10 w-10' />
                        </div>
                        <div className='text-sm'>
                            <p>File with up to 10,000 rows works best</p>
                        </div>
                    </div>
                </div>
                <div className='text-end md:relative md:mb-5'>
                    <button onClick={handleSend} disabled={isLoading}>
                        {isLoading ? (
                            <div className="loader"></div>
                        ) : (
                            <MdSend className='text-dashboard h-8 w-8 md:h-10 md:w-10 mr-[1rem] mt-2 md:mt-[5px] md:mr-[3.5rem]' />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
