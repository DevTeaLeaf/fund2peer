import { useEffect, useState } from "react";
import { Header, Footer, Input, Button, Token, Member } from "../../components";
import {
  Twitter,
  Discord,
  Telegram,
  Facebook,
  plus,
  dimensionWarning,
} from "../../assets/img";
import { formTokens, formInputs, members } from "../../constants";

import { withTranslation } from "react-i18next";

const Form = ({ t }) => {
  const [page, setPage] = useState("1");
  const [tokens, setTokens] = useState(formTokens);
  const [formInputsP1, setFormInputsP1] = useState(formInputs.page1);
  const [formInputsP2, setFormInputsP2] = useState(formInputs.page2);
  const [formInputsP3, setFormInputsP3] = useState(formInputs.page3);
  const [formTeam, setFormTeam] = useState(members);

  const [highlightsInputs, setHighlightsInputs] = useState(
    formInputs.highlights
  );

  const addToTeam = () => {
    let newTeam = [
      ...formTeam,
      {
        id: Math.random(),
        input1: { id: Math.random(), value: "", input: "name", type: "text" },
        input2: {
          id: Math.random(),
          value: "",
          input: "avatar_link",
          type: "link",
        },
        input3: {
          id: Math.random(),
          value: "",
          input: "nickname",
          type: "text",
        },
      },
    ];
    setFormTeam(newTeam);
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
    const updatedInputs = inputs.map((item) =>
      item.id === itemId ? { ...item, value: value } : { ...item }
    );
    setInputs(updatedInputs);
  };

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
              {formInputsP1.map(
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
                          inputs={formInputsP1}
                          setInputs={setFormInputsP1}
                        />
                      </div>
                    </div>
                  );
                }
              )}
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
                    {formTeam.map(({ id, input1, input2, input3 }, index) => {
                      return (
                        <Member
                          index={index}
                          key={id}
                          inputs={[input1, input2, input3]}
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
              {formInputsP3.map(({ id, value, name, input, type }) => {
                return (
                  <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-10">
                    <div className="px-[36px] py-[50px]">
                      <div className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                        <p className="mr-2">{t(name)}</p>
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
              })}
              <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-[60px] max-w-[464px]">
                <div className="px-10 py-[60px]">
                  <p className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                    {t("keep_touch")}
                  </p>
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-5 md:gap-10 items-end">
                      <Telegram className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                      <Input input={t("link")} type="link" />
                    </div>
                    <div className="flex gap-5 md:gap-10 items-end">
                      <Twitter className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                      <Input input={t("link")} type="link" />
                    </div>
                    <div className="flex gap-5 md:gap-10 items-end">
                      <Discord className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                      <Input input={t("link")} type="link" />
                    </div>
                    <div className="flex gap-5 md:gap-10 items-end">
                      <Facebook className="w-[28px] h-[28px] md:w-[36px] md:h-[36px]" />
                      <Input input={t("link")} type="link" />
                    </div>
                    <img
                      src={plus}
                      alt="plus"
                      className="mt-[20px] pt-[15px] pr-4 pb-4 pl-[17px] cursor-pointer border border-[#89C6B9] rounded-[10px]  mx-auto max-w-[52px]"
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

              <Button filled={true} text={t("next")} to="launchpad" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Form);
