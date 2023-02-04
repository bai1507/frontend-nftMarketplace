import { useState, useEffect } from "react"; //状态变量
import { useWeb3Contract, useMoralis } from "react-moralis";
import { ethers, BigNumber } from "ethers";
import Image from "next/image";
import nftmarketplaceAbi from "../constants/NftMarketplace.json";
import basicAbi from "../constants/basicNft.json";
import { Card,useNotification } from "web3uikit";
import UpdateListingModal from "../components/UpdateListingModal";
import networkMapping from "../constants/networkMapping"


function truncatestr(fullstr, strlen) {
  if (fullstr.length <= strlen) return fullstr;
  const separator = "...";
  const charsToShow = strlen - separator.length; //15-3
  const frontChars = Math.ceil(charsToShow / 2); //向上取整
  const backChars = Math.floor(charsToShow / 2); //向下取整

  return (
    fullstr.substring(0, frontChars) + separator + fullstr.substring(fullstr.length - backChars)
  );
}
export default function NFTBox({ price, nftaddress, tokenId, seller }) {
  const dispatch = useNotification();
  const { isWeb3Enabled, account } = useMoralis();
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const chainId = 5;
  const marketplaceAddress = networkMapping[chainId]["NftMarketplace"][0];


  const { runContractFunction: getTokenUri } = useWeb3Contract({
    abi: basicAbi,
    contractAddress: nftaddress,
    functionName: "tokenURI",
    params: {
      _tokenId: tokenId,
    },
   
  });
  const { runContractFunction: buyItem } = useWeb3Contract({
    abi: nftmarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "buyItem",
    msgValue: price,
    params: {
      nftAddress: nftaddress,
      tokenId:tokenId
    },
  });
  const onClose =()=>{setShowModal(false)}
  async function updateUI() {
    const tokenURI = await getTokenUri();
    if (tokenURI) {
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const tokenURIResponse = await (await fetch(requestURL)).json();
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      setImageURI(imageURIURL);
      setTokenName(tokenURIResponse.name);
      setTokenDescription(tokenURIResponse.description);
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const isOwnedByUser = seller === account || seller === undefined;
  const formatedSellerAddress = isOwnedByUser ? "you" : truncatestr(seller, 15);

  const handleCardClick = ()=>{
    isOwnedByUser?setShowModal(true) :buyItem({
      onError:(error)=>{
        handleError(error)
        console.log(error)},
      onSuccess:() => handleBuySuccess(),
    })
  }
  const handleBuySuccess=()=>{
    dispatch({
      type: "success",
      message: "Item Bought",
      title: "Item Bought - please refresh",
      position: "topR",
    });
  }
  const handleError=(error)=>{
    dispatch({
      type: "error",
      message: error.message,
      title: error.title,
      position: "topR",
    });
  }
  return (
    <div>
      {imageURI ? (
        <div className="mt-8 md:my-8 mx-4">
          <UpdateListingModal 
          isVisible={showModal} 
          tokenId={tokenId}
          marketAddress={marketplaceAddress}
          nftAddress={nftaddress}
          onClose = {onClose}
          />
          <Card title={tokenName} description={tokenDescription} onClick={handleCardClick}>
            <div className="p-5 ">
              <div className="flex flex-col items-end gap-2 ">
                <div>#{tokenId}</div>
                <div className="italic text-sm">Owned by {formatedSellerAddress}</div>
                <Image loader={() => imageURI} src={imageURI} height="200" width="200" />
                <div className="font-bold">{ethers.utils.formatUnits(price, "ether")}</div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
