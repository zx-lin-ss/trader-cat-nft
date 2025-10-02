const Tradercat = artifacts.require("Tradercat");

module.exports = function (deployer, network, accounts) {
  const initialOwner = accounts[0];

  deployer.deploy(Tradercat, initialOwner);
};