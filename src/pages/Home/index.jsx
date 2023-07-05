import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { Header, Footer, SocialModal, Button } from "../../components";
import { homeBg, homeTk1, homeTk2, homeTk3 } from "../../assets/img";

const Home = ({ t }) => {
  return (
    <>
      <Header page="home" />
      <div className="max-w-[1440px] mx-auto">
        <div className="xl:px-[80px] lg:px-[30px] px-[15px] flex items-center relative pt-[65px] text-[#fff]">
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
                <Button text={"Trade now"} />
              </div>
            </div>
            <div className="absolute w-[1000px] h-[1000px] left-[100%] top-[-70%] z-[-1] rotatedDrop">
              <img src={homeBg} alt="Background" />
            </div>
            <img
              src={homeTk1}
              alt="Token"
              className="absolute left-[110%] levitatingDrop"
            />
            <img
              src={homeTk2}
              alt="Token"
              className="absolute top-[100%] left-[85%] levitatingDrop"
            />
            <img
              src={homeTk3}
              alt="Token"
              className="absolute top-[140%] left-[250%] levitatingDrop"
            />
          </div>
        </div>
        <SocialModal />
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Home);
