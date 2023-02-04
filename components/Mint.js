import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification, BannerStrip } from "web3uikit";
import { useState, useEffect } from "react";
import basicAbi from "../constants/basicNft.json";
import networkMapping from "../constants/networkMapping.json";
import { ethers, BigNumber } from "ethers";


// The Graph does this in a decentralized way
// The Moralis does it in a centralized way and come with a ton of other features
export default function mint() {
  const dispatch = useNotification();
  const chainId = 5;
  const basicAddress = networkMapping[chainId]["basicNft"][0];
  const { isWeb3Enabled } = useMoralis();
  const { runContractFunction: mintNFT } = useWeb3Contract({
    abi: basicAbi,
    contractAddress: basicAddress,
    functionName: "mintNFT",
  });

  const mintSuccess = async (tx) => {
    const txreceipt = await tx.wait(1);
    const tokenId = txreceipt.events[0].args.tokenId.toString()
    dispatch({
      type: "success",
      message: "mint success",
      title: `you success minted ${tokenId} token!`,
      position: "topR",
    });
  };
  const mintError = (error) => {
    dispatch({
      type: "error",
      message: error.message,
      title: error.title,
      position: "topR",
    });
  };
  return (
    <div className="flex">
      {isWeb3Enabled ? (
        <a
          className="mr-8 p-6 font-bold hover:text-blue-500"
          onClick={() => {
            mintNFT({
              onError: (e) => {
                mintError(e);
              },
              onSuccess: (data) => {
                mintSuccess(data);
              },
            });
          }}
        >
          Mint
        </a>
      ) : (
        <p></p>
      )}
    </div>
  );
}
