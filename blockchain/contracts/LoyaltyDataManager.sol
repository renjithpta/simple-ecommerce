// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LoyaltyDataManager {
    using SafeMath for uint256;

    struct User {
        string userName;
        uint256 awardAmount;
        uint256 redeemAmount;
        uint256 currentBalance;
        bool isExits;
    }

    struct Rule {
        uint256 id;
        uint256 dollarAmt;
        uint256 tokenRate;
        bool active;
    }

    uint256 private custCount;
    uint256 private ruleCount;
    IERC20 public _token;
    address private owner;
    mapping(string => User) private customers;
    mapping(uint256 => Rule) private rules;
    uint256 public totalTransactions;
    uint256 public totalTokenAwarded;
    uint256 public totalTokenRedemtion;

    event TokenReward(string cutomer, uint256 tokenCount, uint256 amount);
    event TokenRedeem(
        address cutomer,
        uint256 tokensRedeemed,
        uint256 rule,
        uint256 deduction,
        uint256 balance
    );

    /**
     * @dev Set contract deployer as admin
     */
    constructor(address ERC20Address) {
        _token = IERC20(ERC20Address);
        owner = msg.sender ;
    }

    function isCustomerExits(string memory key) public view returns (bool) {
        if (customers[key].isExits) {
            return true;
        } else {
            return false;
        }
    }

    function getOwner() public view returns (address) {
        return msg.sender;
    }

    function getTokenTxDetails() public view returns (uint,uint) {
        return (totalTokenAwarded,totalTokenRedemtion);
    }
    
    
    modifier onlyOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(owner == msg.sender, "Caller is not owner");
        _;
    }

    function registerCustomer(string memory userName)
        public
        onlyOwner
        returns (bool)
    {
        require(!customers[userName].isExits, "Already exits!");
        customers[userName] = User(userName, 0, 0, 0, true);
        return true;
    }

    function removeCustomer(string memory userName)
        public
        onlyOwner
        returns (bool)
    {
        require(customers[userName].isExits, "Customer does not exits!");
        User storage customer = customers[userName];
        customer.isExits = false;
        return true;
    }

    function awardLoyaltyToken(string memory userName, uint256 count)
        public
        onlyOwner
        returns (bool)
    {
        require(customers[userName].isExits, "Customer does not exits!");
        User storage customer = customers[userName];
        customer.awardAmount = customer.awardAmount + count;
        customer.currentBalance = customer.currentBalance + count;
        return true;
    }

    function getCustomerDetails(string memory userName)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        require(customers[userName].isExits, "Customer does not exits!");
        User storage customer = customers[userName];
        return (
            customer.userName,
            customer.awardAmount,
            customer.redeemAmount,
            customer.currentBalance
        );
    }

    function addRule(uint256 dollarAmt, uint256 rate)
        public
        onlyOwner
        returns (bool)
    {
        ruleCount++;
        rules[ruleCount] = Rule(ruleCount, dollarAmt, rate, true);
        return true;
    }

    function applyAwardRule(
        string memory userName,
        uint256 ruleId,
        uint256 trxAmt
    ) public onlyOwner returns (uint256) {
        require(customers[userName].isExits, "Customer does not exits!");
        require(rules[ruleId].active, "Rule does not exits!");
        Rule storage awardRule = rules[ruleId];
        uint256 totalToakens = calculateReward(
            awardRule.dollarAmt,
            awardRule.tokenRate,
            trxAmt
        );
        User storage customer = customers[userName];
        customer.awardAmount = customer.awardAmount + totalToakens;
        customer.currentBalance = customer.currentBalance + totalToakens;
        totalTransactions++;
        totalTokenAwarded+= totalToakens;
        emit TokenReward(userName, totalToakens, trxAmt);
        return (totalToakens);
    }

    function getDivided(uint256 numerator, uint256 denominator)
        public
        pure
        returns (uint256 quotient, uint256 remainder)
    {
        quotient = numerator.div(denominator);
        remainder = numerator - (denominator * quotient);
        return (quotient, remainder);
    }

    function calculateReward(
        uint256 ruleAmount,
        uint256 tokenRate,
        uint256 txAmount
    ) internal pure returns (uint256) {
        (uint256 quotient, uint256 remainder) = getDivided(
            txAmount,
            ruleAmount
        );
        uint256 quotientToakens = 0;
        if (quotient > 0) {
            quotientToakens = quotient * (tokenRate);
        }

        uint256 totalToakens = quotientToakens + remainder;
        return (totalToakens);
    }
}
