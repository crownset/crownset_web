import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='mt-10 flex flex-col md:flex-row justify-center items-center gap-10'>
            <Link href="/admin/generate-pdf/invoice">
                <button type="submit" className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-3xl text-sm w-[15rem]  px-5 py-2.5 text-center font-semibold">
                    Invoice
                </button>
            </Link>
            <Link href="/admin/generate-pdf/quotation">
                <button type="submit" className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm w-[15rem]  px-5 py-2.5 text-center font-semibold">
                    Quotation
                </button>
            </Link>


        </div>
    )
}

export default page
