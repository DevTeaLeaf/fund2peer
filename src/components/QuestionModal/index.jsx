import { useEffect, useRef } from "react";

import { close } from "../../assets/img";

const QuestionModal = ({ question, setModalActive }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalActive(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflowY = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-[#13141f] w-full h-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[50] opacity-80"></div>
      <div
        ref={modalRef}
        className="text-[#fff] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[51] max-w-[500px] w-full bg-[#1C1D2D] rounded-[10px] max-h-[300px] tabShadow"
      >
        <img
          className="absolute right-5 top-5 cursor-pointer"
          src={close}
          alt="close"
          onClick={() => {
            setModalActive(false);
          }}
        />
        <div className="p-10 flex items-center flex-col">
          <p className="inter-400">{question}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
