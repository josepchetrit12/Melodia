import { Web3Storage, File } from 'web3.storage';

function getAccessToken() {
    return process.env.REACT_APP_WEB3_STORAGE_TOKEN;
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
}

export async function storeImage(file) {
    const client = makeStorageClient();
    const newFile = new File([file], 'cover-image.jpeg', { type: 'image' });
    return client.put([newFile]);
}

export async function retrieveFiles(cid) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    if (!res.ok) {
        throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
    }
    const files = await res.files();
    return files[0].text();
}
