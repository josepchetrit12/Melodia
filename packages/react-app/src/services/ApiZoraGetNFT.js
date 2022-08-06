import { ZDK } from "@zoralabs/zdk";

export async function getNftsFromAddress(address) {
  const API_ENDPOINT = "https://api.zora.co/graphql";
  const zdk = new ZDK(API_ENDPOINT); // Defaults to Ethereum Mainnet
  const args = {
    where: {
      ownerAddresses: [address],
    },
  };
  const response = await zdk.tokens(args);
  return response.tokens.nodes;
}

