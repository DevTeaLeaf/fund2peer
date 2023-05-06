import { Twitter, Discord, Telegram, Facebook } from "../../assets/img";

const SocialModal = () => {
  return (
    <>
      <div className="sticky bottom-[5%] left-[70%] max-w-[384px] socialModal rigth-0">
        <div className="py-[25px] px-[50px] flex gap-12">
          <a className="social cursor-pointer" href="">
            <Twitter className="w-9 h-9" />
          </a>
          <a className="social cursor-pointer" href="">
            <Discord className="w-9 h-9" />
          </a>
          <a className="social cursor-pointer" href="">
            <Telegram className="w-9 h-9" />
          </a>
          <a className="social cursor-pointer" href="">
            <Facebook className="w-9 h-9" />
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialModal;
