import { useState, useEffect } from "react";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [validText, setValidText] = useState(true);
  const [validLink, setValidLink] = useState(true);
  const [validCountry, setValidCountry] = useState(true);
  const [validNumber, setValidNumber] = useState(true);

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
          /*/^[a-zA-Z0-9. ]+$/.test(value) ||value === "" ? setValidText(true)
            : setValidText(false);*/
          setValidText(true);
          break;
        case "validLink":
          /^(http|https):\/\/[^\s/$.?#].[^\s]*$/.test(value) || value === ""
            ? setValidLink(true)
            : setValidLink(false);
          break;
        case "validCountry":
          /^[A-Za-z]+$/.test(value) || value === ""
            ? setValidCountry(true)
            : setValidCountry(false);
          break;
        case "validNumber":
          /\d+/g.test(Number(value)) || value === ""
            ? setValidNumber(true)
            : setValidNumber(false);

          break;
      }
    }
  }, [value]);

  return {
    isEmpty,
    minLengthError,
    validText,
    validLink,
    validCountry,
    validNumber,
  };
};

export default useValidation;
