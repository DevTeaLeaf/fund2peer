import { useState, useEffect, useRef } from "react";
import { Header, Footer } from "../../components";

import { arrow, favorite, projectLogo } from "../../assets/img";

import { withTranslation } from "react-i18next";

const tabsData = [
  {
    label: "All launchpads",
  },
  {
    label: "My Favorites",
  },
];

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
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex];

      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

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
            Current Presales
          </p>
          <div className="relative">
            <div className="flex items-center justify-center gap-[80px]">
              {tabsData.map((tab, idx) => {
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
                    {tab.label}
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
            {tabsData[activeTabIndex].label === "All launchpads" ? (
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
                      Enter token name or token symbol
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
                      Token
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">No filter</p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                      Token
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">No filter</p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                      Token
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">No filter</p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                      Token
                    </p>
                    <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                      <div className="py-[10px] px-5 flex items-center">
                        <p className="mr-[15px] inter-400">No filter</p>
                        <img src={arrow} alt="open" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[100px] flex items-center flex-wrap gap-[20px]">
                  <div className="max-w-[348px] bg-[#13141F] rounded-[20px] border border-[#89C6B9]">
                    <div className="px-[30px] pt-[20px] pb-[50px] flex  flex-col justify-between">
                      <div className="flex items-start justify-between mb-6">
                        <img
                          src={projectLogo}
                          alt="projectLogo"
                          className="max-w-[100px] max-h-[100px] rounded-full"
                        />
                        <div className="flex items-end flex-col justify-between">
                          <p className="px-[10px] py-[5px] bg-[#89C6B9] border border-[#233A37] rounded-[30px] inter-normal text-[12px] leading-[15px]">
                            Verified
                          </p>
                          <p className="inter-600 text-[24px] leading-[29px] mt-[30px]">
                            Sequoia.game
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-[10px]">
                        <p className="inter-normal text-[14px] leading-[17px]">
                          Total Raise
                        </p>
                        <p className="inter-normal text-[20px] leading-[24px]">
                          50.5%
                        </p>
                      </div>
                      <div className="max-w-[289px] relative">
                        <div className="w-full h-3 projectLineBack"></div>
                        <div className="absolute bottom-0 w-[81%] h-3 projectLineFront"></div>
                      </div>
                      <div className="mt-[26px] flex justify-between items-center pb-5  border-b border-[#89C6B9] mb-5">
                        <div>
                          <p className="inter-normal text-[14px] leading-[17px] text-[#515151] mb-[7.5px]">
                            Soft Cap / Hard Cap
                          </p>
                          <p className="inter-300 text-[14px] leading-[17px]">
                            $520,000 / $800,000
                          </p>
                        </div>
                        <div className="flex items-center gap-5 inter-normal">
                          <p className="text-[24px] leading-[29px] pt-[11px] pr-[11px] pb-[10px] pl-3 bg-[#89C6B9] rounded-full">
                            10
                          </p>
                          <p className="text-[12px] leading-[15px]">
                            End in <br /> days
                          </p>
                        </div>
                      </div>
                      <div className="inter-normal text-[16px] leading-[19px]">
                        <div className="flex items-center justify-between mb-[15px]">
                          <p>Lockup time</p>
                          <p>180 days</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Reward</p>
                          <p>10 %</p>
                        </div>
                      </div>
                      <div className="mt-[44px] flex items-center justify-between">
                        <button className="button-transparent max-w-[186px] py-[14px] whitespace-nowrap">
                          <p className="inter-400">View</p>
                        </button>
                        <button className="button-transparent max-w-[52px] px-[15px] py-[15px] whitespace-nowrap">
                          <img src={favorite} alt="favorite" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[348px] bg-[#13141F] rounded-[20px] border border-[#89C6B9]">
                    <div className="px-[30px] pt-[20px] pb-[50px] flex  flex-col justify-between">
                      <div className="flex items-start justify-between mb-6">
                        <img
                          src={projectLogo}
                          alt="projectLogo"
                          className="max-w-[100px] max-h-[100px] rounded-full"
                        />
                        <div className="flex items-end flex-col justify-between">
                          <p className="px-[10px] py-[5px] bg-[#89C6B9] border border-[#233A37] rounded-[30px] inter-normal text-[12px] leading-[15px]">
                            Verified
                          </p>
                          <p className="inter-600 text-[24px] leading-[29px] mt-[30px]">
                            Sequoia.game
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-[10px]">
                        <p className="inter-normal text-[14px] leading-[17px]">
                          Total Raise
                        </p>
                        <p className="inter-normal text-[20px] leading-[24px]">
                          50.5%
                        </p>
                      </div>
                      <div className="max-w-[289px] relative">
                        <div className="w-full h-3 projectLineBack"></div>
                        <div className="absolute bottom-0 w-[81%] h-3 projectLineFront"></div>
                      </div>
                      <div className="mt-[26px] flex justify-between items-center pb-5  border-b border-[#89C6B9] mb-5">
                        <div>
                          <p className="inter-normal text-[14px] leading-[17px] text-[#515151] mb-[7.5px]">
                            Soft Cap / Hard Cap
                          </p>
                          <p className="inter-300 text-[14px] leading-[17px]">
                            $520,000 / $800,000
                          </p>
                        </div>
                        <div className="flex items-center gap-5 inter-normal">
                          <p className="text-[24px] leading-[29px] pt-[11px] pr-[11px] pb-[10px] pl-3 bg-[#89C6B9] rounded-full">
                            10
                          </p>
                          <p className="text-[12px] leading-[15px]">
                            End in <br /> days
                          </p>
                        </div>
                      </div>
                      <div className="inter-normal text-[16px] leading-[19px]">
                        <div className="flex items-center justify-between mb-[15px]">
                          <p>Lockup time</p>
                          <p>180 days</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Reward</p>
                          <p>10 %</p>
                        </div>
                      </div>
                      <div className="mt-[44px] flex items-center justify-between">
                        <button className="button-transparent max-w-[186px] py-[14px] whitespace-nowrap">
                          <p className="inter-400">View</p>
                        </button>
                        <button className="button-transparent max-w-[52px] px-[15px] py-[15px] whitespace-nowrap">
                          <img src={favorite} alt="favorite" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[348px] bg-[#13141F] rounded-[20px] border border-[#89C6B9]">
                    <div className="px-[30px] pt-[20px] pb-[50px] flex  flex-col justify-between">
                      <div className="flex items-start justify-between mb-6">
                        <img
                          src={projectLogo}
                          alt="projectLogo"
                          className="max-w-[100px] max-h-[100px] rounded-full"
                        />
                        <div className="flex items-end flex-col justify-between">
                          <p className="px-[10px] py-[5px] bg-[#89C6B9] border border-[#233A37] rounded-[30px] inter-normal text-[12px] leading-[15px]">
                            Verified
                          </p>
                          <p className="inter-600 text-[24px] leading-[29px] mt-[30px]">
                            Sequoia.game
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-[10px]">
                        <p className="inter-normal text-[14px] leading-[17px]">
                          Total Raise
                        </p>
                        <p className="inter-normal text-[20px] leading-[24px]">
                          50.5%
                        </p>
                      </div>
                      <div className="max-w-[289px] relative">
                        <div className="w-full h-3 projectLineBack"></div>
                        <div className="absolute bottom-0 w-[81%] h-3 projectLineFront"></div>
                      </div>
                      <div className="mt-[26px] flex justify-between items-center pb-5  border-b border-[#89C6B9] mb-5">
                        <div>
                          <p className="inter-normal text-[14px] leading-[17px] text-[#515151] mb-[7.5px]">
                            Soft Cap / Hard Cap
                          </p>
                          <p className="inter-300 text-[14px] leading-[17px]">
                            $520,000 / $800,000
                          </p>
                        </div>
                        <div className="flex items-center gap-5 inter-normal">
                          <p className="text-[24px] leading-[29px] pt-[11px] pr-[11px] pb-[10px] pl-3 bg-[#89C6B9] rounded-full">
                            10
                          </p>
                          <p className="text-[12px] leading-[15px]">
                            End in <br /> days
                          </p>
                        </div>
                      </div>
                      <div className="inter-normal text-[16px] leading-[19px]">
                        <div className="flex items-center justify-between mb-[15px]">
                          <p>Lockup time</p>
                          <p>180 days</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Reward</p>
                          <p>10 %</p>
                        </div>
                      </div>
                      <div className="mt-[44px] flex items-center justify-between">
                        <button className="button-transparent max-w-[186px] py-[14px] whitespace-nowrap">
                          <p className="inter-400">View</p>
                        </button>
                        <button className="button-transparent max-w-[52px] px-[15px] py-[15px] whitespace-nowrap">
                          <img src={favorite} alt="favorite" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[348px] bg-[#13141F] rounded-[20px] border border-[#89C6B9]">
                    <div className="px-[30px] pt-[20px] pb-[50px] flex  flex-col justify-between">
                      <div className="flex items-start justify-between mb-6">
                        <img
                          src={projectLogo}
                          alt="projectLogo"
                          className="max-w-[100px] max-h-[100px] rounded-full"
                        />
                        <div className="flex items-end flex-col justify-between">
                          <p className="px-[10px] py-[5px] bg-[#89C6B9] border border-[#233A37] rounded-[30px] inter-normal text-[12px] leading-[15px]">
                            Verified
                          </p>
                          <p className="inter-600 text-[24px] leading-[29px] mt-[30px]">
                            Sequoia.game
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-[10px]">
                        <p className="inter-normal text-[14px] leading-[17px]">
                          Total Raise
                        </p>
                        <p className="inter-normal text-[20px] leading-[24px]">
                          50.5%
                        </p>
                      </div>
                      <div className="max-w-[289px] relative">
                        <div className="w-full h-3 projectLineBack"></div>
                        <div className="absolute bottom-0 w-[81%] h-3 projectLineFront"></div>
                      </div>
                      <div className="mt-[26px] flex justify-between items-center pb-5  border-b border-[#89C6B9] mb-5">
                        <div>
                          <p className="inter-normal text-[14px] leading-[17px] text-[#515151] mb-[7.5px]">
                            Soft Cap / Hard Cap
                          </p>
                          <p className="inter-300 text-[14px] leading-[17px]">
                            $520,000 / $800,000
                          </p>
                        </div>
                        <div className="flex items-center gap-5 inter-normal">
                          <p className="text-[24px] leading-[29px] pt-[11px] pr-[11px] pb-[10px] pl-3 bg-[#89C6B9] rounded-full">
                            10
                          </p>
                          <p className="text-[12px] leading-[15px]">
                            End in <br /> days
                          </p>
                        </div>
                      </div>
                      <div className="inter-normal text-[16px] leading-[19px]">
                        <div className="flex items-center justify-between mb-[15px]">
                          <p>Lockup time</p>
                          <p>180 days</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Reward</p>
                          <p>10 %</p>
                        </div>
                      </div>
                      <div className="mt-[44px] flex items-center justify-between">
                        <button className="button-transparent max-w-[186px] py-[14px] whitespace-nowrap">
                          <p className="inter-400">View</p>
                        </button>
                        <button className="button-transparent max-w-[52px] px-[15px] py-[15px] whitespace-nowrap">
                          <img src={favorite} alt="favorite" />
                        </button>
                      </div>
                    </div>
                  </div>
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
