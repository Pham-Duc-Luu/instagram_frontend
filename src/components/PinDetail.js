import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sanityClient, urlFor } from '../client';
import { pinQuery } from '../ulits/data';
import { connect } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import { fetchFeedList } from '../redux/actions';
import { AiOutlineDownload, AiOutlineSend } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import MasoryLayout from './MasoryLayout';
import { morePinQuery } from '../ulits/data';

const PinDetail = ({ feedList, user, fetchFeedList }) => {
    const { _id } = useParams();

    const [image, setimage] = useState();
    const [imageBuildErr, setimageBuildErr] = useState(false);
    const [myCommnent, setmyCommnent] = useState();
    const [loading, setloading] = useState(false);
    const [comments, setcomments] = useState();
    const [morPin, setmorPin] = useState([]);

    const fetchPinDetails = () => {
        sanityClient
            .fetch(pinQuery(_id))
            .then((res) => {
                setimage(res[0]);
            })
            .catch((e) => {});
    };

    useEffect(() => {
        fetchPinDetails();
    }, [comments]);

    const handleSendComment = () => {
        if (myCommnent) {
            setloading(true);
            const doc = {
                comment: myCommnent,
                _key: uuidv4(),
                postedBy: {
                    _type: 'postedBy',
                    _ref: user._id,
                },
                // _type: 'comment',
            };

            sanityClient
                .patch(image._id)
                .setIfMissing({ comments: [] })
                .insert('after', 'comments[-1]', [doc])
                .commit(pinQuery(_id))
                .then((res) => {
                    setloading(false);
                    setmyCommnent('');
                    setcomments(res.comments);
                    fetchPinDetails();
                })
                .catch((err) => {});
        }
    };

    useEffect(() => {
        sanityClient.fetch(morePinQuery(image)).then((data) => {
            setmorPin(data);
        });
        // if (feedList && feedList.length > 0) {
        //     props.fetchFeedList(feedList);
        //     setloading(false);
        // }
    }, [image]);

    useEffect(() => {
        if (morPin && morPin.length > 0) {
            fetchFeedList(morPin);
            // setloading(false);
        }
    }, [morPin]);

    return (
        <div className="flex flex-1 flex-col">
            <div className=" flex justify-center w-full items-start	 h-full mb-20">
                <div className="flex flex-col  justify-center w-8/12">
                    <div className="mt-6 flex flex-col border border-gray-300 rounded-3xl">
                        <img
                            className="object-contain bg-no-repeat bg-center rounded-3xl max-h-96	 bg-contain   "
                            src={image?.image?.asset?.url}
                            style={{ backgroundImage: `url(${image?.image?.asset?.url})` }}
                        ></img>
                        <div className="ml-8 my-2 cursor-pointer flex ">
                            <span className="rounded-full border-2 p-1 flex items-center">
                                <img className="rounded-full w-5 mr-2 " src={image?.postedBy?.image} />
                                {user.userName}
                            </span>
                        </div>
                        <div className="font-extrabold font-mono ml-8  text-3xl">{image?.title}</div>
                        <div className=" ml-8  text-lg">{image?.about}</div>
                    </div>
                    <div className="mt-10">
                        <div
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-full flex
                        focus:ring-blue-500 focus:border-blue-500 block w-full py-1 px-2  items-center 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <img className="rounded-full w-6 mr-2 cursor-pointer" src={user?.image} />
                            <input
                                onChange={(e) => {
                                    setmyCommnent(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        handleSendComment();
                                    }
                                }}
                                type="text"
                                placeholder="Enter the comment"
                                className="w-full h-full outline-none text-lg"
                                value={myCommnent}
                            />
                            {loading ? (
                                <Oval
                                    wrapperClass="text-lg "
                                    color="#333"
                                    width={18}
                                    height={18}
                                    secondaryColor="#000"
                                />
                            ) : (
                                <AiOutlineSend
                                    className="text-lg cursor-pointer"
                                    onClick={() => {
                                        handleSendComment();
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex flex-col">
                            {image?.comments?.length > 0 &&
                                image?.comments?.map((item, key) => (
                                    <div key={key} className="ml-10 flex  items-center my-2 ">
                                        <img
                                            className="rounded-full w-6  mr-2 cursor-pointer"
                                            src={item?.postedBy?.image}
                                        />
                                        <span className="bg-slate-200 flex flex-col	rounded-xl  p-2">
                                            <span className="font-extrabold cursor-pointer">
                                                {' '}
                                                {item?.postedBy?.userName}
                                            </span>
                                            <span className="font-normal	">{item.comment}</span>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>{' '}
            </div>

            <MasoryLayout />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        feedList: state.feedList,
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFeedList: (data) => dispatch(fetchFeedList(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PinDetail);
