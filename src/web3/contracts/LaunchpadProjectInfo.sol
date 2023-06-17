contract LaunchpadProjectInfo {

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
    uint public investorsCountId;
    
    bool public canceled;
    bool public verified;
    bool public approved;
    bool public nextStageBool;
    bool paidFees;


    mapping(uint => RoadMap) public roadmap; 
    mapping(address => uint) public rawInvested;
    mapping(uint => address) public investorsCount;
    
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
        bytes4(0x590e1ae3), //refund
        bytes4(0xee3743ab)  //nextStage
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
        //projectToken = address(new ProjectToken(name, ticker));
    }

    function callFunctions(bytes[] memory data) external accessCheck(data){
        for (uint i = 0; i < data.length; i++) {
            (bool success,) = launchpadLogic.delegatecall(data[i]);
            require(success, "Call Functions : Failed");
        }
    }

    modifier accessCheck(bytes[] memory data) {
        //bytes memory _data = IDataToBytes(dataToBytes).accessCheck(data);
        //(bool success, ) = launchpadLogic.delegatecall(_data);
        //require(success, "AccessCheck : Failed");
        _;
    }

}