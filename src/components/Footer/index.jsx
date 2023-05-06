import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="text-[#fff]">
        <div className="flex items-start justify-between px-[200px] py-[50px]">
          <div>
            <Link to="/">
              <h1 className="footerH">Home</h1>
            </Link>
            <div className="flex flex-col gap-[15px] footerP">
              <p>Roadmap</p>
              <p>Statistic</p>
              <p>Tokenomics</p>
            </div>
          </div>
          <div>
            <Link to="/dex">
              <h1 className="footerH">DEX</h1>
            </Link>
            <div className="flex flex-col gap-[15px] footerP">
              <p>Swap</p>
              <p>Limit Orders</p>
              <p>Pools</p>
            </div>
          </div>
          <div>
            <Link to="/assets">
              <h1 className="footerH">Assets</h1>
            </Link>
            <div className="flex flex-col gap-[15px] footerP">
              <p>Wrapped Assets</p>
              <p>Buy and sell "TokenName"</p>
              <p>Ecosystem</p>
            </div>
          </div>
          <div>
            <Link to="/p2p">
              <h1 className="footerH">P2P</h1>
            </Link>
            <div className="flex flex-col gap-[15px] footerP">
              <p>Become a P2P trader</p>
              <p>Buy and sell crypto for fiat</p>
              <p>Guide</p>
            </div>
          </div>
          <div>
            <Link to="/launchpad">
              <h1 className="footerH">Launchpad</h1>
            </Link>
            <div className="flex flex-col gap-[15px] footerP">
              <p>List your project</p>
              <p>Active Projects</p>
              <p>Guide</p>
            </div>
          </div>
          <div>
            <Link to="/xreturn">
              <h1 className="footerH">xReturn</h1>
            </Link>
            <div className="flex flex-col gap-[15px] footerP">
              <p>Invest</p>
              <p>My Positions</p>
              <p>Guide</p>
            </div>
          </div>
          <div>
            <Link to="/">
              <h1 className="footerH">Support</h1>
            </Link>
            <div className="flex flex-col gap-[15px] footerP">
              <p>FAQ</p>
              <p>Docs</p>
              <p>Contacts</p>
              <p>Commissions</p>
            </div>
          </div>
        </div>
        <div className="footerP text-center py-5 footerB">Fund2Peer©2023</div>
      </div>
    </>
  );
};

export default Footer;
