import React from "react";

const CustomAlert = ({
    isOpen,
    onClose,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    confirmButtonColor = "bg-red-600 hover:bg-red-800",
    cancelButtonColor = "bg-white hover:bg-gray-100 text-gray-900",
    icon: Icon,
}) => {
    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className={`${isOpen ? "flex" : "hidden"
                } fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full bg-gray-900 bg-opacity-50`}
        >
            <div className="relative p-4 w-full max-w-md">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={onClose}
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        {Icon && (
                            <Icon className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                        )}
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {title}
                        </h3>
                        <p className="mb-5 text-sm text-black font-semibold dark:text-gray-400">
                            {description}
                        </p>
                        <button
                            type="button"
                            className={`text-white ${confirmButtonColor} focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                            onClick={onConfirm}
                        >
                            {confirmButtonText}
                        </button>
                        <button
                            type="button"
                            className={`py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none ${cancelButtonColor} rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                            onClick={onClose}
                        >
                            {cancelButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomAlert;
