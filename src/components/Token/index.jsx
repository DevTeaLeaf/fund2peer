const Token = ({ img, name }) => {
  return (
    <div className="cursor-pointer flex align-center flex-col">
      <img
        src={img}
        alt="test"
        className="border-[3px] border-[#89C6B9] rounded-full max-w-[42px]"
      />
      <p className="inter-normal text-[14px] leading-[17px] mt-2">{name}</p>
    </div>
  );
};

export default Token;
