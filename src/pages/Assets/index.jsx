import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Header, Footer, SocialModal } from "#components";

const Assets = ({ t }) => {
  return (
    <>
      <Header page="assets" />
      <div className="max-w-[1440px] mx-auto">
        <div className="xl:px-[80px] lg:px-[30px] px-[15px] flex items-center relative pt-[65px] md:pt-[112px] text-[#fff]"></div>
        <SocialModal />
      </div>
      <Footer />
    </>
  );
};
export default withTranslation()(Assets);
