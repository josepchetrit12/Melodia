import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// React Icons
import { AiOutlineWallet } from 'react-icons/ai';

const Wallet = () => {
    const { chains, provider } = configureChains(
        [
            chain.mainnet,
            chain.polygon,
            chain.optimism,
            chain.arbitrum,
            chain.polygonMumbai,
            chain.rinkeby,
            chain.localhost,
            chain.hardhat,
        ],
        [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
    );

    const { connectors } = getDefaultWallets({
        appName: 'My RainbowKit App',
        chains,
    });

    const wagmiClient = createClient({
        autoConnect: true,
        connectors,
        provider,
    });

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <ConnectButton />
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default Wallet;
