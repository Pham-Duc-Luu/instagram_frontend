import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './container/Home';
import Login from './components/Login';

const App = () => {
    return (
        <div className="font-mono	">
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;
