const Tradercat = artifacts.require("TraderCat");
 
contract("TraderCat", (accounts) => {
    it('should credit an NFT to a specific account', async () => {
        const tradercatInstance = await Tradercat.deployed();
        let txResult = await tradercatInstance.safeMint(accounts[1],"tradercat_1.json");
 
        assert.equal(txResult.logs[0].event, "Transfer", "Transfer event was not emitted")
        assert.equal(txResult.logs[0].args.from, '0x0000000000000000000000000000000000000000', "Token was not transferred from the zero address");
        assert.equal(txResult.logs[0].args.to, accounts[1], "Receiver wrong address");
        assert.equal(txResult.logs[0].args.tokenId.toString(), "0", "Wrong Token ID minted");
 
        assert.equal(await tradercatInstance.ownerOf(0), accounts[1], "Owner of Token is the wrong address");
    })
})