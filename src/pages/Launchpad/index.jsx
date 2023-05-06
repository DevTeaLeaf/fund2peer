import React from "react";
import {
  Header,
  Footer,
  Button,
  StatisticsBox,
  SocialModal,
} from "../../components";
import { launchpadPolygon, blocks, info, rocket } from "../../assets/img";

import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

const Launchpad = ({ t }) => {
  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto">
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[65px] md:pt-[112px] text-[#fff]">
          <div className="flex items-start mb-[100px]">
            <div className="flex items-start justify-between flex-col">
              <h1 className="inter-700 max-w-[463px]">{t("launchpad_h1")}</h1>
              <p className="inter-400 max-w-[411px] mt-4">
                {t("launchpad_h2")}
              </p>
              <div className="flex flex-col gap-6 mt-11">
                <Button
                  filled={true}
                  text={t("launchpad_meet")}
                  to="launchpad"
                />
                <Button
                  filled={false}
                  text={t("launchpad_guide")}
                  to="launchpad"
                />
                <Button
                  filled={false}
                  text={t("launchpad_list")}
                  to="launchpad"
                />
              </div>
            </div>
            <div className="mt-[-180px]">
              <img src={launchpadPolygon} alt="launchpad" />
            </div>
          </div>
          <div>
            <p className="inter-700 mb-[100px] nav-shadow">
              {t("launchpad_active")}
            </p>
            {/*slider(*/}
          </div>
          <div className="mt-[100px]">
            <p className="inter-700 mb-[50px] nav-shadow">
              {t("launchpad_recently")}
            </p>
            <div className="flex items-center justify-around">
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
            <div className="text-center mt-[50px]">
              <Button
                filled={false}
                text={t("launchpad_list")}
                to="launchpad"
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
