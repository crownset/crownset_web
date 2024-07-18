"use client";
import React from 'react';

const FreeAudit = () => {
  return (
    <div className="flex justify-center items-center min-h-screen linear-gradient p-4">
      <div className="flex w-full max-w-6xl space-x-8">
        {/* Content section */}
        <div className="flex flex-col justify-center w-1/2  px-8 pt-6 pb-8 mb-4">
          <div className="flex flex-col mb-4">
            <p className="text-xl pb-5">Free Audit</p>
            <h1 className="text-7xl font-extrabold pb-5">Ready to grow your revenue?</h1>
            <p className="text-xl pb-4">When you partner with Numerique, we take care of the heavy lifting, so you can enjoy more website traffic, leads, and revenue.</p>
          </div>
          <hr className="w-full mb-4" />
          <div className="space-y-4">
            <p className="text-base">Review your marketing goals: Begin by reviewing your marketing goals and objectives.</p>
            <p className="text-base">Evaluate your target audience to see if they have changed or if you need to adjust your messaging to better reach them.</p>
            <p className="text-base">Analyze your website to ensure it is user-friendly, mobile-responsive, and optimized for search engines.</p>
            <p className="text-base">Review your content marketing efforts, including your blog posts, social media, and email marketing.</p>
          </div>
        </div>

        {/* Form section */}
        <div className="w-1/2 bg-white  rounded-3xl px-8 pt-6 pb-8 mb-4 border-shadow">
          <h2 className="text-2xl font-bold mb-6">Get your free audit</h2>
          <form className="space-y-4">
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
            <div>
              <input
                className="border mb-4 rounded-xl w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Company-Name"
                type="email"
                placeholder="Company Name"
              />
            </div>
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
                className="border mb-4 rounded-xl w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Your message here..."
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline hover:bg-[#805CEB]"
                type="button"
              >
                <span className='underline-from-left'>
                  SEND ME A PROPOSAL
                </span>
              </button>
            </div>
          </form>
          <div className='w-12 h-12 absolute top-20 right-0 transform -translate-x-1/2 -translate-y-1/2 rotate-12'>
            <img src='https://thecrownset.com/wp-content/uploads/2023/05/GettyImages-1367732506-159x300.png' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeAudit;
