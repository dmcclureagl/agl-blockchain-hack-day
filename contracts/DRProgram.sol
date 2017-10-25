pragma solidity ^0.4.15;

contract DRProgram {

  address public rewardsToken_;

  /**
   * Set the address of the proram reward token upon deployment
   * @param _kwh The kwh token contract.
   * @constructor
   */
  function DRProgram(address _kwh) {
    rewardsToken_ = _khw;
  }


}
