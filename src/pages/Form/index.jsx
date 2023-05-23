import { Header, Footer, FormInput, Button } from "../../components";

import { withTranslation } from "react-i18next";

const Form = ({ t }) => {
  return (
    <>
      <Header page="launchpad" />
      <div className="max-w-[1440px] mx-auto overflow-hidden md:overflow-visible">
        <div className="xl:px-[30px] lg:px-[30px] px-[15px] relative pt-[25px] md:pt-[30px] text-[#fff] mb-10">
          <div className="flex items-start justify-between flex-col w-full mb-[70px]">
            <h1 className="inter-bold text-[36px] leading-[44px]  md:inter-700 max-w-[274px] md:max-w-[700px]">
              {t("form_questions")}
            </h1>
            <p className="inter-400 mt-[50px] md:mt-[100px] mx-auto">1/3</p>
          </div>

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
          <div className="flex items-center justify-center gap-10 flex-wrap">
            <Button filled={false} text={t("back")} to="launchpad" />
            <Button filled={true} text={t("next")} to="launchpad" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withTranslation()(Form);
