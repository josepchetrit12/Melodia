import { videonft } from '@livepeer/video-nft'
require("dotenv").config()

const apiOpts = {
  auth: { apiKey: process.env.LIVEPEER },
  // defaults to current origin if not specified
  endpoint: videonft.api.prodApiEndpoint
};
const chainId = ethereum.chainId; // or await ethereum.request({ method: 'eth_chainId' });
const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId });

async function mintNft() {
    const file = await minter.uploader.pickFile();
    let asset = await minter.api.createAsset('My NFT', file);
    // optional, optimizes the video for the NFT
    asset = await minter.api.nftNormalize(asset);
  
    const nftMetadata = {
      description: 'My NFT description',
      traits: { 'my-custom-trait': 'my-custom-value' }
    };
    const ipfs = await minter.api.exportToIPFS(asset.id, nftMetadata);
    // const tx = await minter.web3.mintNft(ipfs.nftMetadataUrl);
    // const nftInfo = await minter.web3.getMintedNftInfo(tx);
    // console.log(`minted NFT on contract ${nftInfo.contractAddress} with ID ${nftInfo.tokenId}`);
    return ipfs;
  }