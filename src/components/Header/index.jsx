import { useState } from "react";
import { Link } from "react-router-dom";
import { logo, arrow } from "../../assets/img";

import LanguagesModal from "../LanguagesModal";
import i18n from "../../translate/i18n";
import { withTranslation } from "react-i18next";

import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useContract, useSigner } from "wagmi";

const Header = ({ page }) => {
  const [modalActive, setModalActive] = useState(false);

  const account = useAccount();
  const contract = useContract();
  const signer = useSigner();
  console.log(account, contract, signer);

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();

  return (
    <header className="flex sticky top-0 inter-400 z-50">
      <nav className="sticky w-full bg-[#13141F] text-[#fff] nav-shadow">
        <div className="w-full flex items-center justify-between px-[30px] h-[80px]">
          <div className="flex items-center justify-center">
            <img className="cursor-pointer" src={logo} alt="logo" />
            <div className="ml-10">
              <div
                onClick={
                  modalActive
                    ? () => setModalActive(false)
                    : () => setModalActive(true)
                }
                className="cursor-pointer flex items-center pl-[34px] pr-[28px] py-2 bg-[#1C1D2D] rounded-[10px]"
              >
                <div className=" mr-[10px]">
                  {i18n.language === "ru" ? "Русский" : "English"}
                </div>
                <img
                  className={
                    modalActive
                      ? "rotate-[180deg] transition-[0.5s]"
                      : "transition-[0.5s]"
                  }
                  src={arrow}
                  alt="arrow"
                />
              </div>
              <LanguagesModal active={modalActive} setActive={setModalActive} />
            </div>
          </div>
          <div className="flex items-center gap-x-8">
            <Link
              className={`hover:opacity-100 ${
                page === "home" ? "opacity-100" : "opacity-70"
              }`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`hover:opacity-100 ${
                page === "dex" ? "opacity-100" : "opacity-70"
              }`}
              to="/dex"
            >
              DEX
            </Link>
            <Link
              className={`hover:opacity-100 ${
                page === "assets" ? "opacity-100" : "opacity-70"
              }`}
              to="/assets"
            >
              Assets
            </Link>
            <Link
              className={`hover:opacity-100 ${
                page === "p2p" ? "opacity-100" : "opacity-70"
              }`}
              to="/p2p"
            >
              P2P
            </Link>
            <Link
              className={`hover:opacity-100 ${
                page === "launchpad" ? "opacity-100" : "opacity-70"
              }`}
              to="/launchpad"
            >
              Launchpad
            </Link>
            <Link
              className={`hover:opacity-100 ${
                page === "xreturn" ? "opacity-100" : "opacity-70"
              }`}
              to="/xreturn"
            >
              XReturn
            </Link>
            <Link
              className={`hover:opacity-100 ${
                page === "faq" ? "opacity-100" : "opacity-70"
              }`}
              to="/faq"
            >
              FAQ
            </Link>
          </div>
          <button className="button-transparent" onClick={open}>
            <p className="py-[14px] pl-12 pr-[62px] whitespace-nowrap">
              {account.address
                ? account.address.slice(0, 4) +
                  "..." +
                  account.address.slice(-4)
                : "Connect Wallet"}
            </p>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default withTranslation()(Header);
