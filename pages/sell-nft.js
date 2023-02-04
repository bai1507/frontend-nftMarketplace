import { useState,useEffect } from "react";
import { Inter } from "@next/font/google";
import { useWeb3Contract, useMoralis } from "react-moralis";
import networkMapping from "../constants/networkMapping.json";
import { Form, useNotification,Button } from "web3uikit";
import { ethers } from "ethers";
import nftmarketplaceAbi from "../constants/NftMarketplace.json";
import basicAbi from "../constants/basicNft.json";


export default function Home() {
  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();
  const chainId = 5;
  const marketplaceAddress = networkMapping[chainId]["NftMarketplace"][0];

  async function approveAndList(nftaddress, tokenId, price) {
    console.log("approving。。。");
    const approveOptions = {
      abi: basicAbi,
      contractAddress: nftaddress,
      functionName: "approve",
      params: {
        to: marketplaceAddress,
        tokenId: tokenId,
      },
    };
    await runContractFunction({
      params: approveOptions,
      onSuccess: (tx) => {
        handleApproveSuccess(tx,nftaddress, tokenId, price);
      },
      onError: (error) => {
        handleError(error);
        console.log(error);
      },
    });
  }
  async function handleApproveSuccess(tx,nftaddress, tokenId, price) {
    console.log("time to list...");
    if(tx){
      await tx.wait()
    }
    const listingOptions = {
      abi: nftmarketplaceAbi,
      contractAddress: marketplaceAddress,
      functionName: "listItem",
      params: {
        nftAddress: nftaddress,
        tokenId: tokenId,
        price: price,
      },
    };
    await runContractFunction({
      params: listingOptions,
      onSuccess: () => {
        handleListSuccess();
      },
      onError: (error) => {
        handleError(error);
        console.log(error);
      },
    });
  }
  const handleError = (error) => {
    dispatch({
      type: "error",
      message: error.message,
      title: error.title,
      position: "topR",
    });
  };
  async function handleListSuccess() {
    dispatch({
      type: "success",
      message: "NFT listing",
      title: "NFT listed",
      position: "topR",
    });
  }
  async function checkApproved(data) {
    const nftaddress = data.data[0].inputResult;
    const tokenId = data.data[1].inputResult;
    const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString();
    const checkApprovedOptions = {
      abi: basicAbi,
      contractAddress: nftaddress,
      functionName: "getApproved",
      params: {
        tokenId: tokenId,
      },
    };
    await runContractFunction({
      params: checkApprovedOptions,
      onSuccess: (data) => {
        if (data == marketplaceAddress) {
          console.log("already approved");
          handleApproveSuccess(null,nftaddress, tokenId, price);
        } else {
          approveAndList(nftaddress, tokenId, price);
        }
      },
      onError: (error) => {
        handleError(error);
        console.log(error);
      },
    });
  }

  return (
    <div className="container mx-auto py-24">
      <Form
        onSubmit={checkApproved}
        data={[
          {
            name: "NFT Address",
            type: "text",
            inputWidth: "50%",
            value: "",
            key: "nftAddress",
          },
          {
            name: "Token ID",
            type: "number",
            value: "",
            key: "tokenId",
          },
          {
            name: "Price (in ETH)",
            type: "number",
            value: "",
            key: "price",
          },
        ]}
        title="Sell your NFT"
        id="Main Form"
      />
      
    </div>
  );
}
