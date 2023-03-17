import React, { useEffect, useState } from 'react';
import logo from '../assets/Instagram Logo navbar.png';
import { AiFillHome } from 'react-icons/ai';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { sanityClient } from '../client';
import { categoryQuery } from '../ulits/data';
import { fetchFeedList } from '../redux/actions';
import { handleLoadingFeed } from '../redux/actions';

// const category = [
//     { name: 'Animals', link: 'Animals' },
//     { name: 'Wallapapers', link: 'Wallapapers' },
//     { name: 'Photography', link: 'Photography' },
//     { name: 'Movies', link: 'Movies' },
//     { name: 'Cars', link: 'Cars' },
//     { name: 'Nature', link: 'Nature' },
// ];

const Sidebar = ({ className, showSideBar, setshowSideBar, categories, fetchFeedList, handleLoadingFeed }) => {
    const [categoryFeed, setcategoryFeed] = useState();

    let category = categories;
    let navigate = useNavigate();

    const handleFetchCategoryPins = (id) => {
        handleLoadingFeed(true);

        sanityClient.fetch(categoryQuery(id)).then((res) => {
            setcategoryFeed(res);
            handleLoadingFeed(false);
        });
    };

    useEffect(() => {
        fetchFeedList(categoryFeed);
    }, [categoryFeed]);

    return (
        <div className={` ${className}  flex pt-6 px-6 flex-col border-r-2	border-gray-300 h-screee`}>
            {
                <img
                    src={logo}
                    width="140px"
                    className={`object-contain cursor-pointer flex justify-center items-center ${
                        showSideBar ? '' : 'hidden'
                    }  py-4 mx-4`}
                    onClick={() => navigate('/')}
                />
            }
            <div className="flex text-xl text-slate-600 font-black mb-6 items-center">
                <AiFillHome className="mr-6" />
                <span className="	">Home</span>
            </div>
            <ul className="flex flex-col text-slate-400  gap-4 mx-6 ">
                {category?.length > 0 &&
                    category?.map((items, key) => (
                        <li
                            key={key}
                            className="transition ease-in-out delay-50
                 hover:text-slate-700 origin-left cursor-pointer	 hover:scale-125"
                            onClick={() => {
                                handleFetchCategoryPins(items.link);
                                // return navigate(`/${items.link}`);
                            }}
                        >
                            {items.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFeedList: (data) => dispatch(fetchFeedList(data)),
        handleLoadingFeed: (data) => dispatch(handleLoadingFeed(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
