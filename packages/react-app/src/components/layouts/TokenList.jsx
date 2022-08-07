import React from 'react';
import styled from '@emotion/styled';

// Components
import TokenCard from './TokenCard';

// Styled
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
`;

const TokenList = ({ tokens }) => {
    return (
        <Container>
            { tokens.map((token, idx) => (
                <TokenCard key={idx} token={token} />
            ))}
        </Container>
    );
}
 
export default TokenList;