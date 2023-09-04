import { Twitter, Discord, Telegram, Facebook } from "#assets/img";

const SocialModal = () => {
  return (
    <>
      <div className="fixed md:sticky bottom-[5%] left-[50%] md:left-[70%] max-w-[296px] md:max-w-[384px] socialModal socialModalTransorm">
        <div className="py-[10px] px-[25px] md:py-[25px] md:px-[50px] flex gap-12">
          <a className="social cursor-pointer" href="">
            <Twitter className="w-6 h-6 md:w-9 md:h-9" />
          </a>
          <a className="social cursor-pointer" href="">
            <Discord className="w-6 h-6 md:w-9 md:h-9" />
          </a>
          <a className="social cursor-pointer" href="">
            <Telegram className="w-6 h-6 md:w-9 md:h-9" />
          </a>
          <a className="social cursor-pointer" href="">
            <Facebook className="w-6 h-6 md:w-9 md:h-9" />
          </a>
        </div>
      </div>
    </>
  );
};

export default SocialModal;
