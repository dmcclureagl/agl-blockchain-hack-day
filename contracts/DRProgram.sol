pragma solidity ^0.4.15;

import './token/Kwh.sol';

contract DRProgram {
  uint public constant REWARD_AMOUNT = 1;

  address public rewardsToken_;

  /**
   * Set the address of the proram reward token upon deployment
   * @param _kwh The kwh token contract.
   */
  function DRProgram(address _kwh) {
    rewardsToken_ = _kwh;
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
    require(Kwh(rewardsToken_).mint(msg.sender, REWARD_AMOUNT));
  }
}
