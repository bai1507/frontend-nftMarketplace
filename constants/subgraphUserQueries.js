const { gql } = require("@apollo/client");
const GET_USER_ACTIVE_ITEMS = gql`
  query User($sender: String!){
    activeItems(first: 10, where:{ sender:$sender}) {
      id
      sender
      buyer
      nftAddress
      tokenId
      price
    }
  }
`
export default GET_USER_ACTIVE_ITEMS;
