import React, { useEffect, useState } from 'react';
import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import { getAllContracts } from '../services/trackingContracts';

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

            const collectionAddresses = await getAllContracts();

            const response = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
                collectionAddresses,
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