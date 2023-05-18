const InvestorBox = ({ address, amount, img }) => {
  return (
    <div className="bg-[#1c1d2d] rounded-[10px] w-[300px] hoverEffect">
      <div className="p-[30px]">
        <p className="truncate cursor-pointer inter-normal text-[16px] leading-[17px]">
          {address}
        </p>
        <div className="flex items-center mt-[34px]">
          <p className="mr-[15px] inter-normal text-[20px] leading-[17px]">
            {amount}
          </p>
          <img src={img} alt="tokenImg" />
        </div>
      </div>
    </div>
  );
};

export default InvestorBox;
