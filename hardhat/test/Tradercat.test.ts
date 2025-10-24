import { expect } from "chai";
import { ethers } from "hardhat";
import { Tradercat } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("Tradercat NFT", function () {
  // Fixture: Deploy contract and mint one token
  async function deployTradercatAndMintTokenFixture() {
    const TradercatFactory = await ethers.getContractFactory("Tradercat");
    const [owner, otherAccount, thirdAccount] = await ethers.getSigners();
    const tradercat = await TradercatFactory.deploy(owner.address);
    await tradercat.waitForDeployment();

    // Mint one NFT for testing
    await tradercat.safeMint(otherAccount.address, "tradercat1.json");

    return { tradercat, owner, otherAccount, thirdAccount };
  }

  // Fixture: Just deploy, don't mint
  async function deployTradercatFixture() {
    const TradercatFactory = await ethers.getContractFactory("Tradercat");
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const tradercat = await TradercatFactory.deploy(owner.address);
    await tradercat.waitForDeployment();

    return { tradercat, owner, addr1, addr2, addr3 };
  }

  describe("Deployment", function () {
    it("should set the right owner", async function () {
      const { tradercat, owner } = await loadFixture(deployTradercatFixture);
      expect(await tradercat.owner()).to.equal(owner.address);
    });

    it("should have correct name and symbol", async function () {
      const { tradercat } = await loadFixture(deployTradercatFixture);
      expect(await tradercat.name()).to.equal("Tradercat");
      expect(await tradercat.symbol()).to.equal("TDC");
    });
  });

  describe("Minting", function () {
    it("should be able to mint a token", async function () {
      const { tradercat, otherAccount } = await loadFixture(
        deployTradercatAndMintTokenFixture
      );
      expect(await tradercat.ownerOf(0)).to.equal(otherAccount.address);
    });

    it("should fail when non-owner tries to mint", async function () {
      const { tradercat, addr1, addr2 } = await loadFixture(
        deployTradercatFixture
      );
      await expect(
        tradercat.connect(addr1).safeMint(addr2.address, "tradercat1.json")
      ).to.be.revertedWithCustomError(tradercat, "OwnableUnauthorizedAccount");
    });

    it("should increment token IDs correctly", async function () {
      const { tradercat, owner, addr1, addr2 } = await loadFixture(
        deployTradercatFixture
      );
      
      await tradercat.safeMint(addr1.address, "tradercat1.json");
      await tradercat.safeMint(addr2.address, "tradercat2.json");
      // await tradercat.safeMint(addr1.address, "3.json");

      expect(await tradercat.ownerOf(0)).to.equal(addr1.address);
      expect(await tradercat.ownerOf(1)).to.equal(addr2.address);
      // expect(await tradercat.ownerOf(2)).to.equal(addr1.address);
    });
  });

  describe("Transfers", function () {
    it("should fail to transfer tokens from the wrong address", async function () {
      const { tradercat, otherAccount, thirdAccount } = await loadFixture(
        deployTradercatAndMintTokenFixture
      );

      expect(await tradercat.ownerOf(0)).to.equal(otherAccount.address);
      
      await expect(
        tradercat
          .connect(thirdAccount)
          .transferFrom(otherAccount.address, thirdAccount.address, 0)
      ).to.be.revertedWithCustomError(tradercat, "ERC721InsufficientApproval");
    });

    it("should allow owner to transfer their token", async function () {
      const { tradercat, otherAccount, thirdAccount } = await loadFixture(
        deployTradercatAndMintTokenFixture
      );

      await tradercat
        .connect(otherAccount)
        .transferFrom(otherAccount.address, thirdAccount.address, 0);
      
      expect(await tradercat.ownerOf(0)).to.equal(thirdAccount.address);
    });
  });

  describe("Token URI", function () {
    it("should return correct token URI", async function () {
      const { tradercat } = await loadFixture(
        deployTradercatAndMintTokenFixture
      );
      
      const expectedURI = "https://raw.githubusercontent.com/zx-lin-ss/trader-cat-nft/refs/heads/main/trader_cat_NFT/metadata/tradercat1.json";
      expect(await tradercat.tokenURI(0)).to.equal(expectedURI);
    });

    it("should revert for non-existent token", async function () {
      const { tradercat } = await loadFixture(deployTradercatFixture);
      
      await expect(
        tradercat.tokenURI(999)
      ).to.be.revertedWithCustomError(tradercat, "ERC721NonexistentToken");
    });
  });
});