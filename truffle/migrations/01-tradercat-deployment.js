const Tradercat = artifacts.require("TraderCat");

module.exports = function(deployer, network, accounts) {
    const initOwner = accounts[0]; 
    deployer.deploy(Tradercat, initOwner);
}
/*
module.exports = async function (deployer, network, accounts) {
    const initialOwner = accounts[0]; // use the first account provided by Truffle develop network. 
    await deployer.deploy(TraderCat, initialOwner);
};
*/ 



