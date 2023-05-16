const StatisticsBox = ({ text, img, info }) => {
  return (
    <>
      <div className="cursor-pointer max-w-[360px] md:max-w-[427px] w-full max-h-[186px] bg-box rounded-[10px] hoverEffect">
        <div className="p-5 md:p-10">
          <div className="flex items-center">
            <p className="inter-bold text-[20px] leading-6 mr-[25px]">{text}</p>
            <img src={img} alt="boxImg" />
          </div>
          <div className="mt-[30px] inter-700 text-[#89C6B9]">{info}</div>
        </div>
      </div>
    </>
  );
};

export default StatisticsBox;
