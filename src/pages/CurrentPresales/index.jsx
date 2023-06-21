import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSigner, useContract } from "wagmi";
import { withTranslation } from "react-i18next";

import { Header, Footer, PresaleBox, Input } from "../../components";
import { presalesTabsData, formTokens } from "../../constants";
import { formatNumber, timeDifference, initProjectsData } from "../../utils";
import { FilterLoader, InputLoader, PresaleLoader } from "../../loaders";
import { arrow } from "../../assets/img";
import { LaunchpadDriverABI } from "../../web3/abi";
import { LAUNCHPAD_DRIVER } from "../../web3/constants";
import { setProjectsAction } from "../../store";

const CurrentPresales = ({ t }) => {
  const rxProjects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [filtredProjects, setFiltredProjects] = useState(false);
  //tabs
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  //web3
  const { data } = useSigner();

  const LDContract = useContract({
    address: LAUNCHPAD_DRIVER,
    abi: LaunchpadDriverABI,
    signerOrProvider: data,
  });
  // filters
  const [tabs, setTabs] = useState(false);
  const [tabsFilters, setTabsFilters] = useState(false);
  const [activeTabs, setActiveTabs] = useState([false, false, false, false]);
  const [inputValue, setInputValue] = useState("");
  const tabsRef = useRef([]);
  //logic
  const setProjects = async () => {
    const projects = await initProjectsData(LDContract, data);
    dispatch(setProjectsAction(projects));
  };
  const applyFilters = () => {
    let projects = rxProjects.info.map((item) => item.info);
    const now = Math.floor(Date.now() / 1000);

    if (projects) {
      if (inputValue != "") {
        projects = projects.filter((project) =>
          project.projectName.toLowerCase().includes(inputValue.toLowerCase())
        );
      }
      if (tabsFilters.tokenFilter.name != "current_filter") {
        projects = projects.filter(
          (project) => project.token === tabsFilters.tokenFilter.address
        );
      }

      if (tabsFilters.timeFilter != "current_filter") {
        switch (tabsFilters.timeFilter) {
          case "active":
            projects = projects.filter(
              (project) =>
                now > project.startFunding && now < project.endFunding
            );
            break;
          case "waiting_launch":
            projects = projects.filter((project) => now < project.startFunding);
            break;
          case "canceled":
            projects = projects.filter((project) => project.canceled);
            break;
          case "finished":
            projects = projects.filter((project) => now > project.endFunding);
            break;
          default:
            break;
        }
      }
      if (tabsFilters.verifiedFilter != "current_filter") {
        if (tabsFilters.verifiedFilter === "verified") {
          projects = projects.filter((project) => project.verified === true);
        } else {
          projects = projects.filter((project) => project.verified === false);
        }
      }
      if (tabsFilters.countryFilter != "current_filter") {
        projects = projects.filter(
          (project) => project.country === tabsFilters.countryFilter
        );
      }

      setFiltredProjects(projects);
    }
  };
  const handleInput = (itemId, value) => {
    setInputValue(value);
  };
  const tabsController = (tabIndex) => {
    if (activeTabs[tabIndex]) {
      setActiveTabs([false, false, false, false]);
    } else {
      let tempTabs = [false, false, false, false];
      tempTabs[tabIndex] = true;
      setActiveTabs(tempTabs);
    }
  };
  const filterTabController = (tabIndex, filter) => {
    switch (tabIndex) {
      case 0:
        setTabsFilters({
          ...tabsFilters,
          tokenFilter: filter,
        });
        break;
      case 1:
        setTabsFilters({
          ...tabsFilters,
          timeFilter: filter,
        });
        break;
      case 2:
        setTabsFilters({
          ...tabsFilters,
          countryFilter: filter,
        });
        break;
      case 3:
        setTabsFilters({
          ...tabsFilters,
          verifiedFilter: filter,
        });
        break;
      default:
        break;
    }
    tabsController(tabIndex);
  };
  const initTabs = () => {
    const tokens = rxProjects.info
      .map(({ info }) => info.token)
      .filter((token, index, array) => array.indexOf(token) === index);
    const filtredTokens = formTokens
      .filter((token) => tokens.includes(token.address))
      .map((token) => ({ name: token.name, address: token.address }));

    const countries = rxProjects.info
      .map(({ info }) => info.country)
      .filter((country, index, array) => array.indexOf(country) === index);

    const tokenTab = [{ name: "current_filter" }, ...filtredTokens];
    const countryTab = ["current_filter", ...countries];
    const verifiedTab = ["current_filter", "verified", "not_verified"];
    const timeTab = [
      "current_filter",
      "active",
      "waiting_launch",
      "canceled",
      "finished",
    ];
    const tabs = {
      tokenTab: tokenTab,
      countryTab: countryTab,
      verifiedTab: verifiedTab,
      timeTab: timeTab,
    };
    setTabs(tabs);
    setTabsFilters({
      tokenFilter: tokenTab[0],
      countryFilter: countryTab[0],
      verifiedFilter: verifiedTab[0],
      timeFilter: timeTab[0],
    });
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
    if (filtredProjects) {
      applyFilters();
    }
  }, [inputValue, tabsFilters]);
  useEffect(() => {
    if (data && !rxProjects.loaded) {
      setProjects();
    }
  }, [data]);
  useEffect(() => {
    if (!tabs && rxProjects.loaded) {
      const tempProjects = rxProjects.info.map((item) => item.info);
      initTabs();
      setFiltredProjects(tempProjects);
    }
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
                    {rxProjects.loaded ? (
                      <Input
                        id={222}
                        input={t("current_search")}
                        type="text"
                        value={inputValue}
                        controller={handleInput}
                      />
                    ) : (
                      <InputLoader />
                    )}
                  </div>
                  {rxProjects.loaded ? (
                    <div>
                      <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                        {t("token")}
                      </p>
                      <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                        <div
                          onClick={() => tabsController(0)}
                          className="py-[10px] px-5 flex items-center"
                        >
                          <p className="mr-[15px] inter-400">
                            {tabsFilters.tokenFilter &&
                            tabsFilters.tokenFilter.name == "current_filter"
                              ? t(tabsFilters.tokenFilter.name)
                              : tabsFilters.tokenFilter &&
                                tabsFilters.tokenFilter.name != "current_filter"
                              ? tabsFilters.tokenFilter.name
                              : null}
                          </p>
                          <img
                            className={
                              activeTabs[0]
                                ? "rotate-[180deg] transition-[0.5s] min-w-[9px]"
                                : "transition-[0.5s] min-w-[9px]"
                            }
                            src={arrow}
                            alt="open"
                          />
                        </div>
                        {activeTabs[0] ? (
                          <div className="absolute rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer mt-3 bg-[#13141f] z-[1000] fromTop">
                            <div className="px-5 py-3 flex items-start flex-col gap-3">
                              {tabs
                                ? tabs.tokenTab.map((item, index) => {
                                    return (
                                      <p
                                        onClick={() =>
                                          filterTabController(
                                            0,
                                            tabs.tokenTab[index]
                                          )
                                        }
                                        className={`${
                                          item.name ==
                                          tabsFilters.tokenFilter.name
                                            ? "text-[#89C6B9]"
                                            : ""
                                        } inter-normal`}
                                        key={index}
                                      >
                                        {item.name == "current_filter"
                                          ? t(item.name)
                                          : item.name}
                                      </p>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <FilterLoader />
                  )}
                  {rxProjects.loaded ? (
                    <div>
                      <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                        {t("time")}
                      </p>
                      <div className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer">
                        <div
                          onClick={() => tabsController(1)}
                          className="py-[10px] px-5 flex items-center"
                        >
                          <p className="mr-[15px] inter-400">
                            {tabsFilters.timeFilter
                              ? t(tabsFilters.timeFilter)
                              : null}
                          </p>
                          <img
                            className={
                              activeTabs[1]
                                ? "rotate-[180deg] transition-[0.5s] min-w-[9px]"
                                : "transition-[0.5s] min-w-[9px]"
                            }
                            src={arrow}
                            alt="open"
                          />
                        </div>
                      </div>
                      {activeTabs[1] ? (
                        <div className="absolute rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer mt-3 bg-[#13141f] z-[1000] fromTop">
                          <div className="px-5 py-3 flex items-start flex-col gap-3">
                            {tabs
                              ? tabs.timeTab.map((item, index) => {
                                  return (
                                    <p
                                      onClick={() =>
                                        filterTabController(
                                          1,
                                          tabs.timeTab[index]
                                        )
                                      }
                                      className={`${
                                        item == tabsFilters.timeFilter
                                          ? "text-[#89C6B9]"
                                          : ""
                                      } inter-normal`}
                                      key={index}
                                    >
                                      {t(item)}
                                    </p>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <FilterLoader />
                  )}
                  {rxProjects.loaded ? (
                    <div>
                      <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                        {t("country")}
                      </p>
                      <div
                        onClick={() => tabsController(2)}
                        className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer"
                      >
                        <div className="py-[10px] px-5 flex items-center">
                          <p className="mr-[15px] inter-400">
                            {tabsFilters.countryFilter &&
                            tabsFilters.countryFilter == "current_filter"
                              ? t(tabsFilters.countryFilter)
                              : tabsFilters.countryFilter &&
                                tabsFilters.countryFilter != "current_filter"
                              ? tabsFilters.countryFilter
                              : null}
                          </p>
                          <img
                            className={
                              activeTabs[2]
                                ? "rotate-[180deg] transition-[0.5s] min-w-[9px]"
                                : "transition-[0.5s] min-w-[9px]"
                            }
                            src={arrow}
                            alt="open"
                          />
                        </div>
                      </div>
                      {activeTabs[2] ? (
                        <div className="absolute rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer mt-3 bg-[#13141f] z-[1000] fromTop">
                          <div className="px-5 py-3 flex items-start flex-col gap-3">
                            {tabs
                              ? tabs.countryTab.map((item, index) => {
                                  return (
                                    <p
                                      onClick={() =>
                                        filterTabController(
                                          2,
                                          tabs.countryTab[index]
                                        )
                                      }
                                      className={`${
                                        item == tabsFilters.countryFilter
                                          ? "text-[#89C6B9]"
                                          : ""
                                      } inter-normal`}
                                      key={index}
                                    >
                                      {item == "current_filter"
                                        ? t(item)
                                        : item}
                                    </p>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <FilterLoader />
                  )}
                  {rxProjects.loaded ? (
                    <div>
                      <p className="inter-100 text-[14px] leading-[17px] ml-5 mb-[10px]">
                        {t("state")}
                      </p>
                      <div
                        onClick={() => tabsController(3)}
                        className="rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer"
                      >
                        <div className="py-[10px] px-5 flex items-center">
                          <p className="mr-[15px] inter-400">
                            {tabsFilters.verifiedFilter
                              ? t(tabsFilters.verifiedFilter)
                              : null}
                          </p>
                          <img
                            className={
                              activeTabs[3]
                                ? "rotate-[180deg] transition-[0.5s] min-w-[9px]"
                                : "transition-[0.5s] min-w-[9px]"
                            }
                            src={arrow}
                            alt="open"
                          />
                        </div>
                      </div>
                      {activeTabs[3] ? (
                        <div className="absolute rounded-[10px] border-[1px] border-[#89C6B9] cursor-pointer mt-3 bg-[#13141f] z-[1000] fromTop">
                          <div className="px-5 py-3 flex items-start flex-col gap-3">
                            {tabs
                              ? tabs.verifiedTab.map((item, index) => {
                                  return (
                                    <p
                                      onClick={() =>
                                        filterTabController(
                                          3,
                                          tabs.verifiedTab[index]
                                        )
                                      }
                                      className={`${
                                        item == tabsFilters.verifiedFilter
                                          ? "text-[#89C6B9]"
                                          : ""
                                      } inter-normal`}
                                      key={index}
                                    >
                                      {t(item)}
                                    </p>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <FilterLoader />
                  )}
                </div>
                <div className="mt-[100px] flex items-center justify-center flex-wrap gap-[20px] mb-[100px]">
                  {filtredProjects ? (
                    filtredProjects.map((project, index) => {
                      const token = formTokens.filter(
                        (token) => token.address === project.token
                      );
                      const raise = String(
                        (
                          (project.totalRaised / project.softCap) *
                          100
                        ).toFixed()
                      );
                      const currentTime = Math.floor(Date.now() / 1000);
                      let days;
                      let startState = "Start";
                      if (currentTime < project.startFunding) {
                        const timeDiff = timeDifference(project.startFunding);
                        days = timeDiff.days;
                      }
                      if (
                        currentTime > project.startFunding &&
                        currentTime < project.endFunding
                      ) {
                        const timeDiff = timeDifference(project.endFunding);
                        days = timeDiff.days;
                        startState = "End";
                      }
                      if (project.startFunding == 0) {
                        days = 0;
                      }
                      const time = { state: startState, days: days };
                      return (
                        <PresaleBox
                          key={index}
                          projectLogo={token[0]?.img}
                          status={project.verified}
                          name={project.projectName}
                          currentRaise={raise}
                          softCap={formatNumber(project.softCap)}
                          hardCap={formatNumber(project.hardCap)}
                          lockupTime={project.lockupTime / 86400}
                          reward={project.investorsReward}
                          time={time}
                          project={rxProjects.info[index]}
                        />
                      );
                    })
                  ) : (
                    <div className="flex justify-center md:justify-between items-center gap-10 flex-wrap">
                      <PresaleLoader />
                      <PresaleLoader />
                      <PresaleLoader />
                    </div>
                  )}
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
