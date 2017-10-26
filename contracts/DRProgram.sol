pragma solidity ^0.4.15;

import './token/Kwh.sol';


contract DRProgram {
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

    mapping(bytes32 => Contract) activeContracts_;
    mapping(address => bytes32) claimsMade_;

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
        Contract eventContract = activeContracts_[_id];
  
        if (eventContract.active) {
            if (eventContract.startTime + eventContract.duration > block.timestamp) {
                eventContract.paidOut = eventContract.paidOut.add(REWARD_AMOUNT * _energyReduction);
                require(Kwh(rewardsToken_).mint(msg.sender, REWARD_AMOUNT * _energyReduction));
            }
        }
        
    }

    function addContract(uint256 _duration, uint256 _maxPayout, uint256 _nonce) external {
        bytes32 id = keccak256(_duration, _maxPayout, _nonce);

        activeContracts_[id] = Contract(true, _duration, 0, _maxPayout, block.timestamp);
    }

    /**
    * kwh reduction
    * duration
    * payout Rate - Amounts, Upper Limit & Min
    */
}
