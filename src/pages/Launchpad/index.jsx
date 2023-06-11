import { useState, useEffect } from "react";
import {
  Header,
  Footer,
  Button,
  StatisticsBox,
  SocialModal,
  Slider,
} from "../../components";
import {
  blocks,
  info,
  rocket,
  launchpadBg,
  launchpadToken,
} from "../../assets/img";

import { decrypt } from "../../utils";

import { useSigner, useContract } from "wagmi";

import { LaunchpadDriverABI } from "../../web3/abi";
import { LAUNCHPAD_DRIVER } from "../../web3/constants";

import { withTranslation } from "react-i18next";

const Launchpad = ({ t }) => {
  const { data } = useSigner();

  const LDContract = useContract({
    address: LAUNCHPAD_DRIVER,
    abi: LaunchpadDriverABI,
    signerOrProvider: data,
  });

  const initData = async () => {
    let projectsCount = await decrypt(await LDContract.id());

    for (let i = 0; i <= projectsCount; i++) {
      let pj = await LDContract.projectsList(i);
      console.log(i);
      console.log(pj);
    }
  };

  useEffect(() => {
    initData();
  }, [data]);

  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[112px] text-[#fff]">
          <div className="flex items-start mb-[100px] relative">
            <div className="flex items-start justify-between flex-col">
              <h1 className="inter-bold text-[36px] leading-[44px]  md:inter-700 max-w-[274px] md:max-w-[463px]">
                {t("launchpad_h1")}
              </h1>
              <p className="inter-400 text-[18px] leading-[22px] md:inter-400 max-w-[268px] md:max-w-[411px] mt-4">
                {t("launchpad_h2")}
              </p>
              <div className="flex flex-col gap-6 mt-11">
                <Button
                  filled={true}
                  text={t("launchpad_meet")}
                  to="currentPresales"
                />
                <Button
                  filled={false}
                  text={t("launchpad_guide")}
                  to="launchpad"
                />
                <Button filled={false} text={t("launchpad_list")} to="form" />
              </div>
            </div>
            <img
              src={launchpadBg}
              alt="launchpad"
              className="absolute max-w-[200%] top-[-50%] md:top-[-200%] lg:top-[-250%]   xl:top-[-300%] left-[-30%] z-[-1] rotate"
            />
            <img
              src={launchpadToken}
              alt="token"
              className="absolute w-[288px] h-[288px] md:w-[450px] md:h-[450px] right-[-20%] md:right-[-10%] xl:right-[252px] top-[40%] md:top-[20%] z-[-1] levitating"
            />
          </div>
          <div>
            <p className="inter-bold text-[36px] leading-[44px] md:inter-700 mb-[100px] nav-shadow">
              {t("launchpad_active")}
            </p>
            <Slider />
            <div className="text-center mt-[50px] ">
              <Button filled={true} text={t("launchpad_list")} to="form" />
            </div>
          </div>
          <div className="mt-[100px] mb-5">
            <p className="inter-bold text-[26px] leading-[32px] md:inter-700 mb-[50px] max-w-[300px]  md:max-w-full nav-shadow">
              {t("launchpad_recently")}
            </p>
            <div className="flex items-center justify-around flex-wrap gap-8 mb-[100px] md:mb-0">
              <StatisticsBox
                text={t("launchpad_funded")}
                img={rocket}
                info="97"
              />
              <StatisticsBox
                text={t("launchpad_raised")}
                img={info}
                info="111$"
              />
              <StatisticsBox
                text={t("launchpad_avg")}
                img={blocks}
                info="111$"
              />
            </div>
          </div>
        </div>
        <SocialModal />
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Launchpad);
