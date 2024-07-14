import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { HiDocumentSearch } from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";

const SideBar = () => {
    return (
        <div className="min-h-screen border-r-2 border-neutral-600 w-64 md:w-1/4 lg:w-1/5 xl:w-1/6 p-5 relative" data-theme="dark">
            <h2 className="text-2xl font-bold text-white mb-6 w-10/12 mx-auto px-3">SpeedSelect</h2>
            <Link to="/" className="w-10/12 mb-2 px-3 py-2 mx-auto flex justify-center rounded-lg hover:bg-gray-700 transition-all ease-in-out duration-150">
                <button className="w-full text-left text-xl font-normal rounded-lg flex items-center">
                    <FaHome size={25} className="mr-2" />Home
                </button>
            </Link>
            <Link to="/login" className="w-10/12 mb-2 px-3 py-2 mx-auto flex justify-center rounded-lg hover:bg-gray-700 transition-all ease-in-out duration-150">
                <button className="w-full text-left text-xl font-normal rounded-lg flex items-center">
                    <IoLogIn size={25} className="mr-2" />Login
                </button>
            </Link>
            <Link to="/signup" className="w-10/12 mb-2 px-3 py-2 mx-auto flex justify-center rounded-lg hover:bg-gray-700 transition-all ease-in-out duration-150">
                <button className="w-full text-left text-xl font-normal rounded-lg flex items-center">
                    <FaUserPlus size={25} className="mr-2" />Sign Up
                </button>
            </Link>
            <Link to="/jobform" className="w-10/12 mb-2 px-3 py-2 mx-auto flex justify-center rounded-lg hover:bg-gray-700 transition-all ease-in-out duration-150">
                <button className="w-full text-left text-xl font-normal rounded-lg flex items-center">
                    <HiDocumentSearch size={25} className="mr-2" />Job Form
                </button>
            </Link>
            <Link to="/jobs" className="w-10/12 mb-2 px-3 py-2 mx-auto flex justify-center rounded-lg hover:bg-gray-700 transition-all ease-in-out duration-150">
                <button className="w-full text-left text-xl font-normal rounded-lg flex items-center">
                    <MdOutlineWork size={25} className="mr-2" />Jobs
                </button>
            </Link>
            <Link to="/userform" className="w-10/12 mb-2 px-3 py-2 mx-auto flex justify-center rounded-lg hover:bg-gray-700 transition-all ease-in-out duration-150">
                <button className="w-full text-left text-xl font-normal rounded-lg flex items-center">
                    <GrUserWorker size={25} className="mr-2" />User Form
                </button>
            </Link>
        </div>
    );
};

export default SideBar;
