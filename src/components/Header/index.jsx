import { useState } from "react";
import { Link } from "react-router-dom";
import { logo, arrow } from "../../assets/img";

import "./header.css";

import LanguagesModal from "../LanguagesModal";
import i18n from "../../translate/i18n";
import { withTranslation } from "react-i18next";

import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useContract, useSigner } from "wagmi";

const Header = ({ page }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const account = useAccount();
  const contract = useContract();
  const signer = useSigner();

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();

  return (
    <header className="flex sticky top-0 inter-400 z-50">
      <nav className="sticky w-full bg-[#13141F] text-[#fff] header-shadow">
        <div className="w-full flex items-center justify-between px-[10px] md:px-[30px] h-[80px]">
          <div className="flex items-center justify-center">
            <img
              className="w-[50px] md:w-full cursor-pointer"
              src={logo}
              alt="logo"
            />
            <div className="ml-2 md:ml-10">
              <div
                onClick={
                  modalActive
                    ? () => setModalActive(false)
                    : () => setModalActive(true)
                }
                className="cursor-pointer flex items-center pl-[25px] pr-[21px] md:pl-[34px] md:pr-[28px] py-2 bg-[#1C1D2D] rounded-[10px]"
              >
                <div className="mr-[10px]">
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
          <div className="hidden xl:flex items-center gap-x-8">
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
          <button
            className="button-transparent hidden md:block xl:mr-0 mr-[40px]"
            onClick={open}
          >
            <p className="p-[12px] md:py-[14px] md:pl-12 md:pr-[62px] whitespace-nowrap">
              {account.address
                ? account.address.slice(0, 4) +
                  "..." +
                  account.address.slice(-4)
                : "Connect Wallet"}
            </p>
          </button>
          <section className="flex xl:hidden absolute right-[16px] md:right-[26px]">
            <div
              className="space-y-2 cursor-pointer"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-[2px] w-[21px] animate-pulse bg-[#fff]"></span>
              <span className="block h-[2px] w-[21px] animate-pulse bg-[#fff]"></span>
              <span className="block h-[2px] w-[21px] animate-pulse bg-[#fff]"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div className="absolute top-0 left-0 px-8 py-8 cursor-pointer">
                <img className="cursor-pointer" src={logo} alt="logo" />
              </div>
              <div
                className="absolute top-0 right-0 px-8 py-8 cursor-pointer"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-[#fff]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className="flex justify-center items-center flex-col w-full">
                <div className="text-[#fff] px-5 w-full">
                  <div className="flex justify-between items-center flex-col gap-8">
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
                    <button className="button-transparent" onClick={open}>
                      <p className="p-[12px] md:py-[14px] md:pl-12 md:pr-[62px] whitespace-nowrap">
                        {account.address
                          ? account.address.slice(0, 4) +
                            "..." +
                            account.address.slice(-4)
                          : "Connect Wallet"}
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </nav>
    </header>
  );
};

export default withTranslation()(Header);
