import React from 'react';
import video from '../assets/video.mp4';
import logo from '../assets/instagram logo.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { sanityClient } from '../client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const loginResponse = (credentialResponse) => {
        // console.log(credentialResponse, jwt_decode(credentialResponse.credential));
        let userInfo = jwt_decode(credentialResponse.credential);
        localStorage.setItem(
            'user',

            JSON.stringify({ ...credentialResponse, info: userInfo }),
        );
        let { name, picture } = userInfo;

        const doc = {
            _id: credentialResponse.clientId,
            _type: 'user',
            userName: name,
            image: picture,
            // seats: 2,
        };

        sanityClient.createIfNotExists(doc).then((res) => {
            // console.log(res);
            return navigate('/');
        });
    };

    return (
        <div className="flex relative justify-center items-center flex-col h-screen">
            <div className="absolute w-full h-full">
                <video
                    src={video}
                    type="video/mp4"
                    loop
                    controls={false}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                />
                <div class="absolute  inset-0 absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="bg-white z-10 rounded-lg flex flex-col p-4 justify-center items-center">
                <img src={logo} width="130px" alt="logo" className="" />
                <GoogleLogin
                    onSuccess={loginResponse}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    );
};

export default Login;
