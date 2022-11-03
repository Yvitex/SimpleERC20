// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.17;

contract ERC20 {
    uint256 public totalSupply;
    string public name;
    string public symbol;

    event Transfer(address indexed to, address indexed from, uint256 amount);
    event Approve(address indexed owner, address indexed spender, uint256 amount);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(string memory _name, string memory _symbol){
        name = _name;
        symbol = _symbol;

        _mint(msg.sender, 100e18);
    }

    function getDecimal() external pure returns (uint8){
        return 16;
    }

    function transfer(address recipient, uint256 amount) external returns (bool){
        return _transfer(msg.sender, recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool){
        uint256 allowedBalance = allowance[sender][msg.sender];
        require(allowedBalance >= amount, "ERC20: Not enough balances");
        allowance[sender][msg.sender] = allowedBalance - amount;

        emit Approve(sender, msg.sender, amount);

        return _transfer(sender, recipient, amount);
    }

    function approve(address spender, uint256 amount) external returns (bool){
        require(spender != address(0), "ERC20 ERR: No Spender Address");
        allowance[msg.sender][spender] = amount;

        emit Approve(msg.sender, spender, amount);

        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) private returns (bool){
        require(recipient != address(0), "ERC20 ERROR: Zero Address Found");
        uint256 senderBalance = balanceOf[sender];

        require(senderBalance >= amount, "ERC20 ERROR: Not Enough Balance");
        balanceOf[sender] = senderBalance - amount;
        balanceOf[recipient] += amount;

        emit Transfer(sender, recipient, amount);

        return true;
    }

    function _mint(address to, uint256 amount) internal {
        require(to != address(0), "ERC20 ERR: No Address Found");
        totalSupply += amount;
        balanceOf[to] += amount;

        emit Transfer(address(0), to, amount);
    }
}
