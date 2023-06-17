import { useState, useEffect, useRef } from "react";
import { withTranslation } from "react-i18next";
import { ethers } from "ethers";

import { GAS } from "../../web3/constants";
import { close } from "../../assets/img";
import { decrypt } from "../../utils";

import Button from "../Button";
import Input from "../Input";

const InvestModal = ({
  t,
  setModalActive,
  token,
  adresses,
  tokenContract,
  bytesContract,
  infoContract,
}) => {
  const [inputValue, setInputValue] = useState("");
  const modalRef = useRef(null);

  const handleInput = (itemId, value) => {
    setInputValue(value);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalActive(false);
    }
  };
  const invest = async (amount) => {
    let allowance = await decrypt(
      await tokenContract.allowance(adresses.account, adresses.logic)
    );
    allowance /= 10 ** 18;

    if (Number(allowance) < Number(amount)) {
      const approve = await tokenContract.approve(
        adresses.logic,
        ethers.constants.MaxUint256,
        {
          gasLimit: GAS,
        }
      );
      await approve.wait();
    }

    amount = ethers.utils.parseUnits(amount, 18);

    const investBytes = await bytesContract.invest(amount);

    const transaction = await infoContract.callFunctions([investBytes], {
      gasLimit: 30000000,
    });
    console.log(transaction);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflowY = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="bg-[#13141f] w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[50] opacity-80"></div>
      <div
        ref={modalRef}
        className="text-[#fff] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[51] max-w-[500px] w-full bg-[#1C1D2D] rounded-[10px] h-[300px] tabShadow"
      >
        <img
          className="absolute right-5 top-5 cursor-pointer"
          src={close}
          alt="close"
          onClick={() => {
            setModalActive(false);
          }}
        />
        <div className="p-10 flex items-center flex-col">
          <p className="inter-normal text-[20px] leading-[22px] mb-[30px]">{`${t(
            "invest_amount"
          )}`}</p>
          <div className="w-full">
            <Input
              id={111}
              input={token}
              value={inputValue}
              type={"number"}
              controller={handleInput}
            />
          </div>

          <div onClick={() => invest(inputValue)} className="mt-[50px]">
            <Button filled={false} text={t("launchpad_invest")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(InvestModal);
