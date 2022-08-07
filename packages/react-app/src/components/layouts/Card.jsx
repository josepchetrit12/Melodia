import React from 'react';
import { FetchStaticData } from "@zoralabs/nft-hooks";
import styled from '@emotion/styled';

// Utils
import { getShortFormatAddress } from '../../utils/address';

// Styled
const Container = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    border: .2rem solid var(--gray3);
`;

const Devider = styled.div`
    border-bottom: .1rem solid var(--gray2);
    width: 80%;
    margin: .4rem 0;
`;

const Card = ({ token }) => {

    const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);

    console.log(token);
    console.log(tokenInfo);

    const imageURL = image => (`${image.replace('ipfs://', 'https://zora.imgix.net/')}&auto=format&fit=crop&w=480&h=480`);

    return (
        <Container>
            <img src={imageURL(tokenInfo.metadata?.image)} alt='Cover' width='100%' />

            <div style={{ padding: '1rem', fontSize: '1.4rem', lineHeight: '1.2', fontWeight: '500' }}>
                <p>{token.nft.tokenData.tokenContract.name} <span>#{tokenInfo.tokenId}</span></p>
                <p>{getShortFormatAddress(token.nft.tokenData.owner)}</p>
                <Devider />
                <p><span>Price</span> 0 ETH</p>
            </div>
        </Container>
    );
}
 
export default Card;