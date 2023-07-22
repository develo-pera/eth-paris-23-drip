// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract SVGCreator {
    constructor() {}

    function createSvg(uint numberOfReviews) public view returns (string memory) {
        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(




                            '<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
                            '<path id="Rectangle-copy" fill="#272727" fill-rule="evenodd" stroke="none" d="M 0 600 L 600 600 L 600 0 L 0 0 Z"/>',
                            ' <text id="DRIP-Reviwer-lvl" xml:space="preserve"><tspan x="300" y="196" text-anchor="middle" font-family="Rubik" font-size="76" font-weight="700" fill="#ffffff" xml:space="preserve">DRIP</tspan><tspan x="300" y="286" text-anchor="middle" font-family="Rubik" font-size="76" font-weight="700" fill="#ffffff" xml:space="preserve">Reviwer lvl:</tspan></text>'
                            '<text id="10000" xml:space="preserve" x="300" y="444" text-anchor="middle" font-family="Rubik" font-size="157" font-weight="700" fill="#ffffff">',
                            Strings.toString(numberOfReviews),
                            '</text>',
                            '</svg>'
                        )
                    )
                )
            )
        );
    }
}