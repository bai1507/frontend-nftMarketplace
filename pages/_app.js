import "@/styles/globals.css";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import Header from "@/components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { NotificationProvider } from "web3uikit";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.studio.thegraph.com/query/41501/nft-marketplace/v0.24",
});
export default function App({ Component, pageProps }) {
  return (
    <div className="flex min-h-screen flex-col  overflow-hidden bg-gray-800">
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <ApolloProvider client={client}>
            <Header />
            <Component {...pageProps} />
           
          </ApolloProvider>
        </NotificationProvider>
      </MoralisProvider>
    </div>
  );
}
