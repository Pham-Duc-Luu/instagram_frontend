import React, { useState, useEffect } from 'react';
import { sanityClient, urlFor } from '../client';
import { AiOutlineCloudDownload, AiOutlineLink } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { TailSpin } from 'react-loader-spinner';

const Pin = ({ pinItem, user }) => {
    let { image, postedBy, destinaion, _id, category, save } = pinItem;

    const [isSaved, setisSaved] = useState(false);

    const [saving, setsaving] = useState(false);
    const [hover, sethover] = useState(false);

    const savedPin = (id) => {
        if (!isSaved) {
            setsaving(true);
            sanityClient
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [
                    {
                        _key: uuidv4(),
                        userId: user._id,
                        postedBy: {
                            _type: 'postedBy',
                            _ref: user._id,
                        },
                    },
                ])
                .commit()
                .then((res) => {
                    setsaving(false);
                    setisSaved(true);
                });
        } else {
            setsaving(true);
            const reviewsToRemove = [`save[-1]', 'save[userId==${user._id}]`];

            sanityClient
                .patch(id)
                .unset(reviewsToRemove)
                .commit()
                .then((res) => {
                    setsaving(false);
                    setisSaved(false);
                })
                .catch((e) => {});
        }
    };

    useEffect(() => {
        let saved = save?.length > 0 && save.find((item) => item?.postedBy?._id === user?._id);

        if (saved) {
            setisSaved(true);
        } else {
            setisSaved(false);
        }
    }, [save]);

    const navigate = useNavigate();
    return (
        <div className="relative m-2 cursor-pointer" to={destinaion} target="_blank">
            <img
                className="rounded-lg w-full cursor-pointer hover:"
                alt="user-post"
                src={urlFor(image).width(250).url()}
            />
            <div
                className={`absolute w-full h-full top-0 bg-zinc-900  rounded-lg	${
                    hover ? 'opacity-30' : 'opacity-0'
                }   `}
                onMouseEnter={() => {
                    sethover(true);
                }}
                onMouseLeave={() => {
                    sethover(false);
                }}
                onClick={() => {
                    navigate(`/pin-detail/${pinItem._id}`);
                    window.location.reload();
                }}
            ></div>
            <a
                download
                href={`${image?.asset?.url}?dl=`}
                className={`absolute right-2 bottom-2 rounded-lg bg-white opacity-50 cursor-pointer ${
                    hover ? 'block' : 'hidden'
                } hover:opacity-100`}
                onMouseEnter={() => {
                    sethover(true);
                }}
                onMouseLeave={() => {
                    sethover(false);
                }}
            >
                <AiOutlineCloudDownload className="text-lg m-2" />
            </a>
            <Link
                className={`absolute left-2 bottom-2 rounded-lg bg-white 
                ${hover ? 'block' : 'hidden'}
                cursor-pointer 
                     hover:opacity-100 opacity-50`}
                to={destinaion}
                target="_blank"
                onMouseEnter={() => {
                    sethover(true);
                }}
                onMouseLeave={() => {
                    sethover(false);
                }}
            >
                <AiOutlineLink className="text-lg m-2" />
            </Link>
            {saving ? (
                <button
                    className={`absolute right-2 top-1 p-2 
                         bg-white text-black
                         rounded-lg bg-white opacity-50 
                         ${hover ? 'block' : 'hidden'}
                         cursor-pointer hover:opacity-100`}
                >
                    <TailSpin
                        height="26"
                        width="26"
                        color="black"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        onMouseEnter={() => {
                            sethover(true);
                        }}
                        onMouseLeave={() => {
                            sethover(false);
                        }}
                    />
                </button>
            ) : (
                <button
                    onClick={(e) => {
                        savedPin(_id);
                    }}
                    onMouseEnter={() => {
                        sethover(true);
                    }}
                    onMouseLeave={() => {
                        sethover(false);
                    }}
                    className={`absolute right-2 top-1 p-2 ${
                        isSaved ? 'bg-white text-black' : 'bg-red-700 text-white'
                    }	 rounded-lg opacity-70 cursor-pointer hover:opacity-100 ${hover ? 'block' : 'hidden'}`}
                >
                    {isSaved ? 'Saved' : 'Save'}
                </button>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pin);
