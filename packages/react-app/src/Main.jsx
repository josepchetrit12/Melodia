import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Error404 from './pages/Error404';
import LandingPage from './pages/LandingPage';
import Marketplace from './pages/Marketplace';
import NewNFT from './pages/NewNFT';
import NFT from './pages/NFT';

const Main = () => {
    return (
        <Routes>
            {/* The Routes decides which component to show based on the current URL.*/}
            <Route exact path='/' element={<Marketplace />}></Route>
            <Route exact path='/new-nft' element={<NewNFT />}></Route>
            <Route exact path='/nft/:id' element={<NFT />}></Route>
            <Route path='*' element={<Error404 />}></Route>
        </Routes>
    );
};

export default Main;
