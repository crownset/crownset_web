"use client"
import Divider from '@/components/Divider';
import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { ContactAddressCard, contactAddressCard } from '@/components/Cards';
import * as Icon from "../../helpers/icons"
import Image from 'next/image';
import Select from 'react-dropdown-select';


const Page = () => {
    const [service, setServiceValue] = useState(null)
    const addressData = [
        { id: 1, address: '127, Tower B, Logix Texhnova, Sector 132, Noida'},
        { id: 2, address: 'Eleanor dr, Bloomington IL 61701(USA)'},
        // { id: 3, address: 'Boston 1660 Dodgig Place', phoneNumber: "230-320-4040" },
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
            name:"IT Services"
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
                    <div className='flex flex-col gap-2 lg:flex-row lg:items-center lg:pt-8'>
                        <div className='lg:flex lg:items-center lg:gap-5'>
                            <div>
                                <Image src={Icon.location_icon} height={60} width={60} className='bg-[#f7f7fa] py-3 px-3 rounded-full' alt=""/>
                            </div>
                            <div>
                                <ul>
                                    <li className='font-medium text-xl lg:w-1/2'>
                                        915 Broadway Ste 501, New York, NY 10010
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <p className='font-medium cursor-pointer'>VIEW ON MAP</p>
                        </div>
                    </div>
                </div>
                <div className=" bg-white rounded-3xl px-10 py-10 mt-10 mb-10 border-shadow md:w-1/3">
                    <form className="space-y-4 max-lg:m-auto">
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Name"
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Email"
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <Select
                            options={options}
                            placeholder="Select Service"
                            labelField="name"
                            valueField="id"
                            onChange={(values) => setServiceValue(values)}
                            className='h-[3rem] rounded-[4rem]'
                        />;
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="tel"
                                placeholder="Phone Number"
                            />
                        </div>
                        <div>
                            <textarea
                                className="border mb-4 rounded-xl w-full h-[7rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                placeholder="what can we help you?"
                            />
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <button
                                className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline hover:bg-[#805CEB]"
                                type="button"
                            >
                                <span className='underline-from-left'>
                                    GET IN TOUCH
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
        </>

    )
}

export default Page
