import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Spinner = ({ message }) => {
    return (
        <div className="flex justify-center items-center flex-col pt-5">
            <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="40" visible={true} />
            <div className="text-zinc-400 pt-4	">{message}</div>
        </div>
    );
};

export default Spinner;
