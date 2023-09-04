import { useState, useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";

import { useInput } from "#utils";

const Textarea = ({
  id,
  value,
  input,
  type,
  controller,
  inputs,
  setInputs,
  t,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [color, setColor] = useState("89C6B9");

  const textareaRef = useRef();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    textareaRef.current.value != ""
      ? setInputActive(true)
      : setInputActive(false);
    setIsFocused(false);
  };
  const handleTextareaChange = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const validation =
    type === "number"
      ? {
          isEmpty: true,
          validNumber: true,
        }
      : type === "country"
      ? {
          isEmpty: true,
          validCountry: true,
        }
      : type === "link"
      ? {
          isEmpty: true,
          validLink: true,
        }
      : {
          isEmpty: true,
          validText: true,
        };

  const inputValidation = useInput("", validation);

  useEffect(() => {
    type === "number"
      ? !inputValidation.validNumber
        ? setColor("ee6a63")
        : setColor("89C6B9")
      : type === "country"
      ? !inputValidation.validCountry
        ? setColor("ee6a63")
        : setColor("89C6B9")
      : type === "link"
      ? !inputValidation.validLink
        ? setColor("ee6a63")
        : setColor("89C6B9")
      : !inputValidation.validText
      ? setColor("ee6a63")
      : setColor("89C6B9");
  }, [inputValidation]);
  useEffect(() => {
    textareaRef.current.value != "" ? handleFocus() : "";
  }, []);

  return (
    <div className="relative">
      <label
        className={
          isFocused || inputActive
            ? `absolute ${
                color === "89C6B9" ? "validColorText" : "invalidColorText"
              } top-[-12px] left-0 inter-normal text-[15px] leading-5 pointer-events-none hoverEffect`
            : `absolute text-[#8d8e96] top-2 left-0 text-[15px] inter-normal md:inter-400 pointer-events-none hoverEffect`
        }
      >
        {type === "text"
          ? !inputValidation.validText
            ? t("validation_symbols")
            : input
          : type === "country"
          ? !inputValidation.validCountry
            ? t("validation_country")
            : input
          : type === "number"
          ? !inputValidation.validNumber
            ? t("validation_number")
            : input
          : type === "link"
          ? !inputValidation.validLink
            ? t("validation_link")
            : input
          : ""}
      </label>
      <textarea
        onChange={(e) => {
          inputValidation.onChange(e);
          controller
            ? controller(id, textareaRef.current.value, inputs, setInputs)
            : "";
          handleTextareaChange();
        }}
        defaultValue={value}
        type="text"
        onFocus={handleFocus}
        onBlur={(e) => {
          handleBlur();
          inputValidation.onBlur(e);
        }}
        ref={textareaRef}
        className={`textarea ${
          color === "89C6B9" ? "validColor" : "invalidColor"
        } transition500 w-full`}
      />
    </div>
  );
};

export default withTranslation()(Textarea);
