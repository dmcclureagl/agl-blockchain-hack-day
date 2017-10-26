pragma solidity ^0.4.15;

import './token/Kwh.sol';
import './utils/SafeMath.sol';

contract DRProgram {
  using SafeMath for uint256;

  /**
   * Constants
   */
  uint public constant REWARD_AMOUNT = 1;

  /**
   * Contract struct
   * Enter more information when complete.
   */
  struct Contract {
      bool active;
      uint256 duration;
      uint256 paidOut;
      uint256 maxPayout;
      uint256 startTime;
  }

  /**
   * Storage
   */
  address public rewardsToken_;
  mapping(bytes32 => Contract) public activeContracts_;
  mapping(address => bytes32) public claimsMade_;

  /**
   * Events
   */
  LogContractAdded(bytes32 id);
  LogRewardsClaimed(bytes32 contractId, address user);

  /**
  * Set the address of the proram reward token upon deployment
  * @param _kwh The kwh token contract.
  */
  function DRProgram(address _kwh) {
      rewardsToken_ = _kwh;
  }

  /**
  * User is claiming their rewards. This method is to be called from a user's
  * EOA in order to earn rewards. User must be within the program, ie. have
  * opted in to the program.
  * @return _id The id of the contract the claim is being made against.
  * @return _energyReduction The amount of kw/h that have been reduced.
  */
  function claimRewards(
    bytes32 _id,
    uint256 _energyReduction
  ) external {
    /**
     * TODO
     * Check that the claim is valid!
     * Add an approved list of users who can make a claim
     */
    Contract memory eventContract = activeContracts_[_id];

    // Check if the event is active.
    if (eventContract.active) {
      uint rewardAmount = (REWARD_AMOUNT * _energyReduction);
      // Check if the startTime + duration ism't less than the current time.
      if (eventContract.startTime + eventContract.duration > block.timestamp) {
        // Set the contract to be inactive once the above check has been completed.
        // This is to make sure it can't repeat the same claimRewards()
        eventContract.active = false;

        // Check if the paidout + reward amount is less than maxPayout.
        if (eventContract.paidOut + rewardAmount < eventContract.maxPayout) {
          eventContract.paidOut = eventContract.paidOut.add(rewardAmount);
          require(Kwh(rewardsToken_).mint(msg.sender, rewardAmount));
          LogRewardsClaimed(_id, msg.sender);
        }
      }
    }
  }

  /**
   * An event has occured. Add a new contract for users to act on.
   * @param _duration The length this contract will be active for.
   * @param _maxPayout The maximum amount of rewards that may be paid out for
   * this contract.
   * @param _nonce Number used once, used to eliminate id collisions.
   */
  function addContract(
    uint256 _duration,
    uint256 _maxPayout,
    uint256 _nonce
  ) external
  {
    bytes32 id = keccak256(_duration, _maxPayout, _nonce);

    activeContracts_[id] = Contract({
        active: true,
        duration: _duration,
        paidAout: 0,
        maxPayout: _maxPayout,
        startTime: block.timestamp
    });

    LogContractAdded(id);
  }
}
