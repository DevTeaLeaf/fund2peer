const Token = ({ id, img, name, active, setActive }) => {
  return (
    <div
      onClick={() => setActive(id)}
      className="cursor-pointer flex items-center flex-col"
    >
      <img
        src={img}
        alt="test"
        className={`${
          active ? "border-[3px] border-[#89C6B9]" : ""
        } rounded-full max-w-[42px]`}
      />
      <p
        className={`inter-normal text-[14px] leading-[17px] mt-2 ${
          active ? "text-[#89c6b9]" : ""
        }`}
      >
        {name}
      </p>
    </div>
  );
};

export default Token;
