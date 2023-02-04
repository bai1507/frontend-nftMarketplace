## 部署 http://netmarketplace.surge.sh/
1. 首页
    1. 展示最近的NFT列表
        1. 如果你拥有NFT，你能更新这个列表
        2. 如果没有拥有，你能够购买这个列表中的NFT
2. 买卖页：
    1. 你能展示你的NFT在商场中


 
## Getting Started

First, run the development server:
```bash
#先安装环境
yarn
```
```bash
npm run dev
# or
yarn dev
# or
pnpm dev

#添加功能完成后，可以直接部署到线上surge
yarn build
yarn surge
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More
mint:我写的一个简单NFT页面进行挖矿，挖矿成功会在右上角直接提示tokenID,合约地址是：0xCed1978724467B7f97bCa576f3131aA91C6093De

sell-nft:销售你的NFT，需要地址和tokenId即可在该商城进行销售

user:查看用户在该商城的NFT，可以在此处获取你卖出的金额

index:首页查看所有人上架的NFT。


