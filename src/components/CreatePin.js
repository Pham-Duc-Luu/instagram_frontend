import React, { useState } from 'react';
import { sanityClient } from '../client';
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Spinner from './Spinner';

const notify = () => {
    toast.warn('Enter all fields!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
};

const CreatePin = ({ categories, user }) => {
    const [title, settitle] = useState('');
    const [about, setabout] = useState('');
    const [destinaion, setdestinaion] = useState();
    const [fields, setfields] = useState();
    const [category, setcategory] = useState();
    const [imageAsset, setimageAsset] = useState();
    const [wrongImgType, setwrongImgType] = useState();
    const [loading, setloading] = useState();
    // const [imageAsse, setimageAsse] = useState();
    const [showCategories, setshowCategories] = useState(false);

    const handleImageAsset = (imgFile) => {
        let { type } = imgFile;

        if (
            type === 'image/jpg' ||
            type === 'image/jpeg' ||
            type === 'image/png' ||
            type === 'image/gif' ||
            type === 'image/svg'
        ) {
            sanityClient.assets
                .upload('image', imgFile, {
                    filename: imgFile.name,
                })
                .then((imageAsset) => {
                    setimageAsset(imageAsset);
                    // Here you can decide what to do with the returned asset document.
                    // If you want to set a specific asset field you can to the following:
                    // return sanityClient
                    //     .patch('some-document-id')
                    //     .set({
                    //         theImageField: {
                    //             _type: 'image',
                    //             asset: {
                    //                 _type: 'reference',
                    //                 _ref: imageAsset._id,
                    //             },
                    //         },
                    //     })
                    //     .commit();
                })
                .then(() => {});
        }
    };

    const handleSubmit = () => {
        if (title && about && destinaion && category && imageAsset) {
            setloading(true);
            const doc = {
                _id: `${uuidv4()}`,
                _type: 'pin',
                title,
                about,
                destinaion,
                category,
                userId: user._id,
                postedBy: {
                    _ref: user._id,
                    _type: 'postedBy',
                },
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset._id,
                    },
                },
                // seats: 2,
            };

            sanityClient
                .create(doc)
                .then(() => {
                    setloading(false);
                    handelCancel();
                })
                .catch(() => {
                    notify();
                });
        } else {
            notify();
        }
    };

    const handelCancel = () => {
        settitle('');
        setabout('');
        setcategory('');
        setdestinaion('');
        setimageAsset('');
    };

    return (
        <div className="flex flex-col  items-center justify-center w-full h-full">
            {loading && <Spinner></Spinner>}
            <ToastContainer />
            <div className="flex items-center justify-center w-2/4	">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    {!imageAsset ? (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                    ) : (
                        <img src={imageAsset?.url} className="w-full h-64 object-contain	"></img>
                    )}

                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.gif , .svg  "
                        maxsize="20000000"
                        onChange={(e) => {
                            handleImageAsset(e.target.files[0]);
                        }}
                    />
                </label>
            </div>
            <div className="mb-6 w-10/12 md:w-9/12 mt-4 ">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    onChange={(e) => {
                        settitle(e.target.value);
                    }}
                    value={title}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className=" mb-6 w-10/12 md:w-9/12 relative">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Categories
                </label>
                <div
                    className="w-full flex flex-col "
                    onClick={() => {
                        setshowCategories(!showCategories);
                    }}
                >
                    <button
                        id="dropdown-button"
                        data-dropdown-toggle="dropdown"
                        className=" relative bg-gray-50 border border-gray-300 flex text-gray-900
                            items-center justify-center
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                            p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="button"
                    >
                        <div>{category ? category : 'All categories'} </div>
                        <svg
                            aria-hidden="true"
                            className="w-4 h-4 ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    {showCategories && (
                        <div
                            id="dropdown"
                            className="z-10 absolute top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700"
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdown-button"
                            >
                                {categories.length > 0 &&
                                    categories.map((items, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setcategory(items.name);
                                            }}
                                            className="flex 
                                                items-center justify-center
                                                w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            {items.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}
                </div>
                {/* <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg 
                                    border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        placeholder="Search"
                        required
                    />
                    <button
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </button>
                </div> */}
            </div>
            <div className="mb-6 w-10/12 md:w-9/12">
                <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    About
                </label>
                <input
                    value={about}
                    type="text"
                    id="about"
                    onChange={(e) => {
                        setabout(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>{' '}
            <div className="mb-6 w-10/12 md:w-9/12">
                <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Destinaion
                </label>
                <input
                    value={destinaion}
                    type="url"
                    id="destination"
                    onChange={(e) => {
                        setdestinaion(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>{' '}
            {/* <div className="mb-6 w-10/12 md:w-9/12">
                <label htmlFor="catelory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Destinaion
                </label>
                <input
                    type="text"
                    id="catelory"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>{' '} */}
            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        handleSubmit();
                    }}
                    className={`bg-red-700 rounded-lg bg-red-700 px-3 py-1 text-white  cursor-pointer hover:opacity-100`}
                >
                    Save
                </button>
                <button
                    onClick={(e) => {
                        handelCancel();
                    }}
                    className={`bg-red-700 rounded-lg border border-gray-300 bg-white px-3 py-1 text-black  cursor-pointer hover:opacity-100`}
                >
                    cancel
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePin);
