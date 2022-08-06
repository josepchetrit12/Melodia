// require('dotenv').config();
import axios from "axios";

const API_KEY= process.env.MINT_API_KEY;

//const BASE_URL = https://api.mintnft.today;

const uploadToIPFS = {
    method: 'POST',
    url: 'https://api.mintnft.today/v1/mint/single',
    params: {
        metadata: JSON.stringify({
            "description": "Original Score bye Audiomachine", 
            "name": "Audiomachine",
          }),
       // image: ,
    },
    
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': String("120df653-6d3c-4ed1-be09-a2ebcd871674")
    }
};


const mintNFT = {
    method: 'POST',
    url: 'https://api.mintnft.today/v1/mint/single',
    params: {
        wallet: "0x4cA51F26c5B17351E939FD9c6fAdc60BBd6b7594",
        type: "ERC721",
        tokenCategory: "soulbound",
        amount: 1,
        network: "mainnet",
        tokenUri: "ipfs://bafyreig3tlq5hk7i5qarl2rcrozqqk6czyeebiz337esdhascbiwducloa/metadata.json"
    },
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': String("120df653-6d3c-4ed1-be09-a2ebcd871674")
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
   console.error(error);
  });


  

