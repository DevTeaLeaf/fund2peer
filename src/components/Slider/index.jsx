import { useEffect, useState } from "react";
import "./slider.css";

import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

import { sliderArrow } from "../../assets/img";

import Button from "../Button";

import data from "./data";

const Slider = ({ t }) => {
  const [projects, setProjects] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const lastIndex = projects.length - 1;
    if (currentIndex < 0) {
      setCurrentIndex(lastIndex);
    }
    if (currentIndex > lastIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, projects]);
  return (
    <section className="section">
      <div className="section-center">
        {projects.map((project, projectIndex) => {
          let position = "nextSlide";
          if (projectIndex === currentIndex) {
            position = "activeSlide";
          }
          if (
            projectIndex === currentIndex - 1 ||
            (currentIndex === 0 && projectIndex === project.length - 1)
          ) {
            position = "lastSlide";
          }
          let pos =
            projectIndex - currentIndex >= 0
              ? projectIndex - currentIndex - 1
              : projects.length - currentIndex + projectIndex - 1;

          const transform = {
            transform:
              position === "nextSlide"
                ? `translate(${100 + 30 * pos}%,50%)`
                : "",
          };
          return (
            <div
              className={`${position} slide`}
              key={project.id}
              style={transform}
            >
              <div className="left-part">
                <p className="projectName">{project.projectName}</p>
                <div className="left-part-div">
                  <p className="status">{project.status}</p>
                  <img
                    src={project.image}
                    alt={project.projectName}
                    className="project-img"
                  />
                  <div className="absolute right-[31.1px] bottom-[57.34px] info">
                    <div className="flex items-center">
                      <p className="minProjectName">{project.projectName}</p>
                      <div className="end-days">
                        <p className="end">end in days</p>
                        <p className="end-in">{project.endStatus}</p>
                      </div>
                    </div>
                    <div className="main-div">
                      <div className="main-1"></div>
                      <div className="main-2"></div>
                      <div className="main-3">
                        <p>Total Raise</p>
                        <p>{`$${project.totalRaise}/$${project.finalRaise}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-part">
                <p className="quote">{project.quote}</p>
                <div className="flex items-start flex-col ani-but">
                  <div className="mb-5">
                    <Button
                      filled={false}
                      text={t("launchpad_explore")}
                      to="currentPresales"
                    />
                  </div>
                  <Button
                    filled={true}
                    text={t("launchpad_invest")}
                    to="project"
                  />
                </div>
                <div className="arrows">
                  <img
                    onClick={() =>
                      setCurrentIndex((prevState) => prevState - 1)
                    }
                    className="left-arrow"
                    src={sliderArrow}
                    alt="left"
                  />
                  <img
                    onClick={() =>
                      setCurrentIndex((prevState) => prevState + 1)
                    }
                    className="right-arrow"
                    src={sliderArrow}
                    alt="right"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default withTranslation()(Slider);
