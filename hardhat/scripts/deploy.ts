import { ethers } from "hardhat"; 

async function main() {
    console.log("🚀 Starting Tradercat NFT deployment to Sepolia...\n"); 

    const [deployer] = await ethers.getSigners();

    console.log("📋 Deployment Details:");
    console.log("Deploying with account:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address); 
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    if (balance === 0n) {
        throw new Error("❌ Insufficient balance! Get Sepolia ETH from a faucet.");
    }
    
    console.log("\n⏳ Deploying Tradercat contract...");
    
    const TradercatFactory = await ethers.getContractFactory("Tradercat");
    const tradercat = await TradercatFactory.deploy(deployer.address);

    console.log("⏳ Waiting for deployment transaction to be mined...");
    await tradercat.waitForDeployment();

    const contractAddress = await tradercat.getAddress();

    console.log("\n✅ Deployment Successful!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📍 Contract Address:", contractAddress);
    console.log("👤 Owner Address:", deployer.address);
    console.log("🏷️  Name:", await tradercat.name());
    console.log("🔤 Symbol:", await tradercat.symbol());
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    console.log("\n🔗 View on Sepolia Etherscan:");
    console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);

    console.log("\n📝 Save this information for later use!");
    console.log("\nTo verify contract, run:");
    console.log(`npx hardhat verify --network sepolia ${contractAddress} "${deployer.address}"`);   
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error); 
    process.exit(1);
  });