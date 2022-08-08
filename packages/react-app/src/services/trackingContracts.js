import { ethers } from 'ethers';
import MelodiaTracking from '../contracts/MelodiaTracking.sol/MelodiaTracking.json';

const MelodiaAddress = '0xa4273064da16E030B43e3f50b092950079cd80D7';

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
export async function addNewContract(contractAddress) {
    if (typeof window.ethereum !== 'undefined') {
        await requestAccount();
        const provider = newProvider();
        const signer = provider.getSigner();
        const contract = instanceContract(MelodiaAddress, MelodiaTracking.abi, signer);
        const tx = await contract.addNewContract(contractAddress);
        await tx.wait()
    }
}

/**
 * getAllContracts Function
 */

// To get all contract from the tracking List.
export async function getAllContracts() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = newProvider();
        const contract = instanceContract(MelodiaAddress, MelodiaTracking.abi, provider);
        return contract.getAllContracts();
    }
}

