import { useState } from "react";
import { Header, Footer, Input, FormInput, Button } from "../../components";
import {
  slimArrow,
  Twitter,
  Discord,
  Telegram,
  Facebook,
} from "../../assets/img";

import { withTranslation } from "react-i18next";

const Form = ({ t }) => {
  const [page, setPage] = useState("1");
  const [modal, setModal] = useState(false);
  const [social, setSocial] = useState(false);

  const socialModalController = (social) => {
    setModal(false);

    if (social === "telegram") {
      setSocial(["telegram", <Telegram className="w-[28px] h-[28px]" />]);
    }
    if (social === "twitter") {
      setSocial(["twitter", <Twitter className="w-[28px] h-[28px]" />]);
    }
    if (social === "discord") {
      setSocial(["discord", <Discord className="w-[28px] h-[28px]" />]);
    }
    if (social === "facebook") {
      setSocial(["facebook", <Facebook className="w-[28px] h-[28px]" />]);
    }
  };

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
              <FormInput
                name={t("form_name")}
                input={t("form_enter_name")}
                obligatorily={true}
              />
              <FormInput
                name={t("form_short_desc")}
                input={t("form_100")}
                obligatorily={false}
              />
              <FormInput
                name={t("form_full_desc")}
                input={t("form_300")}
                obligatorily={false}
              />
              <FormInput
                name={t("form_youtube")}
                input={t("link")}
                obligatorily={false}
              />
              <FormInput
                name={t("form_country")}
                input={t("country")}
                obligatorily={false}
              />
              <FormInput
                name={t("form_website")}
                input={t("link")}
                obligatorily={false}
              />
            </div>
          ) : page === "2" ? (
            <div>
              <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-[60px]">
                <div className="px-10 py-[60px]">
                  <p className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
                    {t("your_team")}
                  </p>
                  <div>
                    <p className="inter-normal mb-4">Member 1</p>
                    <div className="flex items-end gap-10">
                      <div className="w-[30%]">
                        <Input input={t("name")} />
                      </div>
                      <div className="w-[40%]">
                        <Input input={t("avatar_link")} />
                      </div>
                      <div className="flex items-end gap-3">
                        <Input input={t("nickname")} />
                        <div className="relative">
                          <div
                            onClick={
                              modal
                                ? () => setModal(false)
                                : () => setModal(true)
                            }
                            className={`max-w-[46px] ${
                              social
                                ? "p-[9px] bg-[#89C6B9]"
                                : "pt-[22px] pl-[16px] pb-[17.5px] pr-[17px]"
                            } border border-[#89C6B9] rounded-[10px] cursor-pointer`}
                          >
                            {social ? (
                              social[1]
                            ) : (
                              <img
                                className={
                                  modal
                                    ? "rotate-[180deg] transition-[0.5s] min-w-[12px]"
                                    : "transition-[0.5s] min-w-[12px]"
                                }
                                src={slimArrow}
                                alt="slimArrow"
                              />
                            )}
                          </div>
                          <div
                            className={
                              modal
                                ? "bg-[#13141F] border border-[#89C6B9] rounded-l-[10px] rounded-br-[10px] absolute top-[60px] right-0 transition300"
                                : "hidden transition300"
                            }
                          >
                            <div className="inter-400 flex flex-col gap-[25px] px-[30px] py-5">
                              <div
                                onClick={() => {
                                  socialModalController("telegram");
                                }}
                                className={`flex items-center gap-[25px] cursor-pointer nickname ${
                                  social[0] == "telegram" ? "active" : ""
                                }`}
                              >
                                <Telegram className="w-6 h-6 md:w-9 md:h-9 social" />
                                <p>Telegram</p>
                              </div>
                              <div
                                onClick={() => {
                                  socialModalController("twitter");
                                }}
                                className={`flex items-center gap-[25px] cursor-pointer nickname ${
                                  social[0] == "twitter" ? "active" : ""
                                }`}
                              >
                                <Twitter className="w-6 h-6 md:w-9 md:h-9 social" />
                                <p>Twitter</p>
                              </div>
                              <div
                                onClick={() => {
                                  socialModalController("discord");
                                }}
                                className={`flex items-center gap-[25px] cursor-pointer nickname ${
                                  social[0] == "discord" ? "active" : ""
                                }`}
                              >
                                <Discord className="w-6 h-6 md:w-9 md:h-9 social" />
                                <p>Discord</p>
                              </div>
                              <div
                                onClick={() => {
                                  socialModalController("facebook");
                                }}
                                className={`flex items-center gap-[25px] cursor-pointer nickname ${
                                  social[0] == "facebook" ? "active" : ""
                                }`}
                              >
                                <Facebook className="w-6 h-6 md:w-9 md:h-9 social" />
                                <p>Facebook</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>3</div>
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
