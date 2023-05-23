import { useState } from "react";

const FormInput = ({ name, input, obligatorily }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <>
      <div className="bg-[#1C1D2D] rounded-[10px] inputHover mb-10">
        <div className="px-[36px] py-[50px]">
          <div className="inter-400 text-[24px] leading-[29px] flex mb-[22px]">
            <p className="mr-2">{name}</p>
            <p className="text-[#89C6B9]">{obligatorily ? "*" : ""}</p>
          </div>
          <div className="relative">
            <label
              className={
                isFocused
                  ? "absolute text-[#89c6b9] top-[-12px] left-0 inter-normal text-[15px] leading-5 pointer-events-none hoverEffect"
                  : "absolute text-[#8d8e96] top-2 left-0 text-[15px] inter-normal md:inter-400 pointer-events-none hoverEffect"
              }
            >
              {input}
            </label>
            <input
              type="text"
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="search focus:border-[#89c6b9] transition500 w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default FormInput;
