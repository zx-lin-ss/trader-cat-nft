const Tradercat = artifacts.require("Tradercat");

module.exports = async function (deployer, network, accounts) {
  const initialOwner = accounts[0]; // Use the first account from Ganache
  await deployer.deploy(Tradercat, "Tradercat", "TCRT", initialOwner);
};
