// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./SVGCreator.sol";

contract DripNFT is ERC721, Ownable {
    uint256 public supply = 0;
    SVGCreator public svgCreator;

    event TokenMinted(address indexed to, uint indexed tokenId, string tokenURI);

    constructor(address svgCreatorAddress) ERC721("Drip Reputation NFT", "DRIPREP") {
        svgCreator = SVGCreator(svgCreatorAddress);
    }

    function mint(address _to) public onlyOwner {
        require(balanceOf(_to) < 1, "Minting limit for user exceeded");

        supply += 1;
        _safeMint(_to, supply);

        emit TokenMinted(msg.sender, supply, this.tokenURI(supply));
    }

    function tokenURI(uint256 tokenId) override(ERC721) public view returns (string memory) {
//        Fetch number of reviews for user and pass to svg creator function
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "Drip Reputation NFT #', Strings.toString(tokenId), '",',
                    '"image_data": "', svgCreator.createSvg(1000), '",',
                    '"description": "This NFT id mom transferable and servers as reputation for DRIP review platform"',
                    '}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

    function contractURI() public view returns (string memory) {
        string memory json = Base64.encode(
            bytes(string(
                abi.encodePacked(
                    '{"name": "Drip Reputation NFT Collection",',
                    '"description": "DRIP it like it\'s hot"',
                    '}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}
