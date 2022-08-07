import React from 'react';
import styled from '@emotion/styled';

// Utils
import { getShortFormatAddress } from '../../utils/address';

// Styled
const Container = styled.div`
    display: inline-block;
    border: .2rem solid var(--gray3);
    border-radius: 2rem;
    padding: 1rem 2rem;
    margin: 0 auto 0 0;
    font-size: 1.6rem;
`;

const AddressContainer = ({ address }) => {
    return (
        <Container>
            <p>{getShortFormatAddress(address)}</p>
        </Container>
    );
}
 
export default AddressContainer;