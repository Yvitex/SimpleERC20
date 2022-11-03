import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"; 
import { Contract } from "ethers";

describe("ERC20", function(){
  let myERC20Contract: Contract;
  let someAddress: SignerWithAddress;
  let someOtherAddress: SignerWithAddress;

  beforeEach(async function(){
    const ERC20ContractFactory = await ethers.getContractFactory("ERC20");
    myERC20Contract = await ERC20ContractFactory.deploy("Name", "Sym");
    await myERC20Contract.deployed()

    someAddress = (await ethers.getSigners())[1];
    someOtherAddress = (await ethers.getSigners())[2];

  })

  describe("When I have 10 tokens", function(){
    beforeEach(async function(){
      await myERC20Contract.transfer(someAddress.address, 10);
    });

    describe("If i transfer 10 tokens", function(){
      it("transfer correctly", async function(){
        await myERC20Contract
          .connect(someAddress)
          .transfer(someOtherAddress.address, 10);
        expect(
          await myERC20Contract.balanceOf(someOtherAddress.address)).to.equal(10);
          
      })
    })

    describe("If i transfer 12 tokens", function(){
      it("transfer correctly", async function(){
        await myERC20Contract
          .connect(someAddress)
          .transfer(someOtherAddress.address, 12);
        expect(
          await myERC20Contract.balanceOf(someOtherAddress.address)).to.equal(12);
          
      })
    })

    describe("If i transfer 15 tokens", function(){
      it("revert transaction", async function(){
        await expect(myERC20Contract
          .connect(someAddress)
          .transfer(someOtherAddress.address, 15))
          .to.be.revertedWith("ERC20 ERROR: Not Enough Balance").then(async ()=> {
            console.log(await myERC20Contract.balanceOf(someAddress.address))
          });  
      })
    })
  

  })









})