import { React, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlinePlusCircle, AiOutlineSetting, AiOutlineCaretDown, AiOutlineCaretLeft } from 'react-icons/ai';

import logo from '../assets/Instagram Logo navbar.png';

const Navbar = () => {
    let user;

    let [userImg, setUserImg] = useState('');
    const [showSetting, setshowSetting] = useState(false);
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
        let { info } = user;
        info?.picture && setUserImg(info.picture);
    }, []);

    return (
        <div className="flex my-4 sticky  justify-center items-center shadow-md">
            <div className="flex justify-center items-center p-4 m-4">
                <FaBars className="text-3xl m-4 cursor-pointer" />
                <img src={logo} width="140px" className="object-contain" />
            </div>
            <div class="max-w-md mx-auto flex-1">
                <div
                    class=" 
                         rounded p-1 flex border-black border-2
                        relative flex items-center h-12 w-full
                         rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
                >
                    <div class="grid place-items-center h-full w-12 text-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    <input
                        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.."
                    />
                </div>
            </div>
            <div className="flex justify-center items-center p-4 m-4">
                <span
                    className="relative transform  
                            hover:scale-125 transition mx-3
                            delay-150 duration-300  ease-in-out delay-100"
                >
                    <img
                        src={userImg}
                        className="w-12 h-12 cursor-pointer p-1 rounded-full
                                border-pink-400 border-2 "
                    />
                    <AiOutlinePlusCircle
                        className="absolute transform left-1/2 bg-white p-1/3  
                            rounded-full text-pink-900
                            -translate-y-3 -translate-x-2/4"
                    />
                </span>
                <div className="rounded p-1 flex border-black border-2" onClick={() => setshowSetting(!showSetting)}>
                    <AiOutlineSetting
                        className={`text-2xl 
                            transition 
                            delay-150 duration-300  ease-in-out delay-100
                            rounded-full transform ${showSetting && 'rotate-90'}`}
                    />
                    <AiOutlineCaretDown className="text-2xl " />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
