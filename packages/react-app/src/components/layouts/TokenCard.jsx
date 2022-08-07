import React from 'react';
import { FetchStaticData } from "@zoralabs/nft-hooks";
import styled from '@emotion/styled';

// Utils
import { getShortFormatAddress } from '../../utils/address';
import { Link } from 'react-router-dom';

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

const TokenCard = ({ token }) => {

    const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);

    const imageURL = image => (image ? `${image.replace('ipfs://', 'https://zora.imgix.net/')}&auto=format&fit=crop&w=480&h=480` : '/no_image_available.png');

    return (
        <Container>
            <Link to={`/nft/${token.nft.tokenData.id}`}>
                <img src={imageURL(tokenInfo.metadata?.image)} alt='Cover' width='100%' />
            </Link>

            <div style={{ padding: '1rem', fontSize: '1.4rem', lineHeight: '1.2', fontWeight: '500' }}>
                <Link to={`/nft/${token.nft.tokenData.id}`} style={{ textDecoration: 'none', color: 'var(--black)' }}>
                    <p>{token.nft.tokenData.tokenContract.name} <span>#{tokenInfo.tokenId}</span></p>
                </Link>
                <Link to={`/profile/${token.nft.tokenData.owner}`} style={{ textDecoration: 'none', color: 'var(--black)' }}>
                    <p>{getShortFormatAddress(token.nft.tokenData.owner)}</p>
                </Link>
                <Devider />
                <p><span>Price</span> 0 ETH</p>
            </div>
        </Container>
    );
}
 
export default TokenCard;