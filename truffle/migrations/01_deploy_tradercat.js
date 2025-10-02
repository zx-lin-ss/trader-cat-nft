const Tradercat = artifacts.require("Tradercat"); 

module.exports = async function (deployer, network, accounts) {
  // accounts[0] is the first unlocked account from Ganache
  const initialOwner = accounts[0]; 

  await deployer.deploy(Tradercat, initialOwner); 
  
}; 