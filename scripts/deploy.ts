import { ethers } from "hardhat";

async function main() {

  const ERC20 = await ethers.getContractFactory("ERC20");
  const erc20 = await ERC20.deploy("YAMETE", "YAM");

  await erc20.deployed();

  console.log(`Token deployed to ${erc20.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
