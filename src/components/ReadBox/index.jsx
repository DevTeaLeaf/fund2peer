import { withTranslation } from "react-i18next";

import Button from "../Button";

const ReadBox = ({ t, name, description }) => {
  return (
    <div className="max-w-[300px] max-h-[289px] rounded-[10px] bg-read hoverEffect cursor-pointer">
      <div className="px-5 pb-10 pt-5">
        <h1 className="inter-bold text-[36px] leading-[58px]">{name}</h1>
        <p className="max-h-[82px] text-ellipsis overflow-hidden inter-normal text-[14px] mt-[18px] mb-[34px]">
          {description}
        </p>
        <Button text={t("read_more")} />
      </div>
    </div>
  );
};
export default withTranslation()(ReadBox);
