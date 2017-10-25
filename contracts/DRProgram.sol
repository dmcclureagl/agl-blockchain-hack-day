pragma solidity ^0.4.15;

import './token/ERC20.sol';

contract DRProgram {
  uint public constant REWARD_AMOUNT = 1;

  address public rewardsToken_;

  /**
   * Set the address of the proram reward token upon deployment
   * @param _kwh The kwh token contract.
   * @constructor
   */
  function DRProgram(address _kwh) {
    rewardsToken_ = _khw;
  }

  /**
   * User is claiming their rewards.
   * @return {[type]} [description]
   */
  function claimRewards() {
    /**
     * TODO
      Check that the claim is valid!
     */
    
    // mint will return false if it fails
    require(ERC20(rewardsToken_).mint(msg.sender, REWARD_AMOUNT));
  }
}
