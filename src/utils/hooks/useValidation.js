import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [validText, setValidText] = useState(true);
  const [validLink, setValidLink] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "validText":
          /^[a-zA-Z0-9. ]+$/.test(value) || value === ""
            ? setValidText(true)
            : setValidText(false);
          break;
        case "validLink":
          /^(http|https):\/\/[^\s/$.?#].[^\s]*$/.test(value) || value === ""
            ? setValidLink(true)
            : setValidLink(false);
          break;
        /*case "validAddress":
            /^0x[a-fA-F0-9]{40}$/.test(value) || value === ""
              ? setValidAddress(false)
              : setValidAddress(true);
            break;*/
      }
    }
  }, [value]);

  return { isEmpty, minLengthError, validText, validLink };
};

export default useValidation;
