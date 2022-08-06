import { videonft } from '@livepeer/video-nft';

export async function storeVideo(file, description) {
    const apiOpts = {
        auth: { apiKey: process.env.REACT_APP_LIVEPEER_API_KEY },
        // defaults to current origin if not specified
        endpoint: videonft.api.prodApiEndpoint,
    };

    const { ethereum } = window;
    const chainId = ethereum.chainId; // or await ethereum.request({ method: 'eth_chainId' });
    const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId });
    let asset = await minter.api.createAsset('My Music', file);
    asset = await minter.api.nftNormalize(asset);
    const nftMetadata = {
        description,
    };

    return minter.api.exportToIPFS(asset.id, nftMetadata);
}
