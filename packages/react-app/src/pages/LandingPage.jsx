import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

// Style
const MyLink = styled(Link)`
    font-size: 2.6rem;
    text-decoration: none;
    background-color: black;
    padding: 1rem 2rem;
    border-radius: .5rem;
    margin-left: 2rem;
    color: white;
`;

const LandingPage = () => {
    return (
        <div>
            <h1>From Landing Page</h1>
            <MyLink to='/new-nft'>
                New NFT Page
            </MyLink>
        </div>
    );
}
 
export default LandingPage;