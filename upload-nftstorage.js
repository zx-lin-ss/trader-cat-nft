import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY })
  const data = fs.readFileSync('./cat_crypto_trader.png')  // your image file

  const blob = new Blob([data])
  const cid = await client.storeBlob(blob)
  console.log('Image IPFS URI:', `ipfs://${cid}`)
}

main()
