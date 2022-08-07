import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import styled from '@emotion/styled';

// Components
import Layout from '../components/layouts/Layout';

// Utils
import { getShortFormatAddress } from '../utils/address';

// Styled
const InfoContainer = styled.div`
    display: flex;
    gap: 1;
    margin: 3rem 0;
`;

const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem 2rem;
`;

const OwnerAddressContainer = styled.div`
    display: inline-block;
    border: .2rem solid var(--gray3);
    border-radius: 2rem;
    padding: 1rem 2rem;
    margin: 0 auto 0 0;
    font-size: 1.6rem;
`;

const PriceInfo = styled.div`
    border: .2rem solid var(--gray3);
    border-radius: .5rem;
    font-size: 1.6rem;
    padding: 2rem;

    .tag {
        font-size: 1.2rem;
        text-transform: uppercase;
        line-height: 1.5;
        font-weight: 500;
        letter-spacing: 0.1rem;
        color: var(--gray1);
    }

    .eth-price {
        font-size: 3rem;
        line-height: 1.25;
        font-weight: 500;
    }

    .usd-price {
        font-size: 1.2rem;
        font-weight: 600;
        line-height: 1.5;
        color: var(--gray1);
    }

    .buyer-address {
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 1.75;
    }
`;

const BuyNowButton = styled.button`
    background-color: var(--black);
    color: var(--white);
    padding: 1rem 3rem;
    margin-top: 2rem;
    width: 100%;
    line-height: 1.75;
    font-weight: 600;
    font-size: 1.6rem;
    border-radius: .5rem;
`;

const selling = true;

const NFT = () => {
    // Hook useParams
    const { id } = useParams();

    // States
    const [ token, setToken ] = useState(null);

    useEffect(() => {

        if (!token) {
            getToken();
        }

    }, []);

    const getToken = async () => {
        try {

            const contract = id.split('-')[0];
            const tokenId = id.split('-')[1];
            
            const fetchAgent = new MediaFetchAgent(process.env.REACT_APP_NETWORK_ID);

            const response = await FetchStaticData.fetchZoraIndexerItem(fetchAgent, {
                tokenId: tokenId,
                collectionAddress: contract,
            });

            const metadata = response.nft.tokenData.metadata.json;

            setToken({
                name: metadata.properties.name,
                symbol: response.nft.tokenData.tokenContract.symbol,
                description: metadata.description,
                owner: response.nft.tokenData.owner,
                video: metadata.animation_url.replace('ipfs://', 'https://ipfs.livepeer.studio/ipfs/'),
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div>
                <video 
                    preload='auto'
                    src={token?.video}
                    autoPlay
                    loop
                    controls
                    width='100%'
                />
            </div>
            <InfoContainer>
                <div style={{ flex: 1 }}>
                    <MainInfo>
                        <OwnerAddressContainer>
                            <p>{getShortFormatAddress(token?.owner)}</p>
                        </OwnerAddressContainer>
                        <h2 style={{ fontSize: '4rem', margin: '0' }}>{token?.name}</h2>
                        <p style={{ fontSize: '1.4rem', lineHeight: '1.6', fontWeight: '400' }}>{token?.description}</p>
                    </MainInfo>
                </div>
                <div style={{ flex: '0 0 37rem'}}>
                    <PriceInfo>
                        <p className='tag'>{ selling ? 'Current Price' : 'Sold for' }</p>
                        <p className='eth-price'>0.1 ETH</p>
                        <p className='usd-price'>$167.4 USD</p>

                        { selling ? (
                            <BuyNowButton>Buy Now</BuyNowButton>
                        ) : (
                            <div style={{ marginTop: '2rem' }}>
                                <p className='tag'>Buyer</p>
                                <p className='buyer-address'>{getShortFormatAddress(token?.owner)}</p>
                            </div>
                        )}
                    </PriceInfo>
                </div>
            </InfoContainer>
        </Layout>
    );
}
 
export default NFT;