// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const SVGCreator = await hre.ethers.getContractFactory("SVGCreator");
  const svgCreator = await SVGCreator.deploy();

  await svgCreator.deployed();

  console.log(
    `SVG deployed to ${svgCreator.address}`
  );

  const DripNFT = await hre.ethers.getContractFactory("DripNFT");
  const dripNFT = await DripNFT.deploy(svgCreator.address);

  await dripNFT.deployed();

  console.log(
    `DripNFT deployed to ${dripNFT.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
