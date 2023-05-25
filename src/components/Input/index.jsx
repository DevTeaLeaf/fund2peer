import { useState, useRef, useEffect } from "react";
import { useInput } from "../../utils";
import { withTranslation } from "react-i18next";

const Input = ({ input, t }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [color, setColor] = useState("89C6B9");

  const inputRef = useRef();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    inputRef.current.value != "" ? setInputActive(true) : setInputActive(false);
    setIsFocused(false);
  };

  const inputValidation = useInput("", {
    isEmpty: true,
    validText: true,
  });

  useEffect(() => {
    !inputValidation.validText ? setColor("ee6a63") : setColor("89C6B9");
  }, [inputValidation]);
  return (
    <div className="relative">
      <label
        className={
          isFocused || inputActive
            ? `absolute text-[#${color}] top-[-12px] left-0 inter-normal text-[15px] leading-5 pointer-events-none hoverEffect`
            : `absolute text-[#8d8e96] top-2 left-0 text-[15px] inter-normal md:inter-400 pointer-events-none hoverEffect`
        }
      >
        {!inputValidation.validText ? t("validation_symbols") : input}
      </label>
      <input
        onChange={(e) => inputValidation.onChange(e)}
        defaultValue={inputValidation.value}
        type="text"
        onFocus={handleFocus}
        onBlur={(e) => {
          handleBlur();
          inputValidation.onBlur(e);
        }}
        ref={inputRef}
        className={`search focus:border-[#${color}] transition500 w-full`}
      />
    </div>
  );
};

export default withTranslation()(Input);
