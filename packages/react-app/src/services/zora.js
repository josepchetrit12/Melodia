import Contract from '@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json';
import { ethers } from 'ethers';

const ZoraProxy_ADDRESS_RINKEBY = '0x2d2acD205bd6d9D0B3E79990e093768375AD3a30';

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

export async function createEdition(
    name,
    symbol,
    description,
    price,
    edition,
    start,
    end,
    royalty,
    payout,
    animationURI,
    imageURI
) {
    if (window.ethereum) {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(ZoraProxy_ADDRESS_RINKEBY, Contract.abi, signer);

        console.log(start, end);
        const salesConfig = [
            ethers.utils.parseEther((price / 100).toString()),
            edition,
            start,
            end,
            0,
            0,
            '0x0000000000000000000000000000000000000000000000000000000000000000',
        ];

        const tx = await contract.createEdition(
            name,
            symbol,
            edition,
            royalty * 100,
            payout,
            signer.getAddress(),
            salesConfig,
            description,
            animationURI,
            imageURI
        );
        await tx.wait();
    }
}
