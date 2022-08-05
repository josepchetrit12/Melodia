import ZoraCreatorABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json';
import { ethers } from 'ethers';

const ZoraNFTCreatorProxy_ADDRESS_RINKEBY = "0x2d2acD205bd6d9D0B3E79990e093768375AD3a30"

const salesConfig = [
    0.1,100,0,0,0,0,0x0000000000000000000000000000000000000000
]

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

export async function createEdition(name,symbol,editionSize,royaltyBPS,fundsRecipient,description,animationURI,imageURI) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(ZoraNFTCreatorProxy_ADDRESS_RINKEBY, ZoraCreatorABI, signer);
        const tx = await contract.createEdition(name, symbol,editionSize,royaltyBPS,fundsRecipient,signer.address,salesConfig,description,animationURI,imageURI);
        await tx.wait();
    }

}

