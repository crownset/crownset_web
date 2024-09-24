"use client";
import InvoiceTemplate from "@/components/admin/InvoiceTemplate";
import { CustomLoader } from "@/components/CustomLoader";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Page = () => {
    const [formData, setFormData] = useState({
        bill_to: "",
        state: "",
        district: "",
        gstin: "",
        invoice_date:"",
        invoice_no:"",
        due_date:"",
        reductions:"",
        items: [{ name: "", quantity: "", rate:"", amount: "" }],
        term_conditions:"The total fee for the services outlined above is ?21,94,400/- (Twenty One Lakhs Fifty Nine Thousand Four Hundred Rupees Only) including GST(1 8%) of 3,29,400/-(Three Lakhs Twenty Nine Thousand Four Hundred Rupees Only). This amount is calculated after applying an employee coupon code provided by Pragati Singh, General Manager.",
    });
    // const dispatch = useDispatch();
    // const { loading, error } = useSelector(state => state.quotation);

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
            items: [...formData.items, { name: "", quantity: "", amount: "" }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTemplateVisible(true);
    };

    const handleDownload = async () => {
        if(isBrowser){
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
            <form  class="w-full max-w-screen-lg mx-auto mt-10 " autoComplete="off">
                <div className=" bg-dashboardUserBg gap-5 mb-8 py-3 px-3 rounded-3xl flex items-center">
                    <div className="text-2xl italic underline">
                        <h1>Generate Invoice</h1>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-10 mb-8">
                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            name="bill_to"
                            id="bill_to"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.bill_to}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="bill_to"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Bill To
                        </label>
                    </div>

                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            name="state"
                            id="state"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="state"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            State
                        </label>
                    </div>
                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            name="district"
                            id="district"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="district"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            District
                        </label>
                    </div>
                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            name="gstin"
                            id="gstin"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.gstin}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="gstin"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                           GSTIN
                        </label>
                    </div>
                    <div class="relative z-0 w-full group">
                        <input
                            type="date"
                            name="invoice_date"
                            id="invoice_date"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.invoice_date}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="invoice_date"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Invoice Date
                        </label>
                    </div>
                    <div class="relative z-0 w-full group">
                        <input
                            type="text"
                            name="invoice_no"
                            id="invoice_no"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.invoice_no}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="invoice_date"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Invoice No
                        </label>
                    </div>
                    <div class="relative z-0 w-full group">
                        <input
                            type="date"
                            name="due_date"
                            id="due_date"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formData.due_date}
                            onChange={handleChange}
                            required
                        />
                        <label
                            for="due_date"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Due Date
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
                                value={item.name}
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
                        onClick={handleSubmit}
                    >
                       Preview Invoice
                    </button>
                </div>
            </form>
            {isTemplateVisible && (
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-center">Preview Quotation</h2>
                    <InvoiceTemplate ref={templateRef} formData={formData} visible={isTemplateVisible} />
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
