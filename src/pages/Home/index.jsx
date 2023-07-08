import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { Header, Footer, SocialModal, Button, ReadBox } from "../../components";
import { homeBg, homeTk1, homeTk2, homeTk3 } from "../../assets/img";
import { servicies } from "../../constants";

const Home = ({ t }) => {
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
          <div className="mt-[100px] mb-5">
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
        </div>
        <SocialModal />
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Home);
