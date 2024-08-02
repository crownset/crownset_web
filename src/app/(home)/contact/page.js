"use client"
import Divider from '@/components/Divider';
import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { ContactAddressCard, contactAddressCard } from '@/components/Cards';
import * as Icon from "@/helpers/icons"
import Image from 'next/image';
import Select from 'react-dropdown-select';
import { useDispatch, useSelector } from 'react-redux';
import { postQuery } from "@/redux/slices/querySlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';


const Page = () => {
    const [service, setServiceValue] = useState(null)
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.data);
    const [queryCredential, setQueryCredential] = useState({ fullName: "", email: "", contact: "", businessName: "", queryContent: "", leadBy: "test lead" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setQueryCredential({ ...queryCredential, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    }
    const handleSubmit = async (e) => {
        console.log("sumbit===>")
        e.preventDefault();
        const newErrors = {};
        if (!queryCredential.fullName) {
            newErrors.fullName = 'This field is required';
        } else if (!queryCredential.email) {
            newErrors.email = 'This field is required';
        } else if (!queryCredential.businessName) {
            newErrors.businessName = 'This field is required';
        } else if (!queryCredential.contact) {
            newErrors.contact = 'This field is required';
        } else if (!queryCredential.queryContent) {
            newErrors.queryContent = 'This field is required';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        dispatch(postQuery(queryCredential))
            .unwrap()
            .then(() => {
                setQueryCredential({
                    fullName: "",
                    email: "",
                    businessName: "",
                    contact: "",
                    queryContent: "",
                    leadBy: "test lead"
                });
                toast.success("your form is submitted successfully");
            })
            .catch(() => {
                toast.error("There was an error saving your query.");
            });
    }
    const addressData = [
        { id: 1, address: '127, Tower B, Logix Texhnova, Sector 132, Noida' },
        { id: 2, address: 'Eleanor dr, Bloomington IL 61701(USA)' },
    ];
    const options = [
        {
            id: 1,
            name: 'Digital Marketing'
        },
        {
            id: 2,
            name: 'Social Media Marketing'
        },
        {
            id: 3,
            name: "Business Solutions"
        },
        {
            id: 4,
            name: "IT Services"
        }
    ];
    return (
        <>
            <div className='flex flex-col  md:items-center md:justify-center py-5 px-5 linear-gradient md:flex-row'>
                <div className='md:w-1/2'>
                    <div className='flex flex-col gap-4'>
                        <p className='font-bold text-lg text-black'>CONTACT</p>
                        <h1 className='font-extrabold text-4xl text-black lg:text-6xl lg:w-1/2'>We re here to help you grow</h1>
                        <p className='font-bold text-base lg:text-xl lg:w-3/4'>Feel free to reach out to us through your preferred method of contact. We are eager to connect with you and explore how our digital marketing team can contribute to your success.</p>
                    </div>
                    <div className='flex flex-col gap-5 py-10 lg:flex-row  lg:gap-28 '>
                        <div className='flex flex-col gap-1'>
                            <ul>
                                <li>Phone number</li>
                                <li className='font-semibold text-base underline-from-left cursor-pointer'>888-400-5050</li>
                            </ul>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <ul>
                                <li>Email address</li>
                                <li className='font-semibold text-base underline-from-left cursor-pointer'>contact@thecrownset.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2  lg:flex-row lg:items-center lg:pt-8'>
                        <div className='lg:flex lg:items-center'>
                            <div>
                                <Image src={Icon.location_icon} height={60} width={60} className='bg-[#f7f7fa] py-3 px-3 rounded-full' alt="" />
                            </div>
                            <div>
                                <ul>
                                    <li className='font-medium text-lg lg:w-1/2'>
                                    127, Tower B, Logix Texhnova, Sector 132, Noida
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p className='font-medium cursor-pointer '>VIEW ON MAP</p>
                        </div>
                    </div>
                </div>
                <div className=" bg-white rounded-3xl px-10 py-10 mt-10 mb-10 border-shadow md:w-1/3">
                    <form className="space-y-4 max-lg:m-auto">
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name='fullName'
                                type="text"
                                placeholder="Name"
                                value={queryCredential?.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </div>
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name='email'
                                type="text"
                                placeholder="Email"
                                value={queryCredential?.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name='businessName'
                                type="text"
                                placeholder="Business Name"
                                value={queryCredential?.businessName}
                                onChange={handleChange}
                            />
                            {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}
                        </div>
                        {/* <Select
                            options={options}
                            placeholder="Select Service"
                            labelField="name"
                            valueField="id"
                            onChange={(values) => setServiceValue(values)}
                            className='h-[3rem] rounded-[4rem]'
                        /> */}
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name='contact'
                                type="number"
                                maxLength={10}
                                placeholder="Phone Number"
                                value={queryCredential?.contact}
                                onChange={handleChange}
                            />
                            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                        </div>
                        <div>
                            <textarea
                                className="border mb-4 rounded-xl w-full h-[7rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name='queryContent'
                                placeholder="What can we help you with?"
                                value={queryCredential?.queryContent}
                                onChange={handleChange}
                            />
                            {errors.queryContent && <p className="text-red-500 text-sm">{errors.queryContent}</p>}
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <button
                                className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline hover:bg-[#805CEB]"
                                type="button"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                <span className='underline-from-left'>
                                    {loading ?
                                        (
                                            <ClipLoader
                                                color={"#FFFFFF"}
                                                loading={loading}
                                                size={10}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        )
                                        : 'GET IN TOUCH'}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Divider />
            <div className='py-5 px-5'>
                <div>
                    <h1 className='text-3xl font-bold  lg:pl-[5rem]'>Locations</h1>
                </div>
                <div className='md:grid md:grid-cols-2 gap-3 md:w-11/12 md:m-auto'>
                    {
                        addressData.map((data) => (
                            <ContactAddressCard key={data.id} address={data.address} phoneNumber={data.phoneNumber} icon={Icon.location_icon} />
                        ))
                    }
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default Page
