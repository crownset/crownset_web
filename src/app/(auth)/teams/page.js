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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(credentials))
      console.log("loginUser===>", loginUser)
      router.push("/admin")
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   if (user) {
  //     router.push("/admin")
  //   }
  // }, [user])

  return (
    <>
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