const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("DripNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDripNFTFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SVGCreator = await ethers.getContractFactory("SVGCreator");
    const svgCreator = await SVGCreator.deploy();

    const Drip = await ethers.getContractFactory("DripNFT");
    const drip = await Drip.deploy(svgCreator.address);

    return { drip, svgCreator, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy contracts", async function () {
      const { drip, svgCreator } = await loadFixture(deployDripNFTFixture);

      expect(await drip.name()).to.equal("Drip Reputation NFT");
      expect(await drip.symbol()).to.equal("DRIPREP");
    });

    it("Should set the right owner", async function () {
      const { drip, owner } = await loadFixture(deployDripNFTFixture);

      expect(await drip.owner()).to.equal(owner.address);
    });

  });
});
