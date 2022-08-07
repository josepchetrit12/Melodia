import React, { useEffect, useState } from 'react';
import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import styled from '@emotion/styled';

// Components
import Layout from '../components/layouts/Layout';
import Card from '../components/layouts/Card';

// Styled
const List = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
`;

const Marketplace = () => {

    const [tokens, setTokens] = useState([]);

    useEffect(() => {

        if (tokens.length === 0) {
            getTokens();
        }

    }, []);

    const getTokens = async () => {
        try {

            const fetchAgent = new MediaFetchAgent(process.env.REACT_APP_NETWORK_ID);

            const response = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
                collectionAddresses: ['0xfd94a94d0a831a7bba566ef7a660e950ad913787'],
                limit: 100,
                offset: 0,
            });

            setTokens(response);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <List>
                {tokens.map((token, idx) => (
                    <Card key={idx} token={token} />
                ))}
            </List>
        </Layout>
    );
}
 
export default Marketplace;