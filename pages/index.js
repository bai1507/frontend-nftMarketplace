import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useMoralis } from "react-moralis";
import GET_ACTIVE_ITEMS from "constants/subgraphQueries";
import { useQuery } from "@apollo/client"; //可以查询数据库
import NFTBox from "@/components/NFTBox";

// The Graph does this in a decentralized way
// The Moralis does it in a centralized way and come with a ton of other features
export default function Home() {
  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);
  const { isWeb3Enabled } = useMoralis();

  return (
    <div className="container mx-auto ">

      <h1 className="py-4 px-4 font-bold text-2xl text-white">Recently Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          loading ? (
            <div>loading...</div>
          ) : (
            listedNfts.activeItems.map((nftlist) => {
              const { sender, nftAddress, tokenId, price, id } = nftlist;
              return (
                <div>
                  <NFTBox price={price} nftaddress={nftAddress} tokenId={tokenId} seller={sender} />
                </div>
              );
            })
          )
        ) : (
          <div className="text-white text-5xl"> NFTmarket Currently Not Enabled 404</div>
        )}
      </div>
      
    </div>
   
  );
}
