"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgetPassword } from '@/redux/slices/authSlice';
import { BeatLoader } from 'react-spinners';
import imageLogin from "@/assets/images/imageLogin.png"
import Image from 'next/image';

const Page = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState(false);
    const dispatch = useDispatch();
    const { forgotPasswordStatus, error, successMessage } = useSelector((state) => state.auth);

    

    useEffect(() => {
        if (forgotPasswordStatus === 'succeeded') {
            toast.success(successMessage || 'Password reset email sent successfully!');
        } else if (forgotPasswordStatus === 'failed') {
            toast.error(error || 'An error occurred. Please try again.');
        }
    }, [forgotPasswordStatus, error, successMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (email.trim() === "") {
            setErrors(true);
            return;
        }
        setErrors(false);
        try {
            await dispatch(forgetPassword(email));
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer />
            <section className="text-gray-600 body-font h-screen overflow-hidden flex items-center justify-center">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap items-center">
                    <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative h-full">
                        <div className='w-full h-full'>
                            <Image
                                src={imageLogin}
                                objectFit="cover"
                                className='hidden md:block rounded-3xl border'
                                alt="Login Image"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-12 mt-8 md:mt-0">
                        <h2 className="text-gray-900 text-3xl mb-3 font-semibold title-font">Forgot Your Password ?</h2>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full bg-white rounded border border-gray-300 focus:border-dashboard focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            {errors && !email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>

                        <button className="text-white bg-dashboard border-0 py-2 px-6 md:w-[50%] focus:outline-none rounded-3xl text-lg"
                            type="button"
                            onClick={handleSubmit}
                            disabled={forgotPasswordStatus === 'loading'}
                        >
                            {forgotPasswordStatus === 'loading' ?
                                (
                                    <BeatLoader
                                        color={"#FFFFFF"}
                                        size={10}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                )
                                : 'Continue'}
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Page;
