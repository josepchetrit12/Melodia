import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// Components
import Wallet from '../ui/Wallet';

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
    margin: 0 0 .6rem .3rem;
    color: black;
`;

const Header = () => {
    return (
        <HeaderStyled>
            <HeaderContainer>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <DivFlexCenter id='logo'>
                        <img src='/logo1.svg' alt='Logo' width={60} />
                        <Title>Melodia</Title>
                    </DivFlexCenter>
                </Link>

                <DivFlexCenter>
                    <Wallet />
                </DivFlexCenter>
            </HeaderContainer>
        </HeaderStyled>
    );
}
 
export default Header;