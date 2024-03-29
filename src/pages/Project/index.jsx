import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useSigner, useContract, useAccount } from "wagmi";
import { useSelector } from "react-redux";

import { PROJECT_TABS_DATA, FORM_CATEGORIES, FORM_TOKENS } from "#constants";
import { SliderLoader, HeaderLoader } from "#loaders";
import { formatNumber, timeDifference, getLimit } from "#utils";

import {
  TokenABI,
  DataToBytesABI,
  LaunchProjectInfoABI,
  LaunchpadLogicABI,
} from "#web3/abi";
import { DATA_TO_BYTES, GAS } from "#web3/constants";
import {
  slider,
  Twitter,
  Discord,
  Telegram,
  Facebook,
  Web,
  youtube,
} from "#assets/img";
import {
  Header,
  Footer,
  Button,
  InvestorBox,
  Slider,
  YouTubePlayer,
  InvestModal,
} from "#components";

const Project = ({ t }) => {
  const { data } = useSigner();
  const { address } = useAccount();

  const rxProjects = useSelector((state) => state.projects);
  const rxProject = useSelector((state) => state.project.info);

  const navigate = useNavigate();
  // tabs
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);
  // logic variables
  const [investModalActive, setInvestModalActive] = useState(false);
  const [projectState, setProjectState] = useState(false);
  const [topInvestors, setTopInvestors] = useState([]);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [claimState, setClaimState] = useState(false);

  // web3
  const [owner, setOwner] = useState(false);
  const TContract = useContract({
    address: rxProject?.info.token,
    abi: TokenABI,
    signerOrProvider: data,
  });
  const DTBContract = useContract({
    address: DATA_TO_BYTES,
    abi: DataToBytesABI,
    signerOrProvider: data,
  });
  const LPIContract = useContract({
    address: rxProject?.address,
    abi: LaunchProjectInfoABI,
    signerOrProvider: data,
  });
  const LContract = useContract({
    address: rxProject?.address,
    abi: LaunchpadLogicABI,
    signerOrProvider: data,
  });
  const [raised, setRaised] = useState(0);
  const [lockupTime, setLockupTime] = useState(0);
  const [adresses, setAdresses] = useState({});
  const [category, setCategory] = useState("");
  const [token, setToken] = useState("");
  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    state: "end",
  });
  //functions
  const fundsController = async (state) => {
    let bytes;
    if (state === "claim") {
      bytes = await DTBContract.claim();
    }
    if (state === "refund") {
      bytes = await DTBContract.refund();
    }

    const gasLimit = await getLimit(
      await LPIContract.estimateGas.callFunctions([bytes])
    );
    const transaction = await LPIContract.callFunctions([bytes], {
      gasLimit: gasLimit,
    });
    await transaction.wait();
  };
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
  const topInvestorsController = () => {
    const sortedInvestors = [...rxProject.info.investors]
      .sort((a, b) => a.invested - b.invested)
      .reverse();

    setTopInvestors(sortedInvestors.slice(0, 4));
  };
  const ownerButtonsController = async (button = false) => {
    const owner = await LContract.projectOwner();
    setOwner(owner);
    switch (button) {
      case "nextStage":
        const nextStageBytes = await DTBContract.nextStage();
        const nextStage = await LPIContract.callFunctions([nextStageBytes], {
          gasLimit: GAS,
        });
        console.log(nextStage);
        await nextStage.wait();
        break;
      case "getCollectedFunds":
        const getCollectedFundsBytes = await DTBContract.getCollectedFunds();

        const getCollectedFunds = await LPIContract.callFunctions(
          [getCollectedFundsBytes],
          {
            gasLimit: GAS,
          }
        );
        console.log(getCollectedFunds);
        await getCollectedFunds.wait();
        break;
      case "distributeProfit":
        const distributeProfitBytes = await DTBContract.distributeProfit();

        const distributeProfit = await LPIContract.callFunctions(
          [distributeProfitBytes],
          {
            gasLimit: GAS,
          }
        );
        console.log(distributeProfit);
        await distributeProfit.wait();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      if (currentTab) {
        setTabUnderlineLeft(currentTab.offsetLeft);
        setTabUnderlineWidth(currentTab.clientWidth);
      }
    };

    setTimeout(() => {
      setTabPosition();
    }, 0);

    window.addEventListener("resize", setTabPosition);

    return () => {
      window.removeEventListener("resize", setTabPosition);
    };
  }, [activeTabIndex, tabsRef]);
  useEffect(() => {
    if (rxProjects.loaded) {
      const now = Math.floor(Date.now() / 1000);
      if (
        now > rxProject.info.startFunding &&
        now < rxProject.info.endFunding
      ) {
        setProjectState(true);
      }
      if (now > rxProject.info.endFunding && !rxProject.info.canceled) {
        setClaimState(true);
      }
      const tempCategory = FORM_CATEGORIES.filter(
        (item) => item.value === rxProject.info.category
      );
      const tempToken = FORM_TOKENS.filter(
        (token) => token.address === rxProject.info.token
      );
      timeController();
      topInvestorsController();
      setToken(tempToken[0]);
      setCategory(tempCategory[0].name);
      setAdresses({
        logic: rxProject.address,
        token: rxProject.info.token,
        account: address,
      });
      setRaised(
        ((rxProject.info.totalRaised / rxProject.info.softCap) * 100).toFixed()
      );
      setLockupTime(rxProject.info.lockupTime / 86400);
      setProjectLoaded(true);
      setInterval(() => {
        timeController();
      }, 60000);
    } else {
      navigate("/launchpad");
    }
  }, [rxProject]);
  useEffect(() => {
    ownerButtonsController();
    setActiveTabIndex(0);
  }, [data]);
  return (
    <>
      <Header page="launchpad" />
      {projectLoaded && (
        <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
          {rxProject ? (
            <img src={rxProject.info.headerLink} alt="projectBg" />
          ) : (
            <HeaderLoader />
          )}
          <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[70px] text-[#fff]">
            <div className="flex  flex-wrap md:justify-between justify-center ">
              {" "}
              <p className="inter-bold  text-[32px] leading-9 md:text-[48px] md:leading-[58px] nav-shadow md:mb-[50px]">
                {rxProject.info.projectName}
              </p>
              {owner === address && (
                <div className="flex justify-center md:justify-between flex-wrap gap-5 my-5 xl:my-0">
                  <div onClick={() => ownerButtonsController("nextStage")}>
                    <Button filled={false} text={t("next_stage")} />
                  </div>
                  <div
                    onClick={() => ownerButtonsController("getCollectedFunds")}
                  >
                    <Button filled={false} text={t("get_funds")} />
                  </div>
                  <div
                    onClick={() => ownerButtonsController("distributeProfit")}
                  >
                    <Button filled={false} text={t("distribute_profit")} />
                  </div>
                </div>
              )}
            </div>
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

                    {rxProject.info.canceled ? (
                      <div onClick={() => fundsController("refund")}>
                        <Button filled={true} text={t("refund")} />
                      </div>
                    ) : claimState ? (
                      <div onClick={() => fundsController("claim")}>
                        <Button filled={true} text={t("claim")} />
                      </div>
                    ) : (
                      <div onClick={() => setInvestModalActive(projectState)}>
                        <Button
                          filled={true}
                          text={t("launchpad_invest")}
                          active={projectState}
                        />
                      </div>
                    )}
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
                {PROJECT_TABS_DATA.map((tab, idx) => {
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
              {PROJECT_TABS_DATA[activeTabIndex].label === "overview" ? (
                <div className="flex items-start justify-center flex-wrap gap-10 md:gap-5">
                  <div className="flex flex-col gap-[25px] w-[302px]">
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
                        {token.name}
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
                    <p className="inter-400">{rxProject.info.fullDesc}</p>
                  </div>
                </div>
              ) : PROJECT_TABS_DATA[activeTabIndex].label === "team" ? (
                <div>
                  {rxProject.info.team.map((teammate, index) => {
                    let social;
                    let link;
                    switch (teammate.socialType) {
                      case "telegram":
                        social = <Telegram className="w-[14px] h-[14px]" />;
                        link = `t.me/${teammate.socialLogin}`;
                        break;
                      case "twitter":
                        social = <Twitter className="w-[14px] h-[14px]" />;
                        link = `twitter.com/${teammate.socialLogin}`;
                        break;
                      case "discord":
                        social = <Discord className="w-[14px] h-[14px]" />;
                        link = `discord.com/invite/${teammate.socialLogin}`;
                        break;
                      case "facebook":
                        social = <Facebook className="w-[14px] h-[14px]" />;
                        link = `www.facebook.com/${teammate.socialLogin}`;
                        break;
                      default:
                        social = <Web className="w-[14px] h-[14px]" />;
                    }
                    if (teammate.socialType) {
                    }
                    return (
                      <div
                        className="relative flex flex-col items-center"
                        key={index}
                      >
                        <img
                          src={teammate.avatarLink}
                          alt="avatar"
                          className="max-w-[194px] max-h-[194px] rounded-full"
                        />
                        <div className="bg-[#13141F] w-[140px] h-[68px] border border-[#89C6B9] rounded-[10px] flex flex-col items-center mt-[-20px]">
                          <h1 className="mt-4 uppercase inter-normal text-[14px] leading-[17px]">
                            {teammate.name}
                          </h1>
                          <a
                            href={`https://t.me/${teammate.socialLogin}`}
                            target="_blank"
                            className="flex items-center mt-1 cursor-pointer"
                          >
                            {social}
                            <p className="inter-300 text-[11px] leading-[13px] ml-2">
                              {teammate.socialLogin}
                            </p>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : PROJECT_TABS_DATA[activeTabIndex].label === "roadmap" ? (
                <div className="flex flex-wrap gap-6">
                  {rxProject.info.roadmap.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="cursor-pointer w-full max-h-[1000px] bg-box rounded-[10px] hoverEffect"
                      >
                        <div className="px-5 py-5 flex flex-col justify-between gap-4">
                          <div className="flex flex-col items-center md:flex-row md:items-start">
                            <p className="text-[#89C6B9] inter-bold text-[20px] leading-6 mr-3">
                              {t("description")}
                            </p>{" "}
                            <p className="inter-400 mt-5 md:mt-0">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex">
                            <p className="text-[#89C6B9] inter-bold text-[20px] leading-6 mr-3">
                              {t("amount")}
                            </p>{" "}
                            <p className="inter-400 "> {item.funds} $</p>
                          </div>
                          <div className="flex">
                            <p className="text-[#89C6B9] inter-bold text-[20px] leading-6 mr-3">
                              {t("collected")}
                            </p>{" "}
                            <p className="inter-400">
                              {item.ableToClaim ? t("yes") : t("no")}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                PROJECT_TABS_DATA[activeTabIndex].label === "investors" && (
                  <div className="flex items-center justify-center md:justify-between flex-wrap gap-5">
                    {rxProject.info.investors.map(
                      ({ investor, invested }, index) => {
                        const Tinvested = formatNumber(
                          Number(invested) / 10 ** 18
                        );
                        return (
                          <InvestorBox
                            key={index}
                            address={investor}
                            img={token.img}
                            amount={Tinvested}
                          />
                        );
                      }
                    )}
                  </div>
                )
              )}
            </div>
            <div className="mt-[100px]">
              <h1 className="inter-normal text-[24px] leading-[29px] mb-[74px] uppercase">
                {t("top_investors")}
              </h1>
              <div className="flex items-center justify-center gap-5 md:gap-[40px] flex-wrap">
                {topInvestors.map(({ investor, invested }, index) => {
                  const Tinvested = formatNumber(Number(invested) / 10 ** 18);

                  return (
                    <InvestorBox
                      key={index}
                      address={investor}
                      img={token.img}
                      amount={Tinvested}
                    />
                  );
                })}
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
      )}
      <Footer />
      {investModalActive && (
        <InvestModal
          setModalActive={setInvestModalActive}
          token={token.name}
          adresses={adresses}
          tokenContract={TContract}
          bytesContract={DTBContract}
          infoContract={LPIContract}
        />
      )}
    </>
  );
};

export default withTranslation()(Project);
