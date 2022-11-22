// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
contract LoyaltyToken is ERC20PresetMinterPauser , ERC20Capped,Ownable{
  bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
  uint8   private _decimals ;

  constructor (  string memory _name, 
        string memory _symbol,
        uint8 decimals_points, 
        uint256 _initialSupply) ERC20PresetMinterPauser(_name, _symbol)  ERC20Capped(999999999900000000000000000000 * 10**1){
        _decimals = decimals_points;
        ERC20._mint(msg.sender, _initialSupply);    
        grantRole(BURNER_ROLE, msg.sender);
    }
    
   function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override(ERC20, ERC20PresetMinterPauser) {
    super._beforeTokenTransfer(from, to, amount);
  }

  function burn(uint256 value) public onlyRole(BURNER_ROLE) override {
        super._burn(msg.sender, value);
  }
    
  function _mint(address to, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
    ERC20Capped._mint(to, amount);
  }

  function decimals() public view override returns (uint8) {
        return _decimals;
	}

  fallback() external payable { revert(); }

  receive() external payable {  revert(); }

}