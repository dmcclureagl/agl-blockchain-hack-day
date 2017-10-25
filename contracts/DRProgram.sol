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
        bool terms;
        uint256 duration;
        uint256 payout;
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
    function claimRewards() {
        /**
        * TODO
          Check that the claim is valid!
        */

        // mint will return false if it fails
        require(Kwh(rewardsToken_).mint(msg.sender, REWARD_AMOUNT));
    }

    /**
    * kwh reduction
    * duration
    * payout Rate - Amounts, Upper Limit & Min
    */
}
