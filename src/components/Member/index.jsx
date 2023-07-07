import { useState, useEffect } from "react";
import Input from "../Input";
import {
  Twitter,
  Discord,
  Telegram,
  Facebook,
  slimArrow,
  dimensionWarning,
} from "../../assets/img";
import { withTranslation } from "react-i18next";

const Member = ({
  memberInputs,
  setMemberInputs,
  network,
  team,
  setTeam,
  index,
  t,
}) => {
  const [modal, setModal] = useState(false);
  const [social, setSocial] = useState(network);
  const [thisMemberInputs, setThisMemberInputs] = useState(memberInputs[index]);

  const socialModalController = (social) => {
    setModal(false);

    if (social === "telegram") {
      setSocial(["telegram", <Telegram className="w-[28px] h-[28px]" />]);
    }
    if (social === "twitter") {
      setSocial(["twitter", <Twitter className="w-[28px] h-[28px]" />]);
    }
    if (social === "discord") {
      setSocial(["discord", <Discord className="w-[28px] h-[28px]" />]);
    }
    if (social === "facebook") {
      setSocial(["facebook", <Facebook className="w-[28px] h-[28px]" />]);
    }
    const updatedTeam = [...team];
    updatedTeam[index].network = social;
    setTeam(updatedTeam);
  };
  const handleInputs = (itemId, value, inputs, setInputs) => {
    const updatedInputs = inputs.map((item) =>
      item.id === itemId ? { ...item, value: value } : { ...item }
    );

    const updatedArray = [...memberInputs];
    updatedArray[index] = updatedInputs;

    const updatedTeam = [...team];
    updatedTeam[index].inputs = updatedInputs;
    updatedTeam[index].network = social?.[0];

    setInputs(updatedArray);
    setThisMemberInputs(updatedInputs);
    setTeam(updatedTeam);
  };
  useEffect(() => {
    socialModalController(network);
  }, []);
  return (
    <div className="mb-5">
      <p className="inter-normal mb-4">
        {t("member")} {index + 1}
      </p>
      <div className="flex items-start gap-10 flex-wrap justify-center md:justify-between xl:justify-normal">
        <div className="max-w-[390px] xl:w-[30%]">
          <Input
            key={thisMemberInputs[0].id}
            id={thisMemberInputs[0].id}
            input={t(thisMemberInputs[0].input)}
            type={thisMemberInputs[0].type}
            value={thisMemberInputs[0].value}
            inputs={thisMemberInputs}
            setInputs={setMemberInputs}
            controller={handleInputs}
          />
        </div>
        <div className="max-w-[520px] xl:w-[40%]">
          <Input
            key={thisMemberInputs[1].id}
            id={thisMemberInputs[1].id}
            input={t(thisMemberInputs[1].input)}
            type={thisMemberInputs[1].type}
            value={thisMemberInputs[1].value}
            inputs={thisMemberInputs}
            setInputs={setMemberInputs}
            controller={handleInputs}
          />
          <div className="mt-3 flex items-center gap-4">
            <img src={dimensionWarning} alt="dimension warning" />
            <div className="inter-normal text-[14px] leading-[17px]">
              {t("size")} 194x194
            </div>
          </div>
        </div>
        <div className=" flex items-end gap-3">
          <Input
            key={thisMemberInputs[2].id}
            id={thisMemberInputs[2].id}
            input={t(thisMemberInputs[2].input)}
            type={thisMemberInputs[2].type}
            value={thisMemberInputs[2].value}
            inputs={thisMemberInputs}
            setInputs={setMemberInputs}
            controller={handleInputs}
          />

          <div className="relative">
            <div
              onClick={modal ? () => setModal(false) : () => setModal(true)}
              className={`max-w-[46px] ${
                social
                  ? "p-[9px] bg-[#89C6B9]"
                  : "pt-[22px] pl-[16px] pb-[17.5px] pr-[17px]"
              } border border-[#89C6B9] rounded-[10px] cursor-pointer`}
            >
              {social ? (
                social[1]
              ) : (
                <img
                  className={
                    modal
                      ? "rotate-[180deg] transition-[0.5s] min-w-[12px]"
                      : "transition-[0.5s] min-w-[12px]"
                  }
                  src={slimArrow}
                  alt="slimArrow"
                />
              )}
            </div>
            <div
              className={
                modal
                  ? "bg-[#13141F] border border-[#89C6B9] rounded-l-[10px] rounded-br-[10px] absolute top-[60px] right-0 transition300 z-10"
                  : "hidden transition300"
              }
            >
              <div className="inter-400 flex flex-col gap-[25px] px-[30px] py-5">
                <div
                  onClick={() => {
                    socialModalController("telegram");
                  }}
                  className={`flex items-center gap-[25px] cursor-pointer nickname ${
                    social?.[0] == "telegram" ? "active" : ""
                  }`}
                >
                  <Telegram className="w-6 h-6 md:w-9 md:h-9 social" />
                  <p>Telegram</p>
                </div>
                <div
                  onClick={() => {
                    socialModalController("twitter");
                  }}
                  className={`flex items-center gap-[25px] cursor-pointer nickname ${
                    social?.[0] == "twitter" ? "active" : ""
                  }`}
                >
                  <Twitter className="w-6 h-6 md:w-9 md:h-9 social" />
                  <p>Twitter</p>
                </div>
                <div
                  onClick={() => {
                    socialModalController("discord");
                  }}
                  className={`flex items-center gap-[25px] cursor-pointer nickname ${
                    social?.[0] == "discord" ? "active" : ""
                  }`}
                >
                  <Discord className="w-6 h-6 md:w-9 md:h-9 social" />
                  <p>Discord</p>
                </div>
                <div
                  onClick={() => {
                    socialModalController("facebook");
                  }}
                  className={`flex items-center gap-[25px] cursor-pointer nickname ${
                    social?.[0] == "facebook" ? "active" : ""
                  }`}
                >
                  <Facebook className="w-6 h-6 md:w-9 md:h-9 social" />
                  <p>Facebook</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withTranslation()(Member);
