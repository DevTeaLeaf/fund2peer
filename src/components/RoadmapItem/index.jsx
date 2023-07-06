import { useState } from "react";
import { withTranslation } from "react-i18next";

import Input from "../Input";

const RoadmapItem = ({
  roadmapInputs,
  setRoadmapInputs,
  roadmap,
  setRoadmap,
  index,
  t,
}) => {
  const [thisRoadmapInputs, setThisRoadmapInputs] = useState(
    roadmapInputs[index]
  );
  const handleInputs = (itemId, value, inputs, setInputs) => {
    const updatedInputs = inputs.map((item) =>
      item.id === itemId ? { ...item, value: value } : { ...item }
    );

    const updatedArray = [...roadmapInputs];
    updatedArray[index] = updatedInputs;

    const updatedRoadmap = [...roadmap];
    updatedRoadmap[index].inputs = updatedInputs;

    setInputs(updatedArray);
    setThisRoadmapInputs(updatedInputs);
    setRoadmap(updatedRoadmap);
  };
  return (
    <div className="mb-5">
      <p className="inter-normal mb-4">
        {t("step")} {index + 1}
      </p>
      <div className="flex items-start gap-10 flex-wrap justify-center md:justify-between xl:justify-normal">
        <div className="max-w-full w-[70%]">
          <Input
            key={thisRoadmapInputs[0].id}
            id={thisRoadmapInputs[0].id}
            input={t(thisRoadmapInputs[0].input)}
            type={thisRoadmapInputs[0].type}
            value={thisRoadmapInputs[0].value}
            inputs={thisRoadmapInputs}
            setInputs={setRoadmapInputs}
            controller={handleInputs}
          />
        </div>
        <div className="max-w-[300px] xl:w-[20%]">
          <Input
            key={thisRoadmapInputs[1].id}
            id={thisRoadmapInputs[1].id}
            input={t(thisRoadmapInputs[1].input)}
            type={thisRoadmapInputs[1].type}
            value={thisRoadmapInputs[1].value}
            inputs={thisRoadmapInputs}
            setInputs={setRoadmapInputs}
            controller={handleInputs}
          />
        </div>
      </div>
    </div>
  );
};
export default withTranslation()(RoadmapItem);
