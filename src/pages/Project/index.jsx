import React from "react";
import { Header, Footer, Button, SocialModal } from "../../components";

import {
  projectBg,
  slider,
  Twitter,
  Discord,
  Telegram,
  Facebook,
  youtube,
} from "../../assets/img";

import { withTranslation } from "react-i18next";

const Project = ({ t }) => {
  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
        <img src={projectBg} alt="projectBg" />
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[70px] text-[#fff]">
          <p className="inter-bold text-[48px] leading-[58px] nav-shadow mb-[50px]">
            Sequoia.game
          </p>
          <div className="flex items-start justify-between mb-[70px]">
            <div className="flex">
              <div className=" relative mr-[50px]">
                <img src={slider} alt="projectImg" className="project-img" />
                <div className="absolute left-[31.1px] bottom-[57.34px]">
                  <div className="main-div">
                    <div className="main-1"></div>
                    <div className="main-2"></div>
                    <div className="main-3 gap-14">
                      <p>Total Raise</p>
                      <p>$520,000/$800,000</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-[332px]">
                <h3 className="mb-[32px] inter-bold text-[24px] leading-7">
                  Highlights
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
                  <p>Lockup time</p> <p>180 days</p>
                </div>
                <div className="flex items-center justify-between mt-5 inter-400">
                  <p>Reward </p> <p>10 %</p>
                </div>
                <div className="flex flex-col items-center gap-4 mt-[30px]">
                  <Button filled={false} text={"White paper"} to="launchpad" />
                  <Button filled={true} text={"Invest"} to="launchpad" />
                </div>
              </div>
            </div>
            <div className="w-[40%] mt-10">
              <div className="text-[24px] leading-[29px]">
                <div className="flex items-center justify-between">
                  <p className="inter-300 text-[#C7C7C7]">Soft cap</p>
                  <p className="inter-normal">890 900$</p>
                </div>
                <div className="flex items-center justify-between mt-[17px]">
                  <p className="inter-300 text-[#C7C7C7]">Hard cap</p>
                  <p className="inter-normal">890 900$</p>
                </div>
              </div>
              <div className="mt-[60px] bg-[#1C1D2D] rounded-[10px] hoverEffect">
                <div className="py-5 px-[15px] flex flex-col items-center">
                  <div className="flex inter-bold text-[32px] leading-[39px] mb-[30px] gap-4">
                    <p className="text-[#89C6B9] ">Start</p>
                    <p>in</p>
                    <p>
                      10 <sup>days</sup>
                    </p>
                    <p>
                      22 <sup>hours</sup>
                    </p>
                    <p>
                      59 <sup>min</sup>
                    </p>
                  </div>
                  <Button
                    filled={false}
                    text={"Add to Favorites"}
                    to="launchpad"
                  />
                </div>
              </div>
              <div className="flex items-center mt-[100px]">
                <div className="mr-5 inter-400">Follow Sequoia.game</div>
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
          <div className="flex items-center justify-center">
            <img src={youtube} alt="youtube" />
          </div>
        </div>
        <SocialModal />
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Project);
