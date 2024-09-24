"use client";
import QuotationTemplate from "@/components/admin/QuotationTemplate";
import { CustomLoader } from "@/components/CustomLoader";
import { generatePDF } from "@/redux/slices/QuotationSlice";
import axios from "axios";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useRef, useState } from "react";
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
    const [isTemplateVisible, setTemplateVisible] = useState(false);
    const templateRef = useRef();

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        // This will only run in the browser
        setIsBrowser(true);
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setTemplateVisible(true);
    };

    const handleDownload = async () => {
        if (isBrowser) {
            try {
                const pdfElement = templateRef.current;
                const canvas = await html2canvas(pdfElement, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');

                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: "a4"
                });
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save("quotation.pdf");
                setTemplateVisible(false)
                setFormData({
                    quotation_no: "",
                    quotation_date: "",
                    valid_date: "",
                    quotation_for: "",
                    items: [{ name: [""], quantity: "", rate: "", amount: "" }]
                })
                toast.success("Quotation downloaded successfully");
            } catch (error) {
                console.error(error);
                toast.error("Failed to download PDF");
            }
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
            <form className="w-full max-w-screen-lg mx-auto mt-10 " autoComplete="off" onSubmit={handleSubmit}>
                <div className=" bg-dashboardUserBg gap-5 mb-8 py-3 px-3 rounded-3xl flex items-center">
                    <div className="text-2xl italic underline">
                        <h1>Generate Invoice</h1>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-10 mb-8 w-[90%] md:w-full m-auto">
                    <div className="relative z-0 w-full group">
                        <input
                            type="text"
                            name="quotation_no"
                            id="quotation_no"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.quotation_no}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="quotation_no"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Quotation No
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="date"
                            name="quotation_date"
                            id="quotation_date"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.quotation_date}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="quotation_date"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Quotation Date
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="date"
                            name="valid_date"
                            id="valid_date"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.valid_date}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="valid_date"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Valid Date
                        </label>
                    </div>

                    <div className="relative z-0 w-full group">
                        <input
                            type="text"
                            name="quotation_for"
                            id="quotation_for"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.quotation_for}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="quotation_for"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Quotation For
                        </label>
                    </div>
                </div>
                {formData.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 w-[90%] md:w-full m-auto gap-10 mb-4">
                        <div className="relative z-0 w-full group">
                            <input
                                type="text"
                                name="name"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.name.join(",")}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Item Name
                            </label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input
                                type="number"
                                name="quantity"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="quantity"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Quantity
                            </label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input
                                type="number"
                                name="rate"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.rate}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="rate"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Rate
                            </label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input
                                type="number"
                                name="amount"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=""
                                value={item.amount}
                                onChange={(e) => handleItemChange(index, e)}
                                required
                            />
                            <label
                                for="amount"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Amount
                            </label>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col justify-center items-center md:flex-row md:justify-end md:gap-4">
                    <button type="button" onClick={addItem} className="bg-dashboard flex items-center gap-1 text-default text-sm text-center py-2 px-5 rounded-3xl my-3 text-[12px]">
                        <span><FaPlus /></span>
                        <span>Item</span>
                    </button>
                    <button type="submit" className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Preview Quotation
                    </button>
                </div>
            </form>
            {isTemplateVisible && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-center">Preview Quotation</h2>
                    <QuotationTemplate ref={templateRef} formData={formData} visible={isTemplateVisible} />
                    <div className="flex justify-end mr-20 gap-5">
                        <button onClick={handleDownload} className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Download PDF
                        </button>
                        <button onClick={() => setTemplateVisible(false)} className="text-white bg-dashboard hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>

    );
};

export default Page;