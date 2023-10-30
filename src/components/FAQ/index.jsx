import { useState } from "react";

const Item = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div
      className={`w-full bg-[#1C1D2D] rounded-[10px] cursor-pointer faqHover ${
        isOpen && "faqBorder"
      }`}
      onClick={toggleOpen}
    >
      <div className="py-[30px] px-9">
        <div className={"inter-normal text-[18px] md:text-[24px]"}>
          {question}
        </div>
        {isOpen && (
          <div className="text-[#8D8E96] inter-normal text-[16px] md:text-[18px] mt-5">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
};

const FAQ = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? null : index));
  };

  return (
    <div className="flex flex-col gap-[1rem]">
      {data.map((item, index) => (
        <Item
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={index === openIndex}
          toggleOpen={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default FAQ;
