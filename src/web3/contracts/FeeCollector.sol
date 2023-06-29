// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//import "hardhat/console.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract feeCollector {

    address owner1 = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc; 
    address owner2 = 0x976EA74026E726554dB657fA54763abd0C3a0aa9;

    function changeOwner1(address _newOwner1) external {
        require(msg.sender == owner1);
        owner1 = _newOwner1;
    }

     function changeOwner2(address _newOwner2) external {
        require(msg.sender == owner2);
        owner2 = _newOwner2;
    }

     receive() external payable {
        uint _toOwner1 = msg.value * 9000 / 10000;
        uint _toOwner2 = msg.value - _toOwner1;
        payable(owner1).transfer(_toOwner1);
        payable(owner2).transfer(_toOwner2);
    }

    /*function getToken(address token) external {
        require(msg.sender == owner1 || msg.sender == owner2);
        uint _balance = IERC20(token).balanceOf(address(this));
        uint _toOwner1 = _balance * 9000 / 10000;
        uint _toOwner2 = _balance - _toOwner1;
        IERC20(token).transfer(owner1, _toOwner1);
        IERC20(token).transfer(owner2, _toOwner2);
    }*/
}