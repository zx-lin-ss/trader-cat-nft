const Tradercats = artifacts.require("Tradercat"); 

module.exports = function (deployer, network, accounts) {
    // accounts[0] is the first account provided by Truffle/Ganache
    deployer.deploy(Tradercats, accounts[0]);
}; 