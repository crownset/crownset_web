"use client";
import { CustomLoader } from "@/components/CustomLoader";
import { generatePDF } from "@/redux/slices/QuotationSlice";
import axios from "axios";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
    const [formData, setFormData] = useState({
        quotation_no: "",
        quotation_date: "",
        valid_date: "",
        quotation_for: "",
        items: [{ name: [""], quantity: "", rate: "", amount: "" }]
    });
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.quotation);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...formData.items];
        if (name === "name") {
            items[index].name = value.split(",");
        } else {
            items[index][name] = value;
        }
        setFormData({ ...formData, items });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { name: [""], quantity: "", rate: "", amount: "" }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responsePdf = await dispatch(generatePDF(formData));
            console.log("responsePdf", responsePdf)
            toast.success("Quotation downloaded successfully")
        } catch (error) {
            console.log(error)
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
            <form onSubmit={handleSubmit} class="w-full max-w-screen-lg mx-auto mt-10 " autoComplete="off">
                <div className="text-3xl font-semibold italic mb-10 underline text-center">
                    <h1>Generate Quotation</h1>
                </div>
                <div class="grid grid-cols-2 gap-10 mb-8">
                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            name="quotation_no"
                            id="quotation_no"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.quotation_no}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="quotation_no"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Quotation No
                        </label>
                    </div>

                    <div class="relative z-0 w-full group">
                        <input
                            type="date"
                            name="quotation_date"
                            id="quotation_date"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.quotation_date}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="quotation_date"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Quotation Date
                        </label>
                    </div>

                    <div class="relative z-0 w-full group">
                        <input
                            type="date"
                            name="valid_date"
                            id="valid_date"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.valid_date}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="valid_date"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Valid Date
                        </label>
                    </div>

                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            name="quotation_for"
                            id="quotation_for"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.quotation_for}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="quotation_for"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Quotation For
                        </label>
                    </div>
                </div>
                {formData.items.map((item, index) => (
                    <div key={index} class="grid grid-cols-2 gap-10 mb-4">
                        <div class="relative z-0 w-full group">
                            <input
                                type="text"
                                name="name"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.name.join(",")}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="name"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Item Name
                            </label>
                        </div>
                        <div class="relative z-0 w-full group">
                            <input
                                type="number"
                                name="quantity"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="quantity"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Quantity
                            </label>
                        </div>
                        <div class="relative z-0 w-full group">
                            <input
                                type="number"
                                name="rate"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.rate}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="rate"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Rate
                            </label>
                        </div>
                        <div class="relative z-0 w-full group">
                            <input
                                type="number"
                                name="amount"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.amount}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="amount"
                                class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Amount
                            </label>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col justify-center items-center md:flex-row md:justify-end md:gap-4">
                    <button type="button" onClick={addItem} class="bg-dashboard flex items-center gap-1 text-default text-sm text-center py-2 px-5 rounded-3xl my-3 text-[12px]">
                        <span><FaPlus /></span>
                        <span>Item</span>
                    </button>
                    <button
                        type="submit"
                        class="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {
                            loading ? <CustomLoader loading={loading} color={"#ffffff"} size={10} /> : "Download PDF"
                        }
                    </button>
                </div>
            </form>
        </>

    );
};

export default Page;
