import { videonft } from "@livepeer/video-nft";

export async function storeVideo(file, descriptionMusic) {
  const apiOpts = {
    auth: { apiKey: process.env.LIVEPEER },
    // defaults to current origin if not specified
    endpoint: videonft.api.prodApiEndpoint,
  };
  const chainId = ethereum.chainId; // or await ethereum.request({ method: 'eth_chainId' });
  const minter = new videonft.minter.FullMinter(apiOpts, { ethereum, chainId });
  let asset = await minter.api.createAsset("My Music", file);
  asset = await minter.api.nftNormalize(asset);
  const nftMetadata = {
    description: descriptionMusic,
  };
  const ipfs = await minter.api.exportToIPFS(asset.id, nftMetadata);
  return ipfs;
}
