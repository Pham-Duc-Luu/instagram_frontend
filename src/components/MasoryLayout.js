import React, { lazy, Suspense } from 'react';
import Masonry from 'react-masonry-css';

// import Pin from './Pin';
import { connect } from 'react-redux';

const Pin = lazy(() => import('./Pin'));

const breakpointColumnsObj = {
    default: 6,
    1280: 5,
    1024: 4,
    768: 3,
    640: 2,
};

const MasoryLayout = (props) => {
    let { feedList } = props;
    return (
        <Masonry breakpointCols={breakpointColumnsObj} className="flex animation-slide-fwd p-2">
            {feedList &&
                feedList.length > 0 &&
                feedList.map((item, index) => (
                    <Suspense key={index} fallback={<div>Loading...</div>}>
                        <Pin pinItem={item}></Pin>
                    </Suspense>
                ))}
        </Masonry>
    );
};

const mapStateToProps = (state) => {
    return {
        feedList: state.feedList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MasoryLayout);
