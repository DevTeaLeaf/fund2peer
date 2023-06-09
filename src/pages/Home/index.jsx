import { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Scrollbars } from "react-custom-scrollbars-2";

import {
  Header,
  Footer,
  SocialModal,
  Button,
  ReadBox,
  StatisticsBox,
} from "../../components";
import {
  homeBg,
  homeTk1,
  homeTk2,
  homeTk3,
  info,
  blocks,
  client,
  switchImg,
  inImg,
  out,
  doImg,
  done,
  progress,
} from "../../assets/img";
import { servicies, roadmap } from "../../constants";

const Home = ({ t }) => {
  const [activeYear, setActiveYear] = useState(2022);
  const [activeRoadmap, setActiveRoadmap] = useState(roadmap[0]);

  // ROADMAP
  const yearHandler = (year) => {
    const newRoadmap = roadmap.filter((step) => step.year === year);
    setActiveRoadmap(newRoadmap[0]);
    setActiveYear(year);
  };
  return (
    <>
      <Header page="home" />
      <div className="max-w-[1440px] mx-auto">
        <div className="xl:px-[80px] lg:px-[30px] px-[15px] flex items-center relative pt-[65px] text-[#fff] overflow-hidden">
          <div className="flex items-start mb-[500px] relative">
            <div className="flex items-start justify-between flex-col">
              <h1 className="inter-bold text-[36px] leading-[44px]  md:inter-700 max-w-[274px] md:max-w-[463px]">
                Easy to trade
              </h1>
              <p className="inter-400 text-[18px] leading-[22px] md:inter-400 max-w-[268px] md:max-w-[411px] mt-[26px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting,
              </p>
              <div className="flex flex-col gap-6 mt-10 md:mt-[60px]">
                <Button text={t("trade_now")} />
              </div>
            </div>
            <div className="absolute h-[800px] w-[800px] sm:w-[1000px] sm:h-[1000px] top-[-70%] z-[-1] rotatedDrop  left-[-60%] sm:left-[25%] lg:left-[100%]">
              <img src={homeBg} alt="Background" />
            </div>
            <img
              src={homeTk1}
              alt="Token"
              className="absolute left-[-20%] sm:left-[110%] levitatingDrop z-[-2]"
            />
            <img
              src={homeTk2}
              alt="Token"
              className="absolute top-[70%] left-[60%] sm:top-[100%] sm:left-[85%] levitatingDrop z-[-2]"
            />
            <img
              src={homeTk3}
              alt="Token"
              className="absolute top-[100%] sm:top-[125%] sm:left-[150%] lg:top-[140%] lg:left-[250%] levitatingDrop z-[-2]"
            />
          </div>
        </div>
        <div className="xl:px-[80px] lg:px-[30px] px-[15px] text-[#fff] mt-[-400px] sm:mt-[-300px]">
          <div className="mt-[100px]">
            <p className="inter-bold text-[36px] leading-[44px] md:inter-700 mb-[90px] nav-shadow">
              {t("our_services")}
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-between">
              {servicies.map(({ name, description }, index) => {
                return (
                  <ReadBox key={index} name={name} description={description} />
                );
              })}
            </div>
          </div>
          <div className="mt-[100px] ">
            <p className="inter-bold text-[36px] leading-[44px] md:inter-700 mb-[90px] nav-shadow">
              Features
            </p>
            <div className="flex items-center justify-around flex-wrap gap-8 mb-[100px] md:mb-0">
              <StatisticsBox text={"Our clients"} img={client} info="97" />
              <StatisticsBox text={"DEX Rev"} img={info} info="111$" />
              <StatisticsBox text={"P2P Rev"} img={switchImg} info="97" />

              <StatisticsBox text={"All Projects"} img={blocks} info="111$" />
              <StatisticsBox
                text={"Invested in XReturn"}
                img={inImg}
                info="111$"
              />
              <StatisticsBox text={"Earn with XReturn"} img={out} info="111$" />
            </div>
          </div>
          <div className="my-[100px]">
            <div className="flex flex-wrap gap-5 items-center mb-[50px]">
              <p className="inter-bold text-[36px] leading-[44px] md:inter-700 nav-shadow">
                Roadmap
              </p>
              {roadmap.map(({ year }) => {
                return (
                  <p
                    key={year}
                    onClick={() => yearHandler(year)}
                    className={`text-[#89C6B9] inter-normal text-[22px] leading-[120%] cursor-pointer px-4 py-[10px] ${
                      year === activeYear
                        ? "rounded-[10px] border border-[#89C6B9]"
                        : ""
                    }`}
                  >
                    {year}
                  </p>
                );
              })}
            </div>

            <Scrollbars
              renderView={() => (
                <div className="flex items-start justify-between w-full overflow-x-hidden whitespace-nowrap gap-[10rem]" />
              )}
              renderTrackHorizontal={() => <div className="roadmapTrack" />}
              renderThumbHorizontal={() => <div className="roadmapThumb" />}
              thumbSize={200}
              universal={true}
            >
              {activeRoadmap.quartals.map((targets, index) => {
                return (
                  <div className="flex flex-col gap-2 mb-10" key={index}>
                    <div className="flex">
                      <h3 className="text-[40px] inter-bold mr-2">
                        Q{index + 1}
                      </h3>
                      <p className="text-[#89C6B9] inter-normal">
                        {activeYear}
                      </p>
                    </div>
                    {targets.targets.map((scope, index) => {
                      return (
                        <div className="flex items-center" key={index}>
                          <img
                            src={`${
                              scope.state === "do"
                                ? doImg
                                : scope.state === "done"
                                ? done
                                : progress
                            }`}
                            alt="img"
                          />
                          <div
                            className={`leading-[135%] inter-normal text-[15px] ml-[7px] tracking-[-0.15px] ${
                              scope.state === "do"
                                ? "text-[#B6B2BD]"
                                : scope.state === "done"
                                ? "opacity-25"
                                : "text-[#89C6B9]"
                            }`}
                          >
                            {scope.description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div>
        <SocialModal />
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Home);
