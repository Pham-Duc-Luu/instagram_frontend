import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import MasoryLayout from './MasoryLayout';
import { connect } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { fetchFeedList } from '../redux/actions';
import { sanityClient } from '../client';
import { feedQuery } from '../ulits/data';
import { handleLoadingFeed } from '../redux/actions';

const Feed = (props) => {
    const [loading, setloading] = useState(true);
    const [feedList, setfeedList] = useState([]);

    const category = useParams();

    useEffect(() => {
        sanityClient.fetch(feedQuery()).then((data) => {
            props.handleLoadingFeed(data);
            setfeedList(data);
        });
        // if (feedList && feedList.length > 0) {
        //     props.fetchFeedList(feedList);
        //     setloading(false);
        // }
    }, [category]);

    useEffect(() => {
        if (feedList && feedList.length > 0) {
            props.fetchFeedList(feedList);
            props.handleLoadingFeed(false);

            setloading(false);
        }
    }, [feedList]);

    return (
        <>
            <Sidebar className={'hidden md:block'}></Sidebar>

            <div className="flex-1">
                {props.loadingFeed && <Spinner></Spinner>}
                <MasoryLayout />
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        loadingFeed: state.loadingFeed,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFeedList: (data) => dispatch(fetchFeedList(data)),
        handleLoadingFeed: (data) => dispatch(handleLoadingFeed(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
