import { ConnectButton, PopoverDropdown, PopoverElement } from "web3uikit";
import Link from "next/link";
import Image from "next/image";
import Mint from "./Mint";

export default function Header() {
  return (
    <div>
      <nav className="h-80 max-h-full max-w-full  flex flex-row    bg-gradient-to-r from-blue-300 via-pink-400 to-yellow-500">
        <h1 className="py-4 px-6 font-bold text-3xl text-white flex-none">NFT Marketplace</h1>
        <div className="flex max-w-md mx-auto items-center pl-36 flex-none">
          <div className="pl-36">
            <img
              // class="absolute mt-14 ml-24 clear-both	z-10	"
              src="/logo.png"
              height="150"
              width="150"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center ">
            <Link href="/" className="flex">
              <Mint />
            </Link>
            <Link href="/" className="flex">
              <p className="mr-8 p-6 font-bold hover:text-blue-500	">Home</p>
            </Link>

            <PopoverDropdown
              moveBody={-80}
              parent={
                <Link href="/sell-nft" className="flex">
                  <p className="mr-8 p-6 font-bold hover:text-blue-500	">Sell Page</p>
                </Link>
              }
              position="bottom"
            >
              {/* <PopoverElement
                backgroundColor="transparent"
                height={35}
                textSize={17}
                text="User Profile"
                textColor="#FFFFFF"
                width={250}
                onClick ={()=>{window.history.href="/user"}}
              ></PopoverElement>
              <PopoverElement
                backgroundColor="transparent"
                height={35}
                textSize={17}
                text="Testnet Server"
                textColor="#FFFFFF"
              />
             */}
              <div className="flex w-56  p-2 items-end gap-4">
                <img src="/twitter.png" width="25" height="25" />
                <Link href="/user" className=" text-white text-2xl font-bold">
                  User Profile
                </Link>
              </div>

              <div className="flex w-50  p-2 items-end gap-4">
                <img src="/email.png" width="25" height="25" />
                <Link href="/user" className="text-white text-2xl font-bold">
                  User Profile
                </Link>
              </div>

              <div className="flex w-50  p-2 items-end gap-4">
                <img src="/facebook.png" width="25" height="25" />
                <Link href="/user" className="text-white text-2xl font-bold">
                  User Profile
                </Link>
              </div>
            </PopoverDropdown>
            <ConnectButton moralisAuth={false} />
          </div>
        </div>
      </nav>
    </div>
  );
}
