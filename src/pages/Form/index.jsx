import { useEffect, useState } from "react";

import { useSigner, useContract } from "wagmi";

import { DataToBytesABI, LaunchpadDriverABI } from "../../web3/abi";
import { DATA_TO_BYTES, GAS, LAUNCHPAD_DRIVER } from "../../web3/constants";
import { getLimit } from "../../utils";

import { withTranslation } from "react-i18next";

import { Header, Footer, Input, Button, Token, Member } from "../../components";
import {
  Twitter,
  Discord,
  Telegram,
  Facebook,
  Web,
  plus,
  dimensionWarning,
  question,
} from "../../assets/img";
import {
  formTokens,
  formInputs,
  formMembers,
  formSocialMedia,
  formCountries,
} from "../../constants";

const Form = ({ t }) => {
  const { data } = useSigner();

  const [page, setPage] = useState("1");
  const [tokens, setTokens] = useState(formTokens);
  const [formInputsP1, setFormInputsP1] = useState(formInputs.page1);
  const [formInputsP2, setFormInputsP2] = useState(formInputs.page2);
  const [formInputsP3, setFormInputsP3] = useState(formInputs.page3);
  const [formTeam, setFormTeam] = useState(formMembers);
  const [categories, setCategories] = useState(formInputs.page1[1]);
  const [formTeamInputs, setFormTeamInputs] = useState([formMembers[0].inputs]);
  const [highlightsInputs, setHighlightsInputs] = useState(
    formInputs.highlights
  );
  const [social, setSocial] = useState(formSocialMedia);
  const [countries, setCountries] = useState(formCountries);
  const DTBContract = useContract({
    address: DATA_TO_BYTES,
    abi: DataToBytesABI,
    signerOrProvider: data,
  });
  const LDContract = useContract({
    address: LAUNCHPAD_DRIVER,
    abi: LaunchpadDriverABI,
    signerOrProvider: data,
  });

  const addToTeam = () => {
    let newInputs = [
      ...formTeamInputs,
      [
        { id: Math.random(), value: "", input: "name", type: "text" },
        {
          id: Math.random(),
          value: "",
          input: "avatar_link",
          type: "link",
        },
        { id: Math.random(), value: "", input: "nickname", type: "text" },
      ],
    ];
    let newTeam = [
      ...formTeam,
      {
        id: Math.random(),
        inputs: [
          { id: Math.random(), value: "", input: "name", type: "text" },
          {
            id: Math.random(),
            value: "",
            input: "avatar_link",
            type: "link",
          },
          { id: Math.random(), value: "", input: "nickname", type: "text" },
        ],
        network: false,
      },
    ];
    setFormTeam(newTeam);
    setFormTeamInputs(newInputs);
  };
  const addToSocial = () => {
    let newSocial = [
      ...social,
      {
        id: Math.random(),
        value: "",
        input: "link",
        group: "web",
      },
    ];
    setSocial(newSocial);
  };
  const handleTokens = (itemId) => {
    const updatedTokens = tokens.map((item) =>
      item.id === itemId
        ? { ...item, active: true }
        : { ...item, active: false }
    );
    setTokens(updatedTokens);
  };
  const handleInputs = (itemId, value, inputs, setInputs) => {
    if (itemId === 5) {
      const filtredCountries = formCountries.filter((str) =>
        str.includes(value)
      );
      setCountries(filtredCountries);
    }
    const updatedInputs = inputs.map((item) =>
      item.id === itemId ? { ...item, value: value } : { ...item }
    );
    setInputs(updatedInputs);
  };
  const changeCategories = (categoryValue) => {
    let categoriesT = categories.map((category) => {
      if (categoryValue === category.value) {
        return { ...category, active: true };
      } else {
        return { ...category, active: false };
      }
    });
    setCategories(categoriesT);
  };
  //web3 function
  const regProject = async () => {
    let bytes = [];
    try {
      //P1
      if (formInputsP1[0].value != "") {
        const companyNameBytes = await DTBContract.changeCompanyName(
          formInputsP1[0].value
        );
        bytes.push(companyNameBytes);
      }
      // toDO: active category examination
      const categoryValue = categories.filter((category) => category.active);

      const categoryBytes = await DTBContract.changeCategory(
        categoryValue[0].value
      );
      bytes.push(categoryBytes);
      //
      if (formInputsP1[2].value != "") {
        const shortDescriptionBytes = await DTBContract.changeShortDescription(
          formInputsP1[2].value
        );
        bytes.push(shortDescriptionBytes);
      }

      if (formInputsP1[3].value != "") {
        const fullDescriptionBytes = await DTBContract.changeFullDescriprion(
          formInputsP1[3].value
        );
        bytes.push(fullDescriptionBytes);
      }

      if (formInputsP1[4].value != "") {
        const videoBytes = await DTBContract.changeVideo(formInputsP1[4].value);
        bytes.push(videoBytes);
      }

      if (formInputsP1[5].value != "") {
        const countryBytes = await DTBContract.changeCountry(
          formInputsP1[5].value
        );
        bytes.push(countryBytes);
      }
      if (formInputsP1[6].value != "") {
        const websiteBytes = await DTBContract.changeWebsite(
          formInputsP1[6].value
        );
        bytes.push(websiteBytes);
      }

      if (
        highlightsInputs[0].value != "" ||
        highlightsInputs[1].value != "" ||
        highlightsInputs[2].value != ""
      ) {
        let highlights = [
          highlightsInputs[0].value,
          highlightsInputs[1].value,
          highlightsInputs[2].value,
        ];
        highlights = highlights.filter((highlight) => highlight != "");

        const highlightsBytes = await DTBContract.changeHighlights(highlights);
        bytes.push(highlightsBytes);
      }

      //P2
      //TEAM
      const teamNames = formTeam
        .map((team) => team.inputs[0].value)
        .filter((name) => name != "");
      const teamAvatar = formTeam
        .map((team) => team.inputs[1].value)
        .filter((avatar) => avatar != "");

      const teamLogins = formTeam
        .map((team) => team.inputs[2].value)
        .filter((login) => login != "");
      const teamNetworks = formTeam
        .map((team) => team.network)
        .filter((network) => network != "");

      if (teamNames.length > 0) {
        const teamNamesBytes = await DTBContract.changeSocialMediaPersonName(
          teamNames
        );
        bytes.push(teamNamesBytes);
      }
      if (teamAvatar.length > 0) {
        const teamAvatarBytes = await DTBContract.changePersonAvatarLink(
          teamAvatar
        );
        bytes.push(teamAvatarBytes);
      }

      if (teamLogins.length > 0) {
        const teamLoginsBytes = await DTBContract.changeSocialMediaPersonLogin(
          teamLogins
        );
        bytes.push(teamLoginsBytes);
      }
      if (teamNetworks.length > 0) {
        const teamNetworksBytes = await DTBContract.changeSocialMediaPersonType(
          teamNetworks
        );
        bytes.push(teamNetworksBytes);
      }
      //
      if (formInputsP2[0].value != "") {
        const whitepaperBytes = await DTBContract.changeWhitepaperLink(
          formInputsP2[0].value
        );
        bytes.push(whitepaperBytes);
      }
      if (formInputsP2[1].value != "") {
        const roadmapBytes = await DTBContract.changeRoadmapLink(
          formInputsP2[1].value
        );
        bytes.push(roadmapBytes);
      }
      if (formInputsP2[2].value != "") {
        const businessPlanBytes = await DTBContract.changeBusinessPlanLink(
          formInputsP2[2].value
        );
        bytes.push(businessPlanBytes);
      }
      if (formInputsP2[3].value != "") {
        const additionalDocsBytes = await DTBContract.changeAdditionalDocsLink(
          formInputsP2[3].value
        );
        bytes.push(additionalDocsBytes);
      }
      if (formInputsP2[4].value != "") {
        const headerImgBytes = await DTBContract.changeHeaderLink(
          formInputsP2[4].value
        );
        bytes.push(headerImgBytes);
      }
      if (formInputsP2[5].value != "") {
        const previewImgBytes = await DTBContract.changePreviewLink(
          formInputsP2[5].value
        );
        bytes.push(previewImgBytes);
      }
      //P3
      const token = tokens.filter((token) => token.active);
      const socialMediaNames = social
        .map((social) => social.value)
        .filter((name) => name != "");
      const socialMediaTypes = social
        .filter((item) => item.value !== "")
        .map((item) => item.group);

      const tokenBytes = await DTBContract.changeToken(token[0].address);
      bytes.push(tokenBytes);

      if (formInputsP3[0].value != "") {
        const softCapBytes = await DTBContract.changeSoftCap(
          Number(formInputsP3[0].value)
        );
        bytes.push(softCapBytes);
      }
      if (formInputsP3[1].value != "") {
        const hardCapBytes = await DTBContract.changeHardCap(
          Number(formInputsP3[1].value)
        );
        bytes.push(hardCapBytes);
      }
      if (formInputsP3[2].value != "") {
        const investorsRewardBytes = await DTBContract.changeReward(
          Number(formInputsP3[2].value) * 100
        );
        bytes.push(investorsRewardBytes);
      }
      if (formInputsP3[4].value != "") {
        const startFundingBytes = await DTBContract.changeStart(
          Number(formInputsP3[4].value)
        );
        bytes.push(startFundingBytes);
      }
      if (formInputsP3[5].value != "") {
        const endFundingBytes = await DTBContract.changeEnd(
          Number(formInputsP3[5].value)
        );
        bytes.push(endFundingBytes);
      }
      if (socialMediaTypes.length > 0) {
        const socialMediaNameBytes = await DTBContract.changeSocialMediaName(
          socialMediaTypes
        );
        bytes.push(socialMediaNameBytes);
      }

      if (socialMediaNames.length > 0) {
        const socialMediaLoginBytes = await DTBContract.changeSocialMediaLogin(
          socialMediaNames
        );
        bytes.push(socialMediaLoginBytes);
      }
      const applicationFee = await LDContract.applicationFee();

      const time = Number(formInputsP3[3].value) * 60 * 60 * 24;

      const gasLimit = await getLimit(
        await LDContract.estimateGas.ApplyToCreateProject(
          time,
          formInputsP3[6].value,
          formInputsP3[7].value,
          bytes,
          {
            value: applicationFee,
          }
        )
      );

      const transaction = await LDContract.ApplyToCreateProject(
        time,
        formInputsP3[4].value,
        formInputsP3[5].value,
        bytes,
        {
          value: applicationFee,
          gasLimit: gasLimit,
        }
      );

      console.log(transaction);
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[30px] text-[#fff] mb-10">
          <div className="flex items-start justify-between flex-col w-full mb-[70px]">
            <h1 className="inter-bold text-[36px] leading-[44px]  md:inter-700 max-w-[274px] md:max-w-[700px]">
              {t("form_questions")}
            </h1>
            <p className="inter-400 mt-[50px] md:mt-[100px] mx-auto">
              {page}/3
            </p>
          </div>
          {page === "1" ? (
            <div>
              {formInputsP1.map((item, index) => {
                let generatedItem;
                if (index === 1) {
                  generatedItem = (
                    <div
                      key={item[0].name}
                      className="bg-[#1C1D2D] rounded-[10px] inputHover mb-10"
                    >
                      <div className="px-[36px] py-[50px]">
                        <div className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                          <p className="mr-2">{t("project_category")}</p>
                          <p className="text-[#89C6B9]">*</p>
                        </div>
                        <div className="flex flex-col gap-5 inter-400">
                          {categories.map((category) => {
                            return (
                              <p
                                className={`cursor-pointer ${
                                  category.active ? "text-[#89C6B9]" : ""
                                }`}
                                onClick={() => changeCategories(category.value)}
                                key={category.value}
                              >
                                {t(category.name)}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                } else if (index === 5) {
                  generatedItem = (
                    <div
                      key={item.id}
                      className="bg-[#1C1D2D] rounded-[10px] inputHover mb-10"
                    >
                      <div className="px-[36px] py-[50px]">
                        <div className="inter-400 text-[24px] leading-[29px] flex mb-[22px] relative">
                          <p className="mr-2">{t(item.name)}</p>
                          <p className="text-[#89C6B9]">
                            {item.obligatorily ? "*" : ""}
                          </p>
                        </div>
                        <Input
                          key={item.id}
                          id={item.id}
                          input={t(item.input)}
                          value={item.value}
                          type={item.type}
                          controller={handleInputs}
                          inputs={formInputsP1}
                          setInputs={setFormInputsP1}
                        />
                        <div
                          className={`mt-3 ${
                            item.value === "" ? "hidden" : ""
                          }`}
                        >
                          {countries.map((country, index) => {
                            return (
                              <div
                                onClick={() =>
                                  handleInputs(
                                    5,
                                    country,
                                    formInputsP1,
                                    setFormInputsP1
                                  )
                                }
                                key={index}
                                className={`cursor-pointer ${
                                  country === item.value ? "text-[#89C6B9]" : ""
                                }`}
                              >
                                {country}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  generatedItem = (
                    <div
                      key={item.id}
                      className="bg-[#1C1D2D] rounded-[10px] inputHover mb-10"
                    >
                      <div className="px-[36px] py-[50px]">
                        <div className="inter-400 text-[24px] leading-[29px] flex mb-[22px] relative">
                          <p className="mr-2">{t(item.name)}</p>
                          <p className="text-[#89C6B9]">
                            {item.obligatorily ? "*" : ""}
                          </p>
                          {/*<img
                            src={question}
                            alt="question"
                            className="cursor-pointer ml-3 max-w-[22px] max-h-[22px]"
                          />
                          <div className="absolute bg-[#89C6B9] px-[15px] py-2 max-w-[600px] z-[10] left-[20%] rounded">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Officiis nisi amet ipsum dignissimos
                            voluptates facilis, magnam qui veniam mollitia sunt
                            nemo, fugit sequi exercitationem earum atque aliquam
                            quos inventore quod!
                  </div>*/}
                        </div>
                        <Input
                          key={item.id}
                          id={item.id}
                          input={t(item.input)}
                          value={item.value}
                          type={item.type}
                          controller={handleInputs}
                          inputs={formInputsP1}
                          setInputs={setFormInputsP1}
                        />
                      </div>
                    </div>
                  );
                }

                return generatedItem;
              })}
              <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-[60px]">
                <div className="px-10 py-[60px]">
                  <p className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                    {t("form_highlights")}
                  </p>
                  <div className="flex flex-col gap-4">
                    {highlightsInputs.map(({ id, value, input, type }) => {
                      return (
                        <Input
                          key={id}
                          id={id}
                          input={t(input)}
                          value={value}
                          type={type}
                          controller={handleInputs}
                          inputs={highlightsInputs}
                          setInputs={setHighlightsInputs}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : page === "2" ? (
            <div>
              <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-[60px]">
                <div className="px-10 py-[60px]">
                  <p className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                    {t("your_team")}
                  </p>
                  <div>
                    {formTeam.map((item, index) => {
                      return (
                        <Member
                          index={index}
                          key={item.id}
                          network={item.network}
                          memberInputs={formTeamInputs}
                          setMemberInputs={setFormTeamInputs}
                          team={formTeam}
                          setTeam={setFormTeam}
                        />
                      );
                    })}
                  </div>
                  <img
                    src={plus}
                    alt="plus"
                    className="mt-[70px] pt-[15px] pr-4 pb-4 pl-[17px] cursor-pointer border border-[#89C6B9] rounded-[10px]  mx-auto max-w-[52px]"
                    onClick={addToTeam}
                  />
                </div>
              </div>

              {formInputsP2.map(
                ({ id, value, name, input, type, obligatorily, dimension }) => {
                  return (
                    <div
                      key={id}
                      className="bg-[#1C1D2D] rounded-[10px] inputHover mb-10"
                    >
                      <div className="px-[36px] py-[50px]">
                        <div className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                          <p className="mr-2">{t(name)}</p>
                          <p className="text-[#89C6B9]">
                            {obligatorily ? "*" : ""}
                          </p>
                        </div>
                        <Input
                          key={id}
                          id={id}
                          input={t(input)}
                          value={value}
                          type={type}
                          controller={handleInputs}
                          inputs={formInputsP2}
                          setInputs={setFormInputsP2}
                        />
                        {dimension ? (
                          <div className="mt-5 flex items-center gap-4">
                            <img
                              src={dimensionWarning}
                              alt="dimension warning"
                            />
                            <div className="inter-normal text-[14px] leading-[17px]">
                              {t("size")} {dimension}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div>
              <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-[60px]">
                <div className="px-10 py-[60px]">
                  <p className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                    {t("choose_token")}:
                  </p>
                  <div className="flex items-center gap-7 flex-wrap">
                    {tokens.map(({ id, name, img, active }) => {
                      return (
                        <Token
                          key={id}
                          id={id}
                          img={img}
                          name={name}
                          active={active}
                          setActive={handleTokens}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              {formInputsP3.map(
                ({ id, value, name, input, type, obligatorily }) => {
                  return (
                    <div
                      key={id}
                      className="bg-[#1C1D2D] rounded-[10px] inputHover mb-10"
                    >
                      <div className="px-[36px] py-[50px]">
                        <div className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                          <p className="mr-2">{t(name)}</p>
                          <p className="text-[#89C6B9]">
                            {obligatorily ? "*" : ""}
                          </p>
                        </div>
                        <Input
                          key={id}
                          id={id}
                          input={t(input)}
                          value={value}
                          type={type}
                          controller={handleInputs}
                          inputs={formInputsP3}
                          setInputs={setFormInputsP3}
                        />
                      </div>
                    </div>
                  );
                }
              )}
              <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-[60px] max-w-[464px]">
                <div className="px-10 py-[60px]">
                  <p className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                    {t("keep_touch")}
                  </p>
                  <div className="flex flex-col gap-5">
                    {social.map(({ id, value, input, group }) => {
                      return (
                        <div
                          key={id}
                          className="flex gap-5 md:gap-10 items-end"
                        >
                          {group === "telegram" ? (
                            <Telegram className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                          ) : group === "twitter" ? (
                            <Twitter className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                          ) : group === "discord" ? (
                            <Discord className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                          ) : group === "facebook" ? (
                            <Facebook className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                          ) : (
                            <Web className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                          )}
                          <Input
                            key={id}
                            id={id}
                            input={t(input)}
                            type={input}
                            value={value}
                            controller={handleInputs}
                            inputs={social}
                            setInputs={setSocial}
                          />
                        </div>
                      );
                    })}

                    <img
                      src={plus}
                      alt="plus"
                      className="mt-[20px] pt-[15px] pr-4 pb-4 pl-[17px] cursor-pointer border border-[#89C6B9] rounded-[10px]  mx-auto max-w-[52px]"
                      onClick={addToSocial}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === "1" ? (
            <div className="flex items-center justify-center gap-10 flex-wrap">
              <Button filled={false} text={t("back")} to="launchpad" />
              <div onClick={() => setPage("2")}>
                <Button filled={true} text={t("next")} to={false} />
              </div>
            </div>
          ) : page === "2" ? (
            <div className="flex items-center justify-center gap-10 flex-wrap">
              <div onClick={() => setPage("1")}>
                <Button filled={false} text={t("back")} to={false} />
              </div>

              <div onClick={() => setPage("3")}>
                <Button filled={true} text={t("next")} to={false} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-10 flex-wrap">
              <div onClick={() => setPage("2")}>
                <Button filled={false} text={t("back")} to={false} />
              </div>
              <div onClick={regProject}>
                <Button filled={true} text={t("finish")} to="" />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Form);
