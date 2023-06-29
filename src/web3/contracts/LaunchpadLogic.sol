// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IProjectToken {
    function mint(address to, uint256 amount) external;
    function balanceOf(address _user) external returns(uint);
}

interface IAdmin {
    function allowedInvestTokens(address token) external view returns(bool);
}

contract LaunchpadLogic {

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

    bytes4[] _adminSelectors;
    bytes4[] _userSelectors;

    function changeCompanyName(string memory _newName) external {
        projectName = _newName;
    }

    function changeShortDescription(string memory _newShortDescription) external  {
        shortDescription = _newShortDescription;
    }

    function changeFullDescriprion(string memory _newfullDescription) external  {
        fullDescription = _newfullDescription;
    }

    function changeWebsite(string memory _newWebsite) external  {
        website = _newWebsite;
    }

    function changeVideo(string memory _newVideo) external  {
        youtubeVideo = _newVideo;
    }

    function changeCountry(string memory _newCountry) external {
        country = _newCountry;
     }

    function changeOwners(string[] memory _owners) external  {
        owners = _owners;
    }

    function changeProjectOwner(address _owner) external {
        projectOwner = _owner;
    }

    function changeToken(address _token) external {
        require(IAdmin(admin).allowedInvestTokens(_token));
        investToken = _token;
    }

    function changeCategory(uint _category) external  {
        category = _category;
    }

    function changeSoftCap(uint _soft) external  {
        softCap = _soft;
    }

    function changeHardCap(uint _hard) external  {
        hardCap = _hard;
    }

    function changeStart(uint _newStart) external {
        if(endFunding != 0){
            require(_newStart < endFunding);
        }
        require(_newStart > block.timestamp);
        startFunding = _newStart;
    }

    function changeEnd(uint _newEnd) external {
        require(_newEnd > block.timestamp && _newEnd > startFunding);
        endFunding = _newEnd;
    }

    function changeHighlights(string[] memory _newHighlights) external {
        highlights = _newHighlights;
    }

    function changeReward(uint _newReward) external {
        rewardPercentage = _newReward;
    }

    function changeSocialMediaName(string[] memory _name) external {
        socialMediaName = _name;
    }

    function changeSocialMediaLogin(string[] memory _login) external {
        socialMediaLogin = _login;
    }

    function changeSocialMediaPersonName(string[] memory _name) external {
        socialMediaPersonName = _name;
    }

    function changeSocialMediaPersonLogin(string[] memory _login) external {
        socialMediaPersonLogin = _login;
    }

    function changeSocialMediaPersonType(string[] memory _type) external {
        socialMediaPersonType = _type;
    }

    
    function changePersonAvatarLink(string[] memory _link) external {
        personAvatarLink = _link;
    }

    function changeHeaderLink(string memory _link) external {
        headerLink = _link;
    }

    function changePreviewLink(string memory _link) external {
        previewLink = _link;
    }

    function changeWhitepaperLink(string memory _link) external {
        whitepaperLink = _link;
    }

    function changeRoadmapLink(string memory _link) external {
        roadmapLink = _link;
    }

    function changeBusinessPlanLink(string memory _link) external {
        businessPlanLink = _link;
    }

    function changeAdditionalDocsLink(string memory _link) external {
        additionalDocsLink = _link;
    }

    function changeRoadMapDescription(string memory _description, uint _stageToChange) external {
        roadmap[_stageToChange].description = _description;
    }

    function changeMinlock(uint _newLock) external {
        minimumLock = _newLock;
    }

    function changeRoadmapFunds(uint _newFunds, uint _stageToChange) external {
        roadmap[_stageToChange].funds = _newFunds;
    }

    //====================================User functions=========================================//

    /*function invest(uint amount) external  {
        require(approved, "LaunchpadLogic : This project is not approved");
        require(block.timestamp > startFunding && block.timestamp < endFunding);
        uint _amountWithReward = amount + (amount * rewardPercentage /  10000);
        IERC20(investToken).transferFrom(msg.sender, address(this), amount);
        IProjectToken(projectToken).mint(msg.sender, _amountWithReward);
        
        uint _fees = amount * fee / 10000;
        collectedFees += _fees;
        collectedFundTOTAL += amount;
        rawInvested[msg.sender] += amount;
        uint _investReward = investorsReward;
        uint _addToReward = amount + (amount * rewardPercentage / 10000);
        investorsReward = _investReward + _addToReward;
    }*/

    /*function claim() external {  //Новая функция
        require(distributedFunds > 0, "LaunchpadLogic : Nothing to claim");
        uint _balance = IERC20(projectToken).balanceOf(msg.sender);
        require(_balance > 0);
        IERC20(projectToken).transferFrom(msg.sender, address(this), _balance);
        IERC20(investToken).transfer(msg.sender, _balance);
    }*/

    /*function refund() public {
        require(canceled);
        require(rawInvested[msg.sender] > 0);
        if(currentBalance > 0) {
            uint _positionSize = rawInvested[msg.sender] * 10000 / collectedFundTOTAL;
            _positionSize = currentBalance * _positionSize / 10000;
            rawInvested[msg.sender] = 0;
            IERC20(investToken).transfer(msg.sender, _positionSize);
        }
    }*/

    //====================================Project Owner functions=========================================//

    /*function distributeProfit() external { 
        require(msg.sender == projectOwner);
        require(roadmap[stage].funds == 0);
        IERC20(investToken).transferFrom(projectOwner, address(this) , investorsReward);
        distributedFunds = investorsReward;
    }*/
   

    /*function getCollectedFunds() external {
        require(msg.sender == projectOwner);
        require(collectedFundTOTAL >= softCap);
        require(block.timestamp > endFunding && !canceled);
        require(roadmap[stage].ableToClaim);
        IERC20(investToken).transfer(projectOwner, roadmap[stage].funds);
        if(!paidFees) {
            paidFees = true;
            IERC20(investToken).transfer(feeCollector, collectedFees);
        }
        stage++;
    }*/

    //====================================Admin functions=========================================//

    function approveProject() external {
        approved = true;
    }

    function changeVerification(bool _verification) external {
        verified = _verification;
    }

    function allowToClaim(bool _newPosition) external {
        roadmap[stage].ableToClaim = _newPosition;
    }

    
    function changeFee(uint _newFee) external {
        fee = _newFee;
    }

    /*function cancelProject() external {
        canceled = true;
        approved = false;
        currentBalance = IERC20(investToken).balanceOf(address(this));
    }*/  

    function accessCheck(bytes[] memory data) external view returns(bool){
        address _user = msg.sender;
        if(_user == admin) {
            return true;
        } else {
            if(approved) {
                for(uint i; i < data.length;){
                    bool matchFound;                       
                    for(uint j; j < _userSelectors.length;){
                        if (bytes4(data[i]) == _userSelectors[j]) {   
                            matchFound = true;
                            break;
                        }
                        j++;
                    }
                    i++;
                    require(matchFound);
                }
                return true;
            } else {
                if(_user != projectOwner) {
                    for(uint i; i < data.length;){
                        bool matchFound;
                        for(uint j; j < _userSelectors.length;){
                            if (bytes4(data[i]) == _userSelectors[j]) {
                                matchFound = true;
                                break;
                            }
                            j++;
                        }
                        i++;
                        require(matchFound);
                    }
                    return true;
                } else {
                    for(uint i; i < data.length;){
                        for(uint j; j < _adminSelectors.length;){
                            if (bytes4(data[i]) == _adminSelectors[j]) {
                                revert();
                            }
                            j++;
                        }
                        i++;
                    }
                    return true;
                }               
            }
        }
    }
}