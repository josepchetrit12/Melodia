import { ethers } from 'ethers';
import {abi} from "./abi.json";



async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function newProvider() {
    return new ethers.providers.Web3Provider(window.ethereum);
}

function instanceContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer);
}

/**
 * purchaseNFT Function
 */

// To buy a NFT.
export async function purchaseNFT(price,contractAddress) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(contractAddress, abi, signer);
        const tx = await contract.purchase(price);
        await tx.wait()
        /*
        const options = {value: ethers.utils.parseEther("1.0")}
        const reciept = await contract.purchase(price, options);
        */
    }
}