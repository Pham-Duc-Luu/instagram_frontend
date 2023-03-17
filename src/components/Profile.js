import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sanityClient } from '../client';
import { fetchFeedList } from '../redux/actions';
import { userPinQuery } from '../ulits/data';
import MasoryLayout from './MasoryLayout';
import Spinner from './Spinner';

import { handleLoadingFeed } from '../redux/actions';

const Profile = ({ user, feedList, fetchFeedList, loadingFeed, handleLoadingFeed }) => {
    const [pinOption, setpinOption] = useState(true);
    const [pins, setpins] = useState();

    const handleGetUserPin = () => {
        let query = userPinQuery(user?._id);
        handleLoadingFeed(true);
        sanityClient.fetch(query).then((data) => {
            setpins(data);
            handleLoadingFeed(false);
        });
    };

    useEffect(() => {
        handleGetUserPin();
    }, []);

    useEffect(() => {
        fetchFeedList(pins);
    }, [pins]);

    return (
        <div className="w-full h-full my-10">
            <div className="flex flex-col justify-center items-center">
                <img src={user?.image} className="rounded-full" />
                <div className="m-2 font-bold text-3xl"> {user?.userName}</div>
            </div>
            <div className="flex gap-6 justify-center items-center">
                <div
                    className={`px-4  py-2 border-2  cursor-pointer	 rounded-full ${
                        pinOption ? 'bg-gray-400' : 'bg-gray-100'
                    } `}
                    onClick={(e) => {
                        setpinOption(true);
                        handleGetUserPin();
                    }}
                >
                    Created
                </div>
                <div
                    className={`px-4  py-2 border-2  cursor-pointer	 rounded-full ${
                        !pinOption ? 'bg-gray-400' : 'bg-gray-100'
                    } `}
                    onClick={(e) => {
                        setpinOption(false);
                    }}
                >
                    Saved
                </div>
            </div>
            {loadingFeed && <Spinner></Spinner>}
            {pinOption && <MasoryLayout />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        feedList: state.feedList,
        user: state.user,
        loadingFeed: state.loadingFeed,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFeedList: (data) => dispatch(fetchFeedList(data)),
        handleLoadingFeed: (data) => dispatch(handleLoadingFeed(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
