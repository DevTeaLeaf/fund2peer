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
import { SliderLoader } from "../../loaders";

import { useSigner, useContract } from "wagmi";

import { ethers } from "ethers";

import { LaunchpadDriverABI, LaunchProjectInfoABI } from "../../web3/abi";
import { LAUNCHPAD_DRIVER } from "../../web3/constants";

import { useSelector } from "react-redux";

import { decrypt } from "../../utils";

import { withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setProjectsAction } from "../../store";

const Launchpad = ({ t }) => {
  const dispatch = useDispatch();
  const rxProjects = useSelector((state) => state.projects);

  const [projects, setProjects] = useState(false);

  const { data } = useSigner();

  const LDContract = useContract({
    address: LAUNCHPAD_DRIVER,
    abi: LaunchpadDriverABI,
    signerOrProvider: data,
  });

  const setProjectsData = async () => {
    const pj = await Promise.all(
      projects.map(async (item) => {
        const whitepaperLink = await item.contract.whitepaperLink();
        const youtubeLink = await item.contract.youtubeVideo();
        const projectName = await item.contract.projectName();
        const shortDesc = await item.contract.shortDescription();
        const fullDesc = await item.contract.fullDescription();
        const websiteLink = await item.contract.website();
        const country = await item.contract.country();
        const category = await decrypt(await item.contract.category());
        const token = await item.contract.investToken();
        const softCap = await decrypt(await item.contract.softCap());
        const hardCap = await decrypt(await item.contract.hardCap());
        const roadmapLink = await item.contract.roadmapLink();
        const verified = await item.contract.verified();
        const startFunding = await decrypt(await item.contract.startFunding());
        const endFunding = await decrypt(await item.contract.endFunding());
        const totalRaised =
          (await decrypt(await item.contract.collectedFundTOTAL())) / 10 ** 18;
        const preview = await item.contract.previewLink();
        const headerLink = await item.contract.headerLink();
        const investorsReward = await decrypt(
          await item.contract.rewardPercentage()
        );
        const lockupTime = await decrypt(await item.contract.minimumLock());
        const canceled = await item.contract.canceled();

        const highlights = [];
        const socialMediaNames = [];
        const socialMediaLogins = [];
        const team = [];
        const investors = [];
        const roadmap = [];

        try {
          const highlight0 = await item.contract.highlights(0);
          highlights.push(highlight0);
          const highlight1 = await item.contract.highlights(1);
          highlights.push(highlight1);
          const highlight2 = await item.contract.highlights(2);
          highlights.push(highlight2);
        } catch (error) {}

        try {
          const socialName0 = await item.contract.socialMediaName(0);
          socialMediaNames.push(socialName0);
          const socialName1 = await item.contract.socialMediaName(1);
          socialMediaNames.push(socialName1);
          const socialName2 = await item.contract.socialMediaName(2);
          socialMediaNames.push(socialName2);
          const socialName3 = await item.contract.socialMediaName(3);
          socialMediaNames.push(socialName3);
        } catch (error) {}

        try {
          const socialLogin0 = await item.contract.socialMediaLogin(0);
          socialMediaLogins.push(socialLogin0);
          const socialLogin1 = await item.contract.socialMediaLogin(1);
          socialMediaLogins.push(socialLogin1);
          const socialLogin2 = await item.contract.socialMediaLogin(2);
          socialMediaLogins.push(socialLogin2);
          const socialLogin3 = await item.contract.socialMediaLogin(3);
          socialMediaLogins.push(socialLogin3);
        } catch (error) {}

        try {
          let count = 0;
          while (true) {
            let socialMediaPersonName = await item.contract.socialMediaName(
              count
            );
            let socialMediaPersonLogin =
              await item.contract.socialMediaPersonLogin(count);
            let socialMediaPersonType =
              await item.contract.socialMediaPersonType(count);
            let personAvatarLink = await item.contract.personAvatarLink(count);
            team.push({
              name: socialMediaPersonName,
              socialLogin: socialMediaPersonLogin,
              socialType: socialMediaPersonType,
              avatarLink: personAvatarLink,
            });
            count++;
          }
        } catch (error) {}
        try {
          let count = 0;
          while (true) {
            const investor = await item.contract.investorsCount(count);
            if (
              String(investor) != "0x0000000000000000000000000000000000000000"
            ) {
              const invested = String(
                await item.contract.rawInvested(investor)
              );
              investors.push({ investor: investor, invested: invested });
              count++;
            } else {
              break;
            }
          }
        } catch (error) {}
        try {
          let count = 0;
          while (true) {
            const stage = await item.contract.roadmap(count);
            const decryptedStage = {
              ableToClaim: stage.ableToClaim,
              description: stage.description,
              funds: await decrypt(stage.funds),
            };

            if (decryptedStage.description != "") {
              roadmap.push(decryptedStage);
              count++;
            } else {
              break;
            }
          }
        } catch (error) {}
        const info = {
          whitepaperLink: whitepaperLink,
          youtubeLink: youtubeLink,
          projectName: projectName,
          shortDesc: shortDesc,
          fullDesc: fullDesc,
          websiteLink: websiteLink,
          country: country,
          category: category,
          token: token,
          softCap: softCap,
          hardCap: hardCap,
          roadmapLink: roadmapLink,
          verified: verified,
          startFunding: startFunding,
          endFunding: endFunding,
          totalRaised: totalRaised,
          preview: preview,
          headerLink: headerLink,
          investorsReward: investorsReward,
          lockupTime: lockupTime,
          highlights: highlights,
          socialMediaNames: socialMediaNames,
          socialMediaLogins: socialMediaLogins,
          team: team,
          roadmap: roadmap,
          investors: investors,
          canceled: canceled,
        };
        return { address: item.address, info: info };
      })
    );
    dispatch(setProjectsAction(pj));
  };

  const initData = async () => {
    let projectsCount = await decrypt(await LDContract.id());
    let projects = [];
    let approvedProjects = [];

    for (let i = 0; i <= projectsCount; i++) {
      let project = await LDContract.projectsList(i);
      if (project.approved) {
        projects.push(project);
      }
    }

    for (const project of projects) {
      let contract = new ethers.Contract(
        project.projectAddress,
        LaunchProjectInfoABI,
        data?.provider
      );
      approvedProjects.push({
        address: project.projectAddress,
        contract: contract,
      });
    }
    setProjects(approvedProjects);
  };
  useEffect(() => {
    if (projects) {
      setProjectsData();
    }
  }, [projects]);

  useEffect(() => {
    if (data) {
      initData();
    }
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
            {rxProjects.loaded ? <Slider /> : <SliderLoader />}
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
