"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'
import { resetPassword } from '@/redux/slices/authSlice';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import imageLogin from "@/assets/images/imageLogin.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Page = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const resetPasswordStatus = useSelector(state => state.auth.resetPasswordStatus);
    const error = useSelector(state => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
            toast.error("Password field cannot be empty");
            return;
        }
        if (token) {
            try {
                await dispatch(resetPassword({ token, password }));
                if (resetPasswordStatus === 'succeeded') {
                    toast.success("Password reset successfully!");
                }
            } catch (error) {
                toast.error("Failed to reset password");
            }
        } else {
            console.error("Token is missing");
        }
    };

    return (
        <>
        <Suspense>
            <ToastContainer />
            <section className="text-gray-600 body-font h-screen overflow-hidden flex items-center justify-center">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap items-center">
                    <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative h-full">
                        <div className='w-full h-full'>
                            <Image
                                src={imageLogin}
                                objectFit="cover"
                                className='hidden md:block rounded-3xl border'
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-12 mt-8 md:mt-0">
                        <h2 className="text-gray-900 text-3xl mb-3 font-semibold title-font">Reset your password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="New Password"
                                        required
                                        className="w-full bg-white rounded border border-gray-300 focus:border-dashboard focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? <HiEyeOff className="text-gray-500" /> : <HiEye className="text-gray-500" />}
                                    </button>
                                </div>
                            </div>
                            <button className="text-white bg-dashboard border-0 py-2 px-6 md:w-[50%] focus:outline-none rounded-3xl text-lg"
                                type="submit"
                                disabled={resetPasswordStatus === 'loading'}
                            >
                                {resetPasswordStatus === "loading" ?
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
                        </form>
                    </div>
                </div>
            </section>
            </Suspense>
        </>
    );
};

export default Page;
