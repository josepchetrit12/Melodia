import React, { useEffect, useState } from 'react';
import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";

// Components
import Layout from '../components/layouts/Layout';
import TokenList from '../components/layouts/TokenList';

const Marketplace = () => {

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
            <TokenList tokens={tokens} />
        </Layout>
    );
}
 
export default Marketplace;