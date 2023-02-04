import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import GET_USER_ACTIVE_ITEMS from "constants/subgraphUserQueries";
import { useQuery } from "@apollo/client"; //可以查询数据库
import NFTBox from "@/components/NFTBox";
import nftmarketplaceAbi from "../constants/NftMarketplace.json";
import { useWeb3Contract, useMoralis } from "react-moralis";
import networkMapping from "../constants/networkMapping.json";
import { useNotification, Button } from "web3uikit";

// The Graph does this in a decentralized way
// The Moralis does it in a centralized way and come with a ton of other features
export default function Home() {
  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();
  const chainId = 5;
  const marketplaceAddress = networkMapping[chainId]["NftMarketplace"][0];
  const [proceeds, setProceeds] = useState("0");
  const { isWeb3Enabled, account } = useMoralis();
  const {
    loading,
    error,
    data: userListedNfts,
  } = useQuery(GET_USER_ACTIVE_ITEMS, { variables: { sender: account } });

  async function setupUI() {
    const returnedProceeds = await runContractFunction({
      params: {
        abi: nftmarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "getProceeds",
        params: {
          seller: account,
        },
      },
      onError: (error) => {
        handleError(error);
        console.log(error);
      },
    });
    if (returnedProceeds) {
      setProceeds(returnedProceeds.toString());
    }
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      setupUI();
    }
  }, [proceeds, account, isWeb3Enabled]);
  
  const handleError = (error) => {
    dispatch({
      type: "error",
      message: error.message,
      title: error.title,
      position: "topR",
    });
  };
  const handleWithdrawSuccess = () => {
    dispatch({
        type: "success",
        message: "Withdrawing proceeds",
        title: "Success-please refresh",
        position: "topR",
    })
    
}
  return (
    <div className="container mx-auto ">
      <nav className="flex flex-row mx-auto justify-between items-center">
        <h1 className="py-4 px-4 font-bold text-2xl text-white" >User Listed</h1>
        <div className="flex flex-row items-center">
          <div className="flex mr-8  font-bold text-white">
            Withdraw <p className="mx-3 text-pink-400	text-lg underline	">{proceeds}</p> proceeds
          </div>
          {proceeds != "0" ? (
            <Button
              onClick={() => {
                runContractFunction({
                  params: {
                    abi: nftmarketplaceAbi,
                    contractAddress: marketplaceAddress,
                    functionName: "withdrawProceeds",
                    params: {},
                  },
                  onError: (error) => {
                    handleError(error)
                    console.log(error)
                  },
                  onSuccess: () => {
                    handleWithdrawSuccess()
                  },
                });
              }}
              text="Withdraw"
              type="button"
              theme="outline"
            />
          ) : (
            <div></div>
          )}
        </div>
      </nav>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          loading ? (
            <div>loading...</div>
          ) : (
            userListedNfts.activeItems.map((nftlist) => {
              const { sender, nftAddress, tokenId, price, id } = nftlist;
              return (
                <div>
                  <NFTBox price={price} nftaddress={nftAddress} tokenId={tokenId} seller={sender} />
                </div>
              );
            })
          )
        ) : (
          <div> NFTmarket Currently Not Enabled</div>
        )}
      </div>
    </div>
  );
}
