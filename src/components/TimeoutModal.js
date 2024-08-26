import { postQuery } from '@/redux/slices/querySlice';
import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CustomLoader } from './CustomLoader';

const TimeoutModal = ({ isOpen, onClose }) => {


    const dispatch = useDispatch();
    const { loading, error, data } = useSelector((state) => state.data);
    const [service, setServiceValue] = useState(null);
    const [queryCredential, setQueryCredential] = useState({ fullName: "", email: "", contact: "", businessName: "", queryContent: "", leadBy: "website", service: "" });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const options = [
        { id: 1, name: 'Digital Marketing' },
        { id: 2, name: 'Social Media Marketing' },
        { id: 3, name: "Business Solutions" },
        { id: 4, name: "IT Services" },
        { id: 5, name: "Others" }
    ];

    const handleChange = (e) => {
        setQueryCredential({ ...queryCredential, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    }

    const handleSelectChange = (selected) => {
        setQueryCredential({ ...queryCredential, service: selected[0]?.name || '' });
        if (errors.service) {
            setErrors({ ...errors, service: '' });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!queryCredential.fullName) {
            newErrors.fullName = 'This field is required';
        } else if (!queryCredential.email) {
            newErrors.email = 'This field is required';
        } else if (!queryCredential.businessName) {
            newErrors.businessName = 'This field is required';
        } else if (!queryCredential.contact) {
            newErrors.contact = 'This field is required';
        } else if (!queryCredential.queryContent) {
            newErrors.queryContent = 'This field is required';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        dispatch(postQuery(queryCredential))
            .unwrap()
            .then(() => {
                setQueryCredential({
                    fullName: "",
                    email: "",
                    businessName: "",
                    contact: "",
                    queryContent: "",
                    leadBy: ""
                });
                toast.success(data?.message);
            })
            .catch((error) => {
                toast.error("There was an error saving your query.");
                console.log(error)
            });
    }
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="linear-gradient rounded-lg shadow dark:bg-gray-700 p-4 max-w-sm w-full">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">What is your query ?</h3>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="fullName" className="block text-xs font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={queryCredential.fullName}
                            onChange={handleChange}
                            className="w-full p-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={queryCredential.email}
                            onChange={handleChange}
                            className="w-full p-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="businessName" className="block text-xs font-medium text-gray-900 dark:text-white">
                            Business Name
                        </label>
                        <input
                            id="businessName"
                            type="text"
                            name="businessName"
                            value={queryCredential.businessName}
                            onChange={handleChange}
                            className="w-full p-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                    </div>
                    <div>
                        <label htmlFor="service" className="block text-xs font-medium text-gray-900 dark:text-white">
                            Services
                        </label>
                        <Select
                            options={options}
                            placeholder="Select Service"
                            labelField="name"
                            valueField="id"
                            value={service}
                            onChange={handleSelectChange}
                            className="w-full p-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                    </div>
                    <div>
                        <label htmlFor="contact" className="block text-xs font-medium text-gray-900 dark:text-white">
                            Contact no.
                        </label>
                        <input
                            id="contact"
                            name="contact"
                            type="number"
                            value={queryCredential.contact}
                            onChange={handleChange}
                            className="w-full p-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                    </div>
                    <div>
                        <label htmlFor="queryContent" className="block text-xs font-medium text-gray-900 dark:text-white">
                            Query
                        </label>
                        <textarea
                            id="queryContent"
                            name="queryContent"
                            rows={3}
                            value={queryCredential.queryContent}
                            onChange={handleChange}
                            className="w-full p-2 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        {errors.queryContent && <p className="text-red-500 text-xs mt-1">{errors.queryContent}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white w-full font-bold py-3 px-5 rounded-2xl focus:outline-none focus:shadow-outline"
                    >
                        {loading ?
                          
                         <CustomLoader size={10} color={"#ffffff"} loading={loading} />
                            : 'GET IN TOUCH'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TimeoutModal;
