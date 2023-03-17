import { React, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import {
    AiOutlinePlusCircle,
    AiOutlinePlus,
    AiOutlineSetting,
    AiOutlineCaretDown,
    AiOutlineCaretLeft,
} from 'react-icons/ai';

import { GoSignOut } from 'react-icons/go';
import { connect } from 'react-redux';

import logo from '../assets/Instagram Logo navbar.png';
import { useNavigate } from 'react-router-dom';
import { sanityClient } from '../client';
import { searchQuery } from '../ulits/data';
import { fetchFeedList } from '../redux/actions';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Navbar = ({ className, showSideBar, setshowSideBar, fetchFeedList }) => {
    let user;
    let [userImg, setUserImg] = useState('');
    const [showSetting, setshowSetting] = useState(false);
    const [search, setsearch] = useState();

    const [searchPins, setsearchPins] = useState();

    const handleSearch = () => {
        sanityClient.fetch(searchQuery(search)).then((res) => {
            setsearchPins(res);
        });
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
        let info;
        info = user?.info;
        info?.picture && setUserImg(info.picture);
    }, []);

    useEffect(() => {
        handleSearch();
    }, [search]);

    useEffect(() => {
        fetchFeedList(searchPins);
    }, [searchPins]);

    const navigate = useNavigate();

    return (
        <div
            className={`flex z-10 sticky  border-b-2	border-gray-300 justify-between md:justify-center items-center shadow-md ${className}`}
        >
            <div className="flex justify-center items-center py-4 mx-4">
                <FaBars
                    className="text-3xl m-4 cursor-pointer  block md:hidden"
                    onClick={() => {
                        setshowSideBar(!showSideBar);
                    }}
                />

                <img
                    src={logo}
                    width="140px"
                    onClick={() => navigate('/')}
                    className="object-contain cursor-pointer hidden md:block"
                />
            </div>
            <div className="max-w-md mx-auto  flex-1 hidden md:block">
                <div
                    className=" 
                         rounded p-1 flex border-black border-2
                        relative flex items-center h-12 w-full
                         rounded-lg  bg-white overflow-hidden"
                >
                    <div className="grid place-items-center h-full w-12 text-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    <input
                        className=" h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.."
                        onChange={(e) => {
                            setsearch(e.target.value);
                        }}
                        value={search}
                    />
                </div>
            </div>
            <div className="flex justify-center gap-2 items-center py-4 mx-4">
                <span
                    className="relative transform  
                            hover:scale-125 transition 
                            delay-150 duration-300  ease-in-out delay-100"
                >
                    <img
                        src={userImg}
                        className="w-12 h-12 cursor-pointer p-1 rounded-full
                                border-pink-400 border-2 "
                        onClick={() => {
                            navigate('/profile');
                        }}
                    />
                    {/* <AiOutlinePlusCircle
                        className="absolute transform left-1/2 bg-white p-1/3  
                            rounded-full text-pink-900
                            -translate-y-3 -translate-x-2/4"
                    /> */}
                </span>

                <div
                    className="rounded p-1 flex border-black cursor-pointer bg-black border-2"
                    onClick={() => navigate('/create-pin')}
                >
                    <AiOutlinePlus className="text-2xl	 mx-2 bg-black text-white"></AiOutlinePlus>
                </div>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="">
                            <div
                                className="rounded p-1 flex border-black border-2"
                                onClick={() => setshowSetting(!showSetting)}
                            >
                                <AiOutlineSetting
                                    className={`text-2xl 
                            transition 
                            duration-150  ease-in-out cursor-pointer 
                            rounded-full transform ${showSetting && 'rotate-90'}`}
                                />
                                <AiOutlineCaretDown className="text-2xl " />
                            </div>
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="submit"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-200',
                                            )}
                                            onClick={() => {
                                                localStorage.clear();
                                                window.location.reload();
                                            }}
                                        >
                                            <GoSignOut className="text-lg"></GoSignOut>
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFeedList: (data) => dispatch(fetchFeedList(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
