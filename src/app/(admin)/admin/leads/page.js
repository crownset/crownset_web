"use client"
import querySlice, { fetchData } from '@/redux/slices/querySlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const page = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.data)

    console.log("data==>", data)

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    return (
        <div className="p-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Contact</th>
                    <th className="py-2 px-4 border-b">Business Name</th>
                    <th className="py-2 px-4 border-b">Query Content</th>
                    <th className="py-2 px-4 border-b">Lead By</th>
                    <th className="py-2 px-4 border-b">Edit</th>
                    <th className="py-2 px-4 border-b">Delete</th>
                    <th className="py-2 px-4 border-b">Remarks</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td className="py-2 px-4 border-b">{item.fullName}</td>
                        <td className="py-2 px-4 border-b">{item.email}</td>
                        <td className="py-2 px-4 border-b">{item.contact}</td>
                        <td className="py-2 px-4 border-b">{item.businessName}</td>
                        <td className="py-2 px-4 border-b">{item.remarks}</td>
                        <td className="py-2 px-4 border-b">{item.queryContent}</td>
                        <td className="py-2 px-4 border-b">{item.leadBy}</td>
                        <td className="py-2 px-4 border-b text-center">
                            <button className="text-blue-500">
                                <MdEdit className='h-6 w-6'/>
                            </button>
                        </td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-red-500 text-center">
                                <MdDelete className='h-6 w-6'/>
                            </button>
                        </td>
                       
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default page
