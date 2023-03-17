import React, { useEffect, useState } from 'react';
import { Feed, Navbar } from '../components';
import { Sidebar } from '../components';
import { useNavigate, Route, Routes, useParams } from 'react-router-dom';
import MasoryLayout from '../components/MasoryLayout';
import { userQuery } from '../ulits/data';
import { sanityClient } from '../client';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import CreatePin from '../components/CreatePin';
import PinDetail from '../components/PinDetail';
import Profile from '../components/Profile';
const Home = (props) => {
    let user = JSON.parse(localStorage.getItem('user'));
    let navigate = useNavigate();
    const [showSideBar, setshowSideBar] = useState(false);

    const [isLoanding, setisLoanding] = useState();

    const param = useParams();

    let query;
    useEffect(() => {
        if (user) {
            // return navigate('/');
            query = userQuery(user?.info?.sub);
        } else navigate('/login');

        // let data;
        sanityClient.fetch(query).then((data) => {
            props.saveUser(data[0]);
        });
    }, []);

    return (
        <div className="flex relative">
            {showSideBar && (
                <div className="w-screen delay-100 absolute z-20 bg-black/10 ">
                    <div
                        className="w-screen h-screen absolute top-0"
                        onClick={() => {
                            setshowSideBar(!showSideBar);
                        }}
                    ></div>
                    <Sidebar
                        className={`${
                            showSideBar ? 'block' : 'hidden'
                        } md:hidden z-2 drop-shadow-2xl  animate-slide-in h-screen w-fit bg-white`}
                        showSideBar={showSideBar}
                        setshowSideBar={setshowSideBar}
                    ></Sidebar>
                </div>
            )}
            <div className="flex-1">
                <Navbar showSideBar={showSideBar} setshowSideBar={setshowSideBar}></Navbar>

                <div className="flex h-screen">
                    {/* <Sidebar className={'hidden md:block'}></Sidebar> */}

                    <Routes>
                        <Route exact path="/*" element={<Feed />}></Route>

                        <Route path="/create-pin/" element={<CreatePin />}></Route>
                        <Route path="/pin-detail/:_id" element={<PinDetail />}></Route>
                        <Route path="/profile/" element={<Profile />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (user) => dispatch(login(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
