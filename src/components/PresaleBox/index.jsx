import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

import { setProjectAction } from "#store";
import { favorite } from "#assets/img";

const PresaleBox = ({
  projectLogo,
  status,
  name,
  currentRaise,
  softCap,
  hardCap,
  reward,
  lockupTime,
  time,
  project,
  t,
}) => {
  const dispatch = useDispatch();
  const setStoreProject = (project) => {
    dispatch(setProjectAction(project));
  };
  return (
    <div className="max-w-[348px] bg-[#13141F] rounded-[20px] border border-[#89C6B9]">
      <div className="px-[30px] pt-[20px] pb-[50px] flex  flex-col justify-between">
        <div className="flex items-start justify-between mb-6">
          <img
            src={projectLogo}
            alt="projectLogo"
            className="w-[80px] h-[80px] rounded-full mr-5"
          />
          <div className="flex items-end flex-col justify-between">
            <p
              className={`px-[10px] py-[5px] ${
                status ? "verified" : "not-verified"
              } border border-[#233A37] rounded-[30px] inter-normal text-[12px] leading-[15px]`}
            >
              {status ? "Verified" : "Not verified"}
            </p>
            <p className="inter-600 text-[24px] leading-[29px] mt-[30px]">
              {name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-[10px]">
          <p className="inter-normal text-[14px] leading-[17px]">
            {t("current_total")}
          </p>
          <p className="inter-normal text-[20px] leading-[24px]">
            {currentRaise}%
          </p>
        </div>
        <div className="max-w-[289px] relative">
          <div className="w-full h-3 projectLineBack"></div>
          <div
            className="absolute bottom-0 h-3 projectLineFront"
            style={{ width: `${currentRaise}%` }}
          ></div>
        </div>
        <div className="mt-[26px] flex justify-between items-center pb-5  border-b border-[#89C6B9] mb-5">
          <div>
            <p className="inter-normal text-[14px] leading-[17px] text-[#515151] mb-[7.5px]">
              {t("soft_cap")} / {t("hard_cap")}
            </p>
            <p className="inter-300 text-[14px] leading-[17px]">
              ${softCap} / ${hardCap}
            </p>
          </div>
          <div className="flex items-center gap-5 inter-normal">
            <p className="text-[24px] leading-[29px] pt-[11px] pr-[11px] pb-[10px] pl-3 bg-[#89C6B9] rounded-full">
              {time.days}
            </p>
            <p className="text-[12px] leading-[15px]">
              {time.state}
              <br /> in days
            </p>
          </div>
        </div>
        <div className="inter-normal text-[16px] leading-[19px]">
          <div className="flex items-center justify-between mb-[15px]">
            <p>{t("lockup_time")}</p>
            <p>
              {lockupTime} {t("days")}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>{t("reward")}</p>
            <p>{reward} %</p>
          </div>
        </div>
        <div className="mt-[44px] flex items-center justify-between">
          <Link to="/project">
            {" "}
            <button
              onClick={() => {
                setStoreProject(project);
              }}
              className="button-transparent max-w-[186px] py-[14px] whitespace-nowrap"
            >
              <p className="inter-400">{t("view")}</p>
            </button>
          </Link>
          <button className="button-transparent max-w-[52px] px-[15px] py-[15px] whitespace-nowrap">
            <img src={favorite} alt="favorite" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(PresaleBox);
