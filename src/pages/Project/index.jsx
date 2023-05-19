import { useEffect, useRef, useState } from "react";
import { Header, Footer, Button, InvestorBox, Slider } from "../../components";
import { projectTabsData } from "../../constants";

import {
  projectBg,
  slider,
  Twitter,
  Discord,
  Telegram,
  Facebook,
  youtube,
  polygon,
} from "../../assets/img";

import { withTranslation } from "react-i18next";

const Project = ({ t }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      console.log(currentTab?.offsetLeft, currentTab?.clientWidth);
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
        <img src={projectBg} alt="projectBg" />
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[70px] text-[#fff]">
          <p className="inter-bold  text-[32px] leading-9 md:text-[48px] md:leading-[58px] nav-shadow mb-[50px]">
            Sequoia.game
          </p>
          <div className="flex items-start justify-between mb-[70px] flex-wrap">
            <div className="flex flex-wrap justify-center gap-5">
              <div className=" relative mr-0 md:mr-[50px]">
                <img src={slider} alt="projectImg" className="project-img" />
                <div className="absolute bottom-[57.34px] projectLeft">
                  <div className="main-div">
                    <div className="main-1"></div>
                    <div className="main-2"></div>
                    <div className="main-3 gap-5 md:gap-14">
                      <p>Total Raise</p>
                      <p>$520,000/$800,000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-[332px]">
                <h3 className="mb-[32px] inter-bold text-[24px] leading-7">
                  {t("highlights")}
                </h3>
                <p className="inter-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since t he 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap...
                </p>
                <div className="flex items-center justify-between mt-5 inter-400">
                  <p>{t("lockup_time")}</p> <p>180 {t("days")}</p>
                </div>
                <div className="flex items-center justify-between mt-5 inter-400">
                  <p>{t("reward")} </p> <p>10 %</p>
                </div>
                <div className="flex flex-col items-center gap-4 mt-[30px]">
                  <Button
                    filled={false}
                    text={t("white_paper")}
                    to="launchpad"
                  />
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
                  <p className="inter-normal">890 900$</p>
                </div>
                <div className="flex items-center justify-between mt-[17px]">
                  <p className="inter-300 text-[#C7C7C7]">{t("hard_cap")}</p>
                  <p className="inter-normal">890 900$</p>
                </div>
              </div>
              <div className="mt-[60px] bg-[#1C1D2D] rounded-[10px] hoverEffect">
                <div className="py-5 px-[15px] flex flex-col items-center">
                  <div className="flex inter-bold text-[24px] leading-7 md:text-[32px] md:leading-[39px] mb-[30px] gap-4">
                    <p className="text-[#89C6B9] ">{t("start")}</p>
                    <p>{t("in")}</p>
                    <p>
                      10 <sup>{t("clock_days")}</sup>
                    </p>
                    <p>
                      22 <sup>{t("clock_hours")}</sup>
                    </p>
                    <p>
                      59 <sup>{t("clock_min")}</sup>
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
                <div className="mr-5 inter-400">{t("follow")} Sequoia.game</div>
                <div className="flex items-center justify-between gap-[50px]">
                  <a className="social cursor-pointer" href="">
                    <Telegram className="w-6 h-6 md:w-9 md:h-9" />
                  </a>
                  <a className="social cursor-pointer" href="">
                    <Twitter className="w-6 h-6 md:w-9 md:h-9" />
                  </a>
                  <a className="social cursor-pointer" href="">
                    <Discord className="w-6 h-6 md:w-9 md:h-9" />
                  </a>
                  <a className="social cursor-pointer" href="">
                    <Facebook className="w-6 h-6 md:w-9 md:h-9" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-[87px]">
            <img src={youtube} alt="youtube" />
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
                <div className="flex flex-col gap-[25px] w-[302px] mt-[42px]">
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("project_name")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("short_desc")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("website")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("country")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("category")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("token")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("soft_cap")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="inter-300 text-[14px] leading-[17px]">
                      {t("hard_cap")}
                    </p>
                    <p className="inter-bold text-[14px] leading-[17px] text-[#fff]">
                      MyCompany
                    </p>
                  </div>
                </div>
                <div className="w-[100%] md:w-[75%]">
                  <h1 className="inter-600 text-[32px] leading-[39px] mb-[36px]">
                    Until recently, the prevailing{" "}
                  </h1>
                  <p className="inter-300 text-[14px] leading-[17px]">
                    View assumed lorem ipsum was born as a nonsense text. “It's
                    not Latin, though it looks like it, and it actually says
                    nothing,” Before & After magazine answered a curious reader,
                    “Its ‘words’ loosely approximate the frequency with which
                    letters occur in English, which is why at a glance it looks
                    pretty real.” As Cicero would put it, “Um, not so fast.” The
                    placeholder text, beginning with the line “Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit”, looks like Latin
                    because in its youth, centuries ago, it was Latin. Richard
                    McClintock, a Latin scholar from Hampden-Sydney College, is
                    credited with discovering the source behind the ubiquitous
                    filler text. In seeing a sample of lorem ipsum, his interest
                    was piqued by consectetur—a genuine, albeit rare, Latin
                    word. Consulting a Latin dictionary led McClintock to a
                    passage from De Finibus Bonorum et Malorum (“On the Extremes
                    of Good and Evil”), a first-century B.C. text from the Roman
                    philosopher Cicero. In particular, the garbled words of
                    lorem ipsum bear an unmistakable resemblance to sections
                    1.10.32–33 of Cicero's work, with the most notable passage
                    excerpted below: “Neque porro quisquam est, qui dolorem
                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                    quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem.” A 1914 English
                    translation by Harris Rackham reads: “Nor is there anyone
                    who loves or pursues or desires to obtain pain of itself,
                    because it is pain, but occasionally circumstances occur in
                    which toil and pain can procure him some great pleasure.”
                    McClintock's eye for detail certainly helped narrow the
                    whereabouts of lorem ipsum's origin, however, the “how and
                    when” still remain something of a mystery, with competing
                    theories and timelines.Until recently, the prevailing view
                    assumed lorem ipsum was born as a nonsense text. “It's not
                    Latin, though it looks like it, and it actually says
                    nothing,” Before & After magazine answered a curious reader,
                    “Its ‘words’ loosely approximate the frequency with which
                    letters occur in English, which is why at a glance it looks
                    pretty real.” As Cicero would put it, “Um, not so fast.” The
                    placeholder text, beginning with the line “Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit”, looks like Latin
                    because in its youth, centuries ago, it was Latin. Richard
                    McClintock, a Latin scholar from Hampden-Sydney College, is
                    credited with discovering the source behind the ubiquitous
                    filler text. In seeing a sample of lorem ipsum, his interest
                    was piqued by consectetur—a genuine, albeit rare, Latin
                    word. Consulting a Latin dictionary led McClintock to a
                    passage from De Finibus Bonorum et Malorum (“On the Extremes
                    of Good and Evil”), a first-century B.C. text from the Roman
                    philosopher Cicero. In particular, the garbled words of
                    lorem ipsum bear an unmistakable resemblance to sections
                    1.10.32–33 of Cicero's work, with the most notable passage
                    excerpted below: “Neque porro quisquam est, qui dolorem
                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                    quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem.” A 1914 English
                    translation by Harris Rackham reads: “Nor is there anyone
                    who loves or pursues or desires to obtain pain of itself,
                    because it is pain, but occasionally circumstances occur in
                    which toil and pain can procure him some great pleasure.”
                    McClintock's eye for detail certainly helped narrow the
                    whereabouts of lorem ipsum's origin, however, the “how and
                    when” still remain something of a mystery, with competing
                    theories and timelines.Until recently, the prevailing view
                    assumed lorem ipsum was born as a nonsense text. “It's not
                    Latin, though it looks like it, and it actually says
                    nothing,” Before & After magazine answered a curious reader,
                    “Its ‘words’ loosely approximate the frequency with which
                    letters occur in English, which is why at a glance it looks
                    pretty real.” As Cicero would put it, “Um, not so fast.” The
                    placeholder text, beginning with
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
                img={polygon}
                amount="100,000"
              />
              <InvestorBox
                address="0xd1d6bf74282782b0b3eb1413c901d6ecf02e8e28"
                img={polygon}
                amount="100,000"
              />
              <InvestorBox
                address="0xd1d6bf74282782b0b3eb1413c901d6ecf02e8e28"
                img={polygon}
                amount="100,000"
              />
              <InvestorBox
                address="0xd1d6bf74282782b0b3eb1413c901d6ecf02e8e28"
                img={polygon}
                amount="100,000"
              />
            </div>
          </div>
          <div className="mt-[90px] mb-[40px]">
            <p className="inter-bold text-[32px] leading-9 md:text-[48px] md:leading-[58px] mb-[100px] nav-shadow">
              {t("explore_more")}
            </p>
            <Slider />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Project);
