import { ethers } from "ethers";

import decrypt from "./decrypt";
import { LaunchProjectInfoABI } from "#web3/abi";

const initProjectsData = async (LDContract, data) => {
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

  const generatedProjects = await Promise.all(
    approvedProjects.map(async (item) => {
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
          let socialMediaPersonType = await item.contract.socialMediaPersonType(
            count
          );
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
            const invested = String(await item.contract.rawInvested(investor));
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

  return generatedProjects;
};

export default initProjectsData;
