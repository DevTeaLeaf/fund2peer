import { useState, useEffect, useRef } from "react";
import { Header, Footer, PresaleBox } from "../../components";
import { presalesTabsData } from "../../constants";

import { arrow, projectLogo } from "../../assets/img";

import { withTranslation } from "react-i18next";

const CurrentPresales = ({ t }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  //for input
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  //for input

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
  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[70px] text-[#fff]">
          <p className="inter-bold text-[48px] leading-[58px] nav-shadow mb-[50px]">
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
                        ? "pb-[25px] text-[#fff] transition-all duration-1000 inter-normal text-[24px] leading-[29px]"
                        : "pb-[25px] text-[#515151] text-[24px] leading-[29px] "
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
                <div className="flex  justify-between items-end">
                  <div className="relative">
                    <label
                      className={
                        isFocused
                          ? "absolute text-[#89c6b9] top-[-12px] left-0 inter-normal text-[16px] leading-5 pointer-events-none hoverEffect"
                          : "absolute text-[#8d8e96] top-2 left-0 inter-400 pointer-events-none hoverEffect"
                      }
                    >
                      {t("current_search")}
                    </label>
                    <input
                      type="text"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="search focus:border-[#89c6b9] transition500"
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
                <div className="mt-[100px] flex items-center flex-wrap gap-[20px]">
                  <PresaleBox
                    projectLogo={projectLogo}
                    status="Verified"
                    name="Sequoia.game"
                    currentRaise="50.5"
                    softCap="520,000"
                    hardCap="800,000"
                    lockupTime="180"
                    reward="10"
                  />
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
