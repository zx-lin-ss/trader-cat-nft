// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.4.0
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract TraderCat is ERC721, Ownable {
    uint256 private _nextTokenId;

    // Metadata JSON file (not raw PNG!)
    string private constant TOKEN_URI = "https://raw.githubusercontent.com/zx-lin-ss/trader-cat-nft/main/trader_cat_1.json";

    constructor(address initialOwner)
        ERC721("TraderCat", "TDC")
        Ownable(initialOwner)
    {}

    function safeMint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    // All tokens share the same metadata.json
    function tokenURI(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        require(tokenId >= 0, "Token does not exist");
        return TOKEN_URI;
    }
}