import { ethers } from 'ethers';
import MelodiaTracking from '../contracts/MelodiaTracking.sol/MelodiaTracking.json';

const MelodiaAddress = '0xe6d35daa7036786ac39081c4c05f0041669a616a';

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
 * addNewContract Function
 */

// To add a new contract in the tracking List.
export async function addNewContract(contract) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(MelodiaAddress, MelodiaTracking.abi, signer);
        const tx = await contract.addNewContract(contract);
        await tx.wait()
    }
}

/**
 * geAllContract Function
 */

// To get all contract from the tracking List.
export async function geAllContract() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(MelodiaAddress, MelodiaTracking.abi, provider);
        return contract.geAllContract();
    }
}

