const { gql } = require("@apollo/client");

const GET_ACTIVE_ITEMS = gql`
  {
    activeItems(first: 10, where: { buyer: "0x0000000000000000000000000000000000000000"},subgraphError: allow) {
      id
      sender
      buyer
      nftAddress
      tokenId
      price
    }
  }
`
export default GET_ACTIVE_ITEMS;
