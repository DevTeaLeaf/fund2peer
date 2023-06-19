import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Header, Footer, PresaleBox, Input } from "../../components";
import { presalesTabsData, formTokens } from "../../constants";
import { formatNumber, timeDifference } from "../../utils";
import { arrow } from "../../assets/img";

import { withTranslation } from "react-i18next";

const CurrentPresales = ({ t }) => {
  const rxProjects = useSelector((state) => state.projects);
  console.log(rxProjects.info);
  //tabs
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);
  //logic
  const [inputValue, setInputValue] = useState("");

  const handleInput = (itemId, value) => {
    setInputValue(value);
  };

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);
  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);
  useEffect(() => {
    console.log(rxProjects.info);
    const tokenTab = rxProjects.info
      .map(({ info }) => info.token)
      .filter((token, index, array) => array.indexOf(token) === index);
    const countryTab = rxProjects.info
      .map(({ info }) => info.country)
      .filter((country, index, array) => array.indexOf(country) === index);
    console.log("tok", tokenTab);
    console.log("tok", countryTab);
  }, [rxProjects]);
  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[70px] text-[#fff]">
          <p className="inter-bold text-[32px] leading-9 md:text-[48px] md:leading-[58px] nav-shadow mb-[50px]">
            {t("current_presales")}
          </p>
          <div className="relative">
            <div className="flex items-center justify-center gap-[80px]">
              {presalesTabsData.map((tab, idx) => {
                return (
                  <button
                    key={idx}
                    ref={(el) => (tabsRef.current[idx] = el)}
                    className={
                      activeTabIndex === idx
                        ? "pb-[25px] text-[#fff] transition-all duration-1000 inter-normal text-[16px] leading-[10px] md:text-[24px] md:leading-[29px]"
                        : "pb-[25px] text-[#515151] text-[16px] leading-[10px] md:text-[24px] md:leading-[29px] "
                    }
                    onClick={() => setActiveTabIndex(idx)}
                  >
                    {t(tab.label)}
                  </button>
                );
              })}
            </div>
            <span
              className="absolute bottom-0 block h-[7px] bg-[#89C6B9] rounded-[10px] transition-all duration-300 tab-shadow"
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
            />
          </div>
          <div className="mt-[70px]">
            {presalesTabsData[activeTabIndex].label === "all_launchpads" ? (
              <div>
                <div className="flex  justify-between items-end flex-wrap gap-5">
                  <div className="w-[30%] min-w-[300px]">
                    <Input
                      id={Date.now()}
                      input={t("current_search")}
                      type="text"
                      value={inputValue}
                      controller={handleInput}
                    />
                  </div>
                  <div>
                    <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                      {t("token")}
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">
                          {t("current_filter")}
                        </p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                      {t("time")}
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">
                          {t("current_filter")}
                        </p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                      {t("country")}
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">
                          {t("current_filter")}
                        </p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                      {t("state")}
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">
                          {" "}
                          {t("current_filter")}
                        </p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[100px] flex items-center justify-center flex-wrap gap-[20px] mb-[100px]">
                  {rxProjects.info.map((project) => {
                    const token = formTokens.filter(
                      (token) => token.address === project.info.token
                    );
                    const raise = String(
                      (
                        (project.info.totalRaised / project.info.softCap) *
                        100
                      ).toFixed()
                    );
                    const currentTime = Math.floor(Date.now() / 1000);
                    let days;
                    let startState = "Start";
                    if (currentTime < project.info.startFunding) {
                      const timeDiff = timeDifference(
                        project.info.startFunding
                      );
                      days = timeDiff.days;
                    }
                    if (
                      currentTime > project.info.startFunding &&
                      currentTime < project.info.endFunding
                    ) {
                      const timeDiff = timeDifference(project.info.endFunding);
                      days = timeDiff.days;
                      startState = "End";
                    }
                    if (project.info.startFunding == 0) {
                      days = 0;
                    }
                    const time = { state: startState, days: days };
                    return (
                      <PresaleBox
                        key={project.address}
                        projectLogo={token[0].img}
                        status={project.info.verified}
                        name={project.info.projectName}
                        currentRaise={raise}
                        softCap={formatNumber(project.info.softCap)}
                        hardCap={formatNumber(project.info.hardCap)}
                        lockupTime={project.info.lockupTime / 86400}
                        reward={project.info.investorsReward}
                        time={time}
                        project={project}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(CurrentPresales);
