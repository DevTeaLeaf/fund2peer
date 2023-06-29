// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "./IDataToBytes.sol";

/*interface ILaunchpadLogic {
    function accessCheck(bool _approved, address user, address _admin, address _projectOwner, bytes[] memory data) external view returns(bool);
}

contract LaunchpadDriver is Ownable {

    
    mapping(uint => projectInfo) public projectsList; //id => projectInfo
    mapping(address => bool) public allowedInvestTokens;

    uint[] public waitingList;
    uint public id = 1;
    uint public applicationFee = 1 ether; //no return
    uint public fee = 1000; //100 = 1% from each invest

    address launchpadLogic;
    address dataToBytes;
    address public feeCollector;

    bool isWorking = true;

    struct projectInfo {
        address projectAddress;
        bool approved;
    }

    constructor(address _feeCollector, address _logic, address _dataToBytes) {
        launchpadLogic = _logic;
        dataToBytes = _dataToBytes;
        feeCollector = _feeCollector;
    }

    function ApplyToCreateProject(uint minLock, string memory name, string memory ticker, bytes[] memory data) external payable {
        require(isWorking);
        require(msg.value >= applicationFee);
        projectsList[id].projectAddress = address(new LaunchpadProjectInfo(feeCollector, dataToBytes, minLock, id, name, ticker, launchpadLogic, fee, msg.sender, data));
        waitingList.push(id);
        id++;
        (bool success,) = feeCollector.call{value : address(this).balance}("");
        require(success);
    }

    function callFunctions(address _projectAddress, bytes[] memory data) public onlyOwner {
        LaunchpadProjectInfo(_projectAddress).callFunctions(data);
    } 

    function approveProject(uint _id, bytes[] memory data) external onlyOwner {
        callFunctions(projectsList[_id].projectAddress, data);
        _deleteIndex(_id);
    }
 
    function changeFee(uint _newFee) public onlyOwner {
        fee = _newFee;
    }

    function stopAndStart(bool _position) public onlyOwner {
        isWorking = _position;
    }

    function setInvestToken(address _tokenAddr, bool _position) public onlyOwner {
        allowedInvestTokens[_tokenAddr] = _position;
    }

    function _deleteIndex(uint _id) private {
        uint _index;
        for(uint i; i < waitingList.length;) {
            if(waitingList[i] == _id){
                _index = id;
                break;
            }
            i++;
        }
        for (uint i = _index; i < waitingList.length - 1; i++) {
            waitingList[i] = waitingList[i+1];
        }
        waitingList.pop();
    }
}*/

/*contract LaunchpadProjectInfo {

    //@Dev Fee, rewardPercentage: 100 = 1% 

    string public projectName;
    string public shortDescription;
    string public fullDescription;
    string public website;
    string public youtubeVideo;
    string public country;
    string public headerLink;
    string public previewLink;
    string public whitepaperLink;
    string public roadmapLink;
    string public businessPlanLink;
    string public additionalDocsLink;
    string[] public owners;
    string[] public highlights;

    string[] public socialMediaName;
    string[] public socialMediaLogin;
    string[] public socialMediaPersonName;
    string[] public socialMediaPersonLogin;
    string[] public socialMediaPersonType;
    string[] public personAvatarLink;
    
    address public projectOwner;
    address public admin;
    address public investToken;
    address public projectToken;
    address public launchpadLogic;
    address public feeCollector;
    address dataToBytes;

    uint public PROJECT_ID;
    uint public stage;
    uint public softCap;
    uint public hardCap;

    uint public collectedFees;
    uint public collectedFundTOTAL;
    uint public fee = 500;

    uint public investorsReward;
    uint public distributedFunds;
    uint public rewardPercentage;

    uint public startFunding;
    uint public endFunding;
    uint public category;
    uint public minimumLock;
    uint public currentBalance;
    
    bool public canceled;
    bool public verified;
    bool public approved;
    bool paidFees;


    mapping(uint => RoadMap) public roadmap; 
    mapping(address => uint) public rawInvested;
    
    struct RoadMap {
        string description;
        uint funds;
        bool ableToClaim;
    }

    bytes4[] _adminSelectors = [
        bytes4(0xb4e830f1), //ApproveProject
        bytes4(0x13c35f34), //changeVerification
        bytes4(0xca3555b8), //AllowToClaim
        bytes4(0x1adff0ee), //cancelProject
        bytes4(0x6a1db1bf)  //changeFee
    ];

    bytes4[] _userSelectors = [
        bytes4(0x2afcf480), //invest
        bytes4(0x4e71d92d), //claim
        bytes4(0x6d0c40fd), //getCollectedFunds
        bytes4(0x8a160b54), //DistributeProfit
        bytes4(0x590e1ae3)  //refund
    ];

    constructor(address _feeCollector, address _dataToBytes, uint minLock, uint id, string memory name, string memory ticker, address _logic, uint _fee, address _owner, bytes[] memory data){
        launchpadLogic = _logic;
        PROJECT_ID = id;
        fee = _fee;
        admin = msg.sender;
        projectOwner = _owner;
        minimumLock = minLock;
        dataToBytes = _dataToBytes;
        feeCollector = _feeCollector;
        for (uint i = 0; i < data.length; i++) {
            (bool success,) = launchpadLogic.delegatecall(data[i]);
            require(success);
        }
        projectToken = address(new ProjectToken(name, ticker));
    }

    function callFunctions(bytes[] memory data) external accessCheck(data){
        for (uint i = 0; i < data.length; i++) {
            (bool success,) = launchpadLogic.delegatecall(data[i]);
            require(success, "Call Functions : Failed");
        }
    }

    modifier accessCheck(bytes[] memory data) {
        bytes memory _data = IDataToBytes(dataToBytes).accessCheck(data);
        (bool success, ) = launchpadLogic.delegatecall(_data);
        require(success, "AccessCheck : Failed");
        _;
    }

}


contract ProjectToken is ERC20, Ownable {
    constructor(string memory name, string memory ticker) ERC20(name, ticker) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}*/