const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const contractAddresses = require("./constants/networkMapping.json");
require("dotenv").config();

let chain = EvmChain.GOERLI;
const chainId = process.env.chainId;
const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_ID;
const address = contractAddresses[chainId]["NftMarketplace"][1];
const itemListedPack =
  "0xd547e933094f12a9159076970143ebe73234e64480317844b0dcb36117116de4"; 
const ItemBoughtPack =
  "0x263223b1dd81e51054a4e6f791d45a4a1ddb4aadcd93a2dfd892615c3fdac187";
const ItemCanceledPack =
  "0x9ba1a3cb55ce8d63d072a886f94d2a744f50cddf82128e897d0661f5ec623158";

async function main() {
    await Moralis.start({
      apiKey: apiKey,
      // ...and any other configuration
    });

    console.log(`contract address ${address}`);
    const kkabi = {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "nftAddress",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "name": "ItemListed",
        "type": "event"
      };
    const response = await Moralis.EvmApi.events.getContractEvents({
      address,
      chain,
      abi: kkabi,
      topic: itemListedPack,
    });
   
    console.log(response.result);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
