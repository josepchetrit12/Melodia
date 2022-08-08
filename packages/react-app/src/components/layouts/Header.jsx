import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// Components
import Wallet from '../ui/Wallet';
import { getCurrentAddress } from '../../utils/address';

// Styled
const HeaderStyled = styled.header`
    border-bottom: 2px solid var(--gray2);
    padding: 1rem 0;
`;

const HeaderContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0 3rem;
    margin: 0 auto;

    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const DivFlexCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0;

    img {
        border-radius: 0.5rem;
    }
`;

const Title = styled.p`
    font-size: 2.6rem;
    margin: 0 0 0.6rem 0.3rem;
    color: black;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavItem = styled(Link)`
    color: black;
    text-decoration: none;
    font-size: 2.2rem;
    display: block;

    @media (min-width: 768px) {
        display: inline-block;
        margin-right: 2rem;
        font-size: 1.8rem;

        &:last-of-type {
            margin: 0;
        }
    }

    &:hover {
        color: black;
    }
`;

const Header = () => {
    
    // States
    const [address, setAddress] = useState('');

    useEffect(() => {

        if (!address) {
            getAddress();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAddress = async () => {

        try {

            setAddress(await getCurrentAddress());

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <HeaderStyled>
            <HeaderContainer>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <DivFlexCenter id='logo'>
                        <img src='/logo1.svg' alt='Logo' width={60} />
                        <Title>Melodia</Title>
                    </DivFlexCenter>
                </Link>

                <Nav>
                    <NavItem to='/'>Marketplace</NavItem>
                    <NavItem to='/new-nft'>Create NFT</NavItem>
                    <NavItem to={`/profile/${address}`}>Profile</NavItem>
                </Nav>

                <DivFlexCenter>
                    <Wallet />
                </DivFlexCenter>
            </HeaderContainer>
        </HeaderStyled>
    );
};

export default Header;
