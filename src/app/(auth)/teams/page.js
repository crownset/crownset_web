"use client";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/redux/slices/authSlice';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { BeatLoader, ClipLoader } from 'react-spinners';
import imageLogin from "@/assets/images/loginConfirm.png"
import Image from 'next/image';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Page = () => {
  const [isForgot, setIsforgot] = useState(false);
  const [credentials, setCredentials] = useState({ eid: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, status, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false)

  const handleToggle = () => {
    setIsforgot(!isForgot);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const newErrors = {};
      if (!credentials?.eid) {
        newErrors.eid = 'eid is required';
      } else if (!credentials?.password) {
        newErrors.password = 'Password is required';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      const result = await dispatch(loginUser(credentials));
    //  console.log("resultLogin>>>>>", result)
      const token = Cookies.get('authToken:');
      if (token) {
        router.push("/admin");
        toast.success("successfully login")
      } else {
        toast.error("Failed to login");
      }
    } catch (error) {
      toast.error("Failed to login");
    } finally {
      setLoading(false);
    }
  };


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
      <section className="text-gray-600 body-font h-screen overflow-hidden flex items-center justify-center">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap items-center">
          <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative h-full">
            <div className='w-full h-full'>
              <Image
                src={imageLogin}
                objectFit="cover"
                // height="80%"
                className='hidden md:block rounded-3xl'
                alt="login"
              />
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-12 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-3xl mb-3 font-semibold title-font">Login</h2>
            {/* <p className="leading-relaxed mb-5 text-gray-600 text-sm">
              Already have an account?{' '}
              <button className='border py-1 px-2 rounded-3xl text-center border-dashboard'>
                <span>Sign in</span>
              </button>
            </p> */}
            <div className='flex py-2  gap-5 items-center'>
              <p className="leading-relaxed  text-gray-600 text-sm">Already have an account?</p>
              {/* <button className='border py-1 px-2 rounded-lg text-center border-dashboard text-dashboard'>
                <span>Sign in</span>
              </button> */}
            </div>
            <div className="relative mb-4">
              <label htmlFor="eid" className="leading-10 text-sm text-gray-600 font-bold">EID</label>
              <input
                type="text"
                placeholder="eid"
                name="eid"
                value={credentials?.eid}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-dashboard focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors?.eid && <p className="text-red-500 text-sm">{errors?.eid}</p>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-10 text-sm text-gray-600 font-bold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={credentials?.password}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-dashboard focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0  top-8 flex items-center pr-3 mt-1"
              >
                {showPassword ? <HiEye className="text-gray-500" /> : <HiEyeOff className="text-gray-500" />}
              </button>
              {errors?.password && <p className="text-red-500 text-sm">{errors?.password}</p>}
            </div>



            <button className="text-white mt-5 bg-dashboard border-0 py-2 px-6  focus:outline-none rounded-lg text-lg"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {status === "loading" ?
                (
                  <BeatLoader
                    color={"#FFFFFF"}
                    loading={loading}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )
                : 'Login'}
            </button>
            <button className='text-center mt-5 text-sm py-1 px-1 mb-2 font-bold'>
              <Link href="/forgotpassword">
                <p>Forgot Password</p>
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page;
