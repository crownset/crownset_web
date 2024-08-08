"use client";
import React, { useEffect, useState } from 'react'
import { MdEmail as EmailIcon } from "react-icons/md";
import { FaLock as LockIcon } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/redux/slices/authSlice';
import Link from 'next/link';

const Page = () => {
  const [isForgot, setIsforgot] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const { user, status, error } = useSelector((state) => state.auth)
  console.log("loginUserResponse=>", user)
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleToggle = () => {
    setIsforgot(!isForgot);
  }

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
    console.log("loginUser===>", loginUser)
  }

  useEffect(() => {
    if (user) {
      router.push("/admin")
    }
  }, [user])

  return (
    <>
      {/* {
        isForgot ? <>

          <div className=' border border-bodyTextColor rounded-[2rem] h-screen flex justify-center items-center
        my-4 mx-3' >

            <div className='flex flex-col justify-center items-center  gap-5  py-3 px-2'>

              <h1 className='text-[1.8rem] font-bold'>Forgot Password</h1>
              <form className=' flex flex-col justify-center items-center gap-5 py-2 px-3 w-full'>

                <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                  <span><EmailIcon className='text-[1.2rem] text-primary-color' /></span>
                  <input type="email" placeholder='Enter your email'
                    className='text-[1.3rem] outline-none' />
                </div>

                <div className='flex justify-end items-end  w-full'>
                  <button className='text-primary-color' onClick={handleToggle}>Login?</button>

                </div>

                <button className='bg-black text-white px-2 py-1 rounded-[2rem] w-full text-[1.3rem]
            '>Submit</button>
              </form>

            </div>
          </div>

        </> : (
          <>
            <div className=' border border-bodyTextColor rounded-[2rem] h-screen flex justify-center items-center
        my-4 mx-3' >

              <div className='flex flex-col justify-center items-center  gap-5  py-3 px-2'>

                <h1 className='text-[1.8rem] font-bold'>Login</h1>
                <form className=' flex flex-col justify-center items-center gap-5 py-2 px-3 w-full'>

                  <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                    <span><EmailIcon className='text-[1.2rem] text-primary-color' /></span>
                    <input
                      type="email"
                      placeholder='Email'
                      name='email'
                      value={credentials.email}
                      onChange={handleChange}
                      className='text-[1.3rem] outline-none'
                    />
                  </div>

                  <div className='border-b border-b-primary-color  w-full flex justify-center items-center px-[0.5rem]'>
                    <span><LockIcon className='text-[1.2rem] text-primary-color' /></span>
                    <input
                      type="password"
                      placeholder='Password'
                      name='password'
                      value={credentials.password}
                      onChange={handleChange}
                      className='text-[1.3rem] outline-none' />
                  </div>

                  <div className='flex justify-end items-end  w-full'>
                    <button className='text-primary-color' onClick={handleToggle}>Forgot Password?</button>

                  </div>

                  <button className='bg-black text-white px-2 py-1 rounded-[2rem] w-full text-[1.3rem]' onClick={handleSubmit}>Login</button>
                </form>

              </div>
            </div>
          </>
        )
      } */}
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className='md:linear-gradient md:w-[80%] border     w-full py-10 rounded-3xl'>
          <div className="bg-white rounded-3xl px-10 py-10 border-shadow md:w-1/3  m-auto">
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
                >
                  <span className="underline-from-left">Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>



    </>
  )
}

export default Page