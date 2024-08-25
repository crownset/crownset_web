"use client";
import Divider from '@/components/Divider';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import * as Icon from "@/helpers/icons";
import { useDispatch, useSelector } from 'react-redux';
import { postQuery } from "@/redux/slices/querySlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import Select from 'react-dropdown-select';

const FreeAudit = () => {
  const dispatch = useDispatch();
  const [service, setServiceValue] = useState(null)
  const { loading, error , data} = useSelector((state) => state.data);
  const [queryCredential, setQueryCredential] = useState({ fullName: "", email: "", contact: "", businessName: "", queryContent: "", leadBy: "website", service: "" });
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    setQueryCredential({ ...queryCredential, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  }

  const handleSelectChange = (selected) => {
    setQueryCredential({ ...queryCredential, service: selected[0]?.name || '' });
    if (errors.service) {
      setErrors({ ...errors, service: '' });
    }
  }

  const handleSubmit = async (e) => {
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
          leadBy: ""
        });
        toast.success(data?.message);
      })
      .catch((error) => {
        toast.error("There was an error saving your query.");
        console.log(error)
      });
  }

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='flex flex-col  md:items-center md:justify-center py-5 px-5 linear-gradient md:flex-row'>
        <div className='md:w-1/2'>
          <div className='flex flex-col gap-4'>
            <p className='font-bold text-lg text-black'>FREE AUDIT</p>
            <h1 className='font-extrabold text-4xl text-black lg:text-6xl lg:w-1/2'>Ready to grow your revenue?</h1>
            <p className='font-bold text-base lg:w-3/4'>When you partner with Numerique, we take care of the heavy lifting, so you can enjoy more website traffic, leads, and revenue.</p>
          </div>
          <hr className="w-9/12 mt-5 mb-5" />
          <div className='flex flex-col gap-4 lg:w-9/12'>
            <div className='flex gap-2 lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg ' />
              </div>
              <div>
                <p className='text-black text-lg'>Review your marketing goals: Begin by reviewing your marketing goals and objectives.</p>
              </div>
            </div>
            <div className='flex items-start gap-2  lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg' />
              </div>
              <div>
                <p className='text-black text-lg'>Evaluate your target audience to see if they have changed or if you need to adjust your messaging to better reach them.</p>
              </div>
            </div>
            <div className='flex items-start gap-2  lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg' />
              </div>
              <div>
                <p className='text-black text-lg'>Analyze your website to ensure it is user-friendly, mobile-responsive, and optimized for search engines.</p>
              </div>
            </div>
            <div className='flex items-start gap-2  lg:gap-3'>
              <div>
                <FaCheckCircle className='text-[#6754e9] mt-2 lg:text-lg' />
              </div>
              <div>
                <p className='text-black text-lg'>Review your content marketing efforts, including your blog posts, social media, and email marketing.</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white rounded-3xl px-10 py-10 mt-10 mb-10 border-shadow md:w-1/3">
          <form className="space-y-4 max-lg:m-auto" onSubmit={handleSubmit}>
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
            <Select
              options={options}
              placeholder="Select Service"
              labelField="name"
              valueField="id"
              value={service}
              onChange={handleSelectChange}
              className='h-[3rem] rounded-[4rem]'
            />
            {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
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
                type="submit"
                disabled={loading}
              >
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
              </button>
            </div>
          </form>
        </div>
      </div>
      <Divider />
      
    </>
  );
}

export default FreeAudit;
