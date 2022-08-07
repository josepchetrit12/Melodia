// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract MelodiaTracking {
    address[] public arrayOfContracts;
    event NewContract(address indexed owner, address indexed newContract);
    function addNewContract(address _contract) public {
        arrayOfContracts.push(_contract);
        emit NewContract(msg.sender,_contract);
    }
    function geAllContract() public view returns(address[] memory){
        return arrayOfContracts;
    }
}
