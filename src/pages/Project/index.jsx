import { useEffect, useRef, useState } from "react";
import {
  Header,
  Footer,
  Button,
  InvestorBox,
  Slider,
  YouTubePlayer,
} from "../../components";
import { projectTabsData, formCategories, formTokens } from "../../constants";
import { SliderLoader, HeaderLoader } from "../../loaders";
import { formatNumber, timeDifference } from "../../utils";

import { useSelector } from "react-redux";

import {
  slider,
  Twitter,
  Discord,
  Telegram,
  Facebook,
  Web,
  youtube,
  wmatic,
} from "../../assets/img";

import { withTranslation } from "react-i18next";
const Project = ({ t }) => {
  const rxProjects = useSelector((state) => state.projects);
  const rxProject = useSelector((state) => state.project.info);
  console.log(rxProject.info);
  // tabs
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  // web3 info
  const [raised, setRaised] = useState(0);
  const [lockupTime, setLockupTime] = useState(0);
  const [category, setCategory] = useState("");
  const [token, setToken] = useState("");
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    state: "end",
  });

  //functions

  const timeController = () => {
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime < rxProject.info.startFunding) {
      let diff = timeDifference(rxProject.info.startFunding);
      setTimeDiff({ ...diff, state: "start" });
    }
    if (
      currentTime > rxProject.info.startFunding &&
      currentTime < rxProject.info.endFunding
    ) {
      let diff = timeDifference(rxProject.info.endFunding);
      setTimeDiff({ ...diff, state: "end" });
    }
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
    const tempCategory = formCategories.filter(
      (item) => item.value === rxProject.info.category
    );
    const tempToken = formTokens.filter(
      (token) => token.address === rxProject.info.token
    );
    timeController();
    setInterval(() => {
      timeController();
    }, 60000);
    setToken(tempToken[0].name);
    setCategory(tempCategory[0].name);
    setRaised(
      ((rxProject.info.totalRaised / rxProject.info.softCap) * 100).toFixed()
    );
    setLockupTime(rxProject.info.lockupTime / 86400);
  }, [rxProject]);
  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
        {rxProject ? (
          <img src={rxProject.info.headerLink} alt="projectBg" />
        ) : (
          <HeaderLoader />
        )}
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[70px] text-[#fff]">
          <p className="inter-bold  text-[32px] leading-9 md:text-[48px] md:leading-[58px] nav-shadow mb-[50px]">
            {rxProject.info.projectName}
          </p>
          <div className="flex items-start justify-between mb-[70px] flex-wrap">
            <div className="flex flex-wrap justify-center gap-5">
              <div className=" relative mr-0 md:mr-[50px]">
                <img src={slider} alt="projectImg" className="project-img" />
                {/*rxProject.info.preview*/}
                <div className="absolute bottom-[57.34px] projectLeft">
                  <div className="main-div">
                    <div className="main-1"></div>
                    <div
                      className="main-2"
                      style={{ width: `${raised}%` }}
                    ></div>
                    <div className="main-3 gap-5 md:gap-14">
                      <p>Total Raise</p>
                      <p>{`$${formatNumber(
                        rxProject.info.totalRaised
                      )} / $${formatNumber(rxProject.info.softCap)}`}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-[332px]">
                <h3 className="mb-[32px] inter-bold text-[24px] leading-7">
                  {t("highlights")}
                </h3>
                {rxProject.info.highlights.length ? (
                  rxProject.info.highlights.map((item) => {
                    return (
                      <p key={item.length} className="inter-300 mb-3">
                        {item}
                      </p>
                    );
                  })
                ) : (
                  <p className="inter-400">{rxProject.info.shortDesc}</p>
                )}

                <div className="flex items-center justify-between mt-5 inter-400">
                  <p>{t("lockup_time")}</p>{" "}
                  <p>
                    {lockupTime} {t("days")}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-5 inter-400">
                  <p>{t("reward")}</p>
                  <p>{rxProject.info.investorsReward} %</p>
                </div>
                <div className="flex flex-col items-center gap-4 mt-[30px]">
                  <a href={rxProject.info.whitepaperLink} target="_blank">
                    <button className="button-transparent w-[250px] py-[14px] whitespace-nowrap">
                      <p className="inter-400">{t("white_paper")}</p>
                    </button>
                  </a>
                  <Button
                    filled={true}
                    text={t("launchpad_invest")}
                    to="launchpad"
                  />
                </div>
              </div>
            </div>
            <div className="w-[100%] xl:w-[40%] mt-10">
              <div className="text-[24px] leading-[29px]">
                <div className="flex items-center justify-between">
                  <p className="inter-300 text-[#C7C7C7]">{t("soft_cap")}</p>
                  <p className="inter-normal">{`$${formatNumber(
                    rxProject.info.softCap
                  )}`}</p>
                </div>
                <div className="flex items-center justify-between mt-[17px]">
                  <p className="inter-300 text-[#C7C7C7]">{t("hard_cap")}</p>
                  <p className="inter-normal">{`$${formatNumber(
                    rxProject.info.hardCap
                  )}`}</p>
                </div>
              </div>
              <div className="mt-[60px] bg-[#1C1D2D] rounded-[10px] hoverEffect">
                <div className="py-5 px-[15px] flex flex-col items-center">
                  <div className="flex inter-bold text-[24px] leading-7 md:text-[32px] md:leading-[39px] mb-[30px] gap-4">
                    <p className="text-[#89C6B9] ">{t(timeDiff.state)}</p>
                    <p>{t("in")}</p>
                    <p>
                      {timeDiff.days} <sup>{t("clock_days")}</sup>
                    </p>
                    <p>
                      {timeDiff.hours} <sup>{t("clock_hours")}</sup>
                    </p>
                    <p>
                      {timeDiff.minutes} <sup>{t("clock_min")}</sup>
                    </p>
                  </div>
                  <Button
                    filled={false}
                    text={t("add_favorites")}
                    to="launchpad"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center flex-wrap mt-[100px] gap-6 md:gap-0">
                <div className="mr-5 inter-400">
                  {t("follow")} {rxProject.info.projectName}
                </div>
                <div className="flex items-center justify-between gap-[50px]">
                  {rxProject.info.socialMediaNames.map((social, index) => {
                    return (
                      <a
                        key={index}
                        className="social cursor-pointer"
                        href={rxProject.info.socialMediaLogins[index]}
                        target="_blank"
                      >
                        {social === "telegram" ? (
                          <Telegram className="w-6 h-6 md:w-9 md:h-9" />
                        ) : social === "twitter" ? (
                          <Twitter className="w-6 h-6 md:w-9 md:h-9" />
                        ) : social === "discord" ? (
                          <Discord className="w-6 h-6 md:w-9 md:h-9" />
                        ) : social === "facebook" ? (
                          <Facebook className="w-6 h-6 md:w-9 md:h-9" />
                        ) : (
                          <Web className="w-6 h-6 md:w-9 md:h-9" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-[87px]">
            {rxProject.info.youtubeLink ? (
              <YouTubePlayer
                videoId={rxProject.info.youtubeLink.split("v=")[1]}
              />
            ) : (
              <img src={youtube} alt="youtube" />
            )}
          </div>
          <div className="relative">
            <div className="flex items-center justify-center gap-[20px] md:gap-[80px] border-b border-[#000] border-opacity-25">
              {projectTabsData.map((tab, idx) => {
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
            {projectTabsData[activeTabIndex].label === "overview" ? (
              <div className="flex items-start justify-center flex-wrap gap-10 md:gap-5">
                <div className="flex flex-col gap-[25px] w-[302px] mt-0 md:mt-[42px]">
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("project_name")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      {rxProject.info.projectName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("website")}
                    </p>
                    <a
                      className="inter-bold text-[14px] leading-[17px] text-[#fff]"
                      href={rxProject.info.websiteLink}
                      target="_blank"
                    >
                      {rxProject.info.websiteLink}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("roadmap")}
                    </p>
                    <a
                      className="inter-bold text-[14px] leading-[17px] text-[#fff]"
                      href={rxProject.info.roadmapLink}
                      target="_blank"
                    >
                      {rxProject.info.roadmapLink}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("country")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      {rxProject.info.country}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("category")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      {t(category)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("token")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      {token}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("soft_cap")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      {`$${formatNumber(rxProject.info.softCap)}`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("hard_cap")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      {`$${formatNumber(rxProject.info.hardCap)}`}
                    </p>
                  </div>
                </div>
                <div className="w-[100%] md:w-[75%]">
                  <h1 className="inter-600 text-[32px] leading-[39px] mb-[36px]">
                    {rxProject.info.projectName}
                  </h1>
                  <p className="inter-300 text-[14px] leading-[17px]">
                    {rxProject.info.fullDesc}
                  </p>
                </div>
              </div>
            ) : (
              <div>test</div>
            )}
          </div>
          <div className="mt-[100px]">
            <h1 className="inter-normal text-[24px] leading-[29px] mb-[74px] uppercase">
              {t("investors")}
            </h1>
            <div className="flex items-center justify-center gap-5 md:gap-[40px] flex-wrap">
              <InvestorBox
                address="0xd1d6bf74282782b0b3eb1413c901d6ecf02e8e28"
                img={wmatic}
                amount="100,000"
              />
              <InvestorBox
                address="0xd1d6bf74282782b0b3eb1413c901d6ecf02e8e28"
                img={wmatic}
                amount="100,000"
              />
              <InvestorBox
                address="0xd1d6bf74282782b0b3eb1413c901d6ecf02e8e28"
                img={wmatic}
                amount="100,000"
              />
              <InvestorBox
                address="0xd1d6bf74282782b0b3eb1413c901d6ecf02e8e28"
                img={wmatic}
                amount="100,000"
              />
            </div>
          </div>
          <div className="mt-[90px] mb-[40px]">
            <p className="inter-bold text-[32px] leading-9 md:text-[48px] md:leading-[58px] mb-[100px] nav-shadow">
              {t("explore_more")}
            </p>
            {rxProjects.loaded ? <Slider /> : <SliderLoader />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Project);
