pragma solidity ^0.4.15;

import './token/Kwh.sol';
import './utils/SafeMath.sol';


contract DRProgram {
    using SafeMath for uint256;
    uint public constant REWARD_AMOUNT = 1;
    address public rewardsToken_;

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

    mapping(bytes32 => Contract) public activeContracts_;
    mapping(address => bytes32) public claimsMade_;

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
    function claimRewards(bytes32 _id, uint256 _energyReduction) external {
        /**
        * TODO
          Check that the claim is valid!
        */
        Contract storage eventContract = activeContracts_[_id];

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
                }
            }
        }
    }

    function addContract(uint256 _duration, uint256 _maxPayout, uint256 _nonce) external {
        bytes32 id = keccak256(_duration, _maxPayout, _nonce);

        activeContracts_[id] = Contract(
            true,
            _duration,
            0,
            _maxPayout,
            block.timestamp
        );
    }

    /**
    * kwh reduction
    * duration
    * payout Rate - Amounts, Upper Limit & Min
    */
}
