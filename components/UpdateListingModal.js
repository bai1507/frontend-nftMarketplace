import { Modal, Input, useNotification } from "web3uikit";
import { useState } from "react";
import nftmarketplaceAbi from "../constants/NftMarketplace.json";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { ethers } from "ethers";
export default function UpdateListingModal({
  nftAddress,
  tokenId,
  isVisible,
  marketAddress,
  onClose,
}) {
  const dispatch = useNotification();
  const [priceToUpdate, setPriceToUpdate] = useState("0");
  const handleUpdateListingSuccess = async (tx) => {
    onClose && onClose();
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "listing updated",
      title: "Listing updated - please refresh",
      position: "topR",
    });
    setPriceToUpdate("0");
  };
  const handleUpdateListingError = async (error) => {
    setPriceToUpdate("0");
    onClose && onClose();
    dispatch({
      type: "error",
      message: error.message,
      title: error.title,
      position: "topR",
    });
  };
  const { runContractFunction: updateListing } = useWeb3Contract({
    abi: nftmarketplaceAbi,
    contractAddress: marketAddress,
    functionName: "updateListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(priceToUpdate),
    },
  });
  return (
    <Modal
      width="50"
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={() => {
        updateListing({
          onError: handleUpdateListingError,
          onSuccess: handleUpdateListingSuccess,
        });
      }}
    >
      <Input
        label="Update listing price in L1 Currercy (ETH)"
        name="New listing price"
        type="number"
        value="0"

        onChange={(event) => {
          setPriceToUpdate(event.target.value || "0");
        }}
        
      />
    </Modal>
  );
}
