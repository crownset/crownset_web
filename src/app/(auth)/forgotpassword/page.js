"use client"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgetPassword } from '@/redux/slices/authSlice';
import { ClipLoader } from 'react-spinners';

const Page = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { forgotPasswordStatus, error, successMessage } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (forgotPasswordStatus === 'succeeded') {
    //         toast.success(successMessage);
    //     } else if (forgotPasswordStatus === 'failed') {
    //         toast.error(error);
    //     }
    // }, [forgotPasswordStatus, error, successMessage]);



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgetPassword(email));
        // if (forgotPasswordStatus === 'succeeded') {
        //     dispatch(forgetPassword(email));
        //     toast.success(successMessage);
        // } else if (forgotPasswordStatus === 'failed') {
        //     toast.error(error);
        // }
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <div className='md:linear-gradient md:w-[80%] border w-full py-10 rounded-3xl'>
                <div className="bg-white rounded-3xl px-10 py-10 border-shadow md:w-1/3 m-auto">
                    <form className="space-y-4 max-lg:m-auto" onSubmit={handleSubmit}>
                        <div>
                            <input
                                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <button
                                className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline hover:bg-[#805CEB]"
                                type="submit" disabled={forgotPasswordStatus === 'loading'}
                            >
                                {forgotPasswordStatus === 'loading' ? (
                                    <div className="flex justify-center mb-4">
                                        <ClipLoader color="#805CEB" size={35} />
                                    </div>
                                ) : (
                                    <span className="underline-from-left">Continue</span>
                                )}

                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Page;
