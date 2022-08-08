import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchStaticData, MediaFetchAgent  } from "@zoralabs/nft-hooks";
import styled from '@emotion/styled';

// Service
import { getAllContracts } from '../services/trackingContracts';

// Components
import AddressContainer from '../components/ui/AddressContainer';
import Layout from '../components/layouts/Layout';
import TokenList from '../components/layouts/TokenList';

// Styled
const Devider = styled.div`
    border-bottom: .2rem solid var(--gray3);
    width: 100%;
    margin: 4rem 0;
`;

const Profile = () => {
    
    // Hook useParams
    const { id } = useParams();

    // States
    const [tokens, setTokens] = useState([]);

    useEffect(() => {

        if (tokens.length === 0) {
            getTokens();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTokens = async () => {
        try {

            const fetchAgent = new MediaFetchAgent(process.env.REACT_APP_NETWORK_ID);

            const collectionAddresses = await getAllContracts();

            const response = await FetchStaticData.fetchUserOwnedNFTs(fetchAgent, {
                userAddress: id,
                collectionAddresses
            });

            setTokens(response);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <div style={{ marginBottom: '4rem' }}>
                <div style={{ textAlign: 'center' }}>
                    <AddressContainer address={id} />
                </div>
                <Devider />
                <TokenList tokens={tokens} />
            </div>
        </Layout>
    );
}
 
export default Profile;