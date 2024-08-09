"use client";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/redux/slices/authSlice';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';
const Page = () => {
  const [isForgot, setIsforgot] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, status, error } = useSelector((state) => state.auth);

  console.log("user==>", user)

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
      if (!credentials?.email) {
        newErrors.email = 'Email is required';
      } else if (!credentials?.password) {
        newErrors.password = 'Password is required';
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      const result = await dispatch(loginUser(credentials)).unwrap();
      console.log("result==>", result);
      const token = Cookies.get('authToken:');
      console.log('Token from cookies:', token);
      if (token) {
        router.push("/admin");
      } else {
        toast.error(user.message);
      }
    } catch (error) {
      toast.error(user?.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className='md:linear-gradient md:w-[80%] border w-full py-10 rounded-3xl'>
          <div className="bg-white rounded-3xl px-10 py-10 border-shadow md:w-1/3 m-auto">
            <form className="space-y-4 max-lg:m-auto">
              <div>
                <input
                  className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                {errors?.email && <p className="text-red-500 text-sm">{errors?.email}</p>}
              </div>
              <div>
                <input
                  className="border rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                {errors?.password && <p className="text-red-500 text-sm">{errors?.password}</p>}
              </div>
              <div className="text-end text-sm">
                <Link href="/forgotpassword">
                  <button>
                    <h1 className="text-bgHover">Forget Password?</h1>
                  </button>
                </Link>
              </div>
              <div className="flex items-center justify-between w-full">
                <button
                  className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline hover:bg-[#805CEB]"
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}// Disable button while loading
                >
                  {status === "loading" ?
                    (
                      <ClipLoader
                        color={"#FFFFFF"}
                        loading={loading}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    )
                    : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;
