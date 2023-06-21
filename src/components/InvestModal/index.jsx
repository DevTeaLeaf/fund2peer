import { useState, useEffect, useRef } from "react";
import { withTranslation } from "react-i18next";
import { ethers } from "ethers";
import { useSigner } from "wagmi";

import { GAS } from "../../web3/constants";
import { close } from "../../assets/img";
import { decrypt, getGasPrice, getLimit } from "../../utils";

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
  const { data } = useSigner();
  const [inputValue, setInputValue] = useState("");
  const [approved, setApproved] = useState("wait");
  const modalRef = useRef(null);

  const handleInput = (itemId, value) => {
    setInputValue(value);
    allowanceController(value);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalActive(false);
    }
  };
  const allowanceController = async (amount) => {
    let allowance = await decrypt(
      await tokenContract.allowance(adresses.account, adresses.logic)
    );
    allowance /= 10 ** 18;
    if (amount === "" || amount <= 0) {
      setApproved("wait");
      return;
    }
    if (Number(allowance) < Number(amount)) {
      setApproved("approve");
    } else if (Number(allowance) >= Number(amount)) {
      setApproved("approved");
    }
  };
  const approve = async () => {
    const gasPrice = await getGasPrice(data.provider);
    const approve = await tokenContract.approve(
      adresses.logic,
      ethers.constants.MaxUint256,
      {
        gasLimit: GAS,
        gasPrice: gasPrice,
      }
    );
    await approve.wait();
    allowanceController(inputValue);
  };
  const invest = async (amount) => {
    const gasPrice = await getGasPrice(data.provider);
    amount = ethers.utils.parseUnits(amount, 18);

    const investBytes = await bytesContract.invest(amount);

    const gasLimit = await getLimit(
      await infoContract.estimateGas.callFunctions([investBytes])
    );
    const transaction = await infoContract.callFunctions([investBytes], {
      gasLimit: gasLimit,
      gasPrice: gasPrice,
    });
    await transaction.wait();
    setModalActive(false);
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
              id={Date.now()}
              input={token}
              value={inputValue}
              type={"number"}
              controller={handleInput}
            />
          </div>
          {approved === "wait" ? (
            <p className="inter-normal text-[20px] leading-[22px] mt-[80px] pb-2 border-b-[2px] border-[#89C6B9]">
              {t("enter_amount")}
            </p>
          ) : approved === "approve" ? (
            <div onClick={approve} className="mt-[50px]">
              <Button filled={false} text={`${t("approve")} ${token}`} />
            </div>
          ) : (
            <div onClick={() => invest(inputValue)} className="mt-[50px]">
              <Button filled={false} text={t("launchpad_invest")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(InvestModal);
