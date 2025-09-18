const TraderCat = artifacts.require("TraderCat");
 
module.exports = async function (deployer, network, accounts) {
    const initialOwner = accounts[0]; // use the first account provided by Truffle develop network. 
    await deployer.deploy(TraderCat, initialOwner);
}; 



