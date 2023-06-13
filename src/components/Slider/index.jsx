import { useEffect, useState } from "react";
import "./slider.css";

import { Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

import { sliderArrow } from "../../assets/img";

import { formatNumber } from "../../utils";
import { useSelector } from "react-redux";

import Button from "../Button";

const Slider = ({ t }) => {
  const rxProjects = useSelector((state) => state);
  const [projects, setProjects] = useState(rxProjects);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(rxProjects);

  useEffect(() => {
    const lastIndex = projects.length - 1;
    if (currentIndex < 0) {
      setCurrentIndex(lastIndex);
    }
    if (currentIndex > lastIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, projects]);

  useEffect(() => {
    if (projects.length < rxProjects.length) {
      setProjects(rxProjects);
    }
  }, [rxProjects, projects]);
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
          let raised = (
            (project.info.totalRaised / project.info.softCap) *
            100
          ).toFixed();
          return (
            <div
              className={`${position} slide`}
              key={project.address}
              style={transform}
            >
              <div className="left-part">
                <p className="projectName">{project.info.projectName}</p>
                <div className="left-part-div">
                  <p
                    className={`status ${
                      project.info.verified ? "verified" : "not-verified"
                    }`}
                  >
                    {project.info.verified ? "Verified" : "Not verified"}
                  </p>
                  <img
                    src="https://drive.google.com/uc?export=view&id=1M7vnJnLKEgPoa6EA3vSP4bSpvgzCAyRp" // project.info.preview
                    alt={project.info.projectName}
                    className="project-img"
                  />
                  <div className="absolute right-[31.1px] bottom-[57.34px] info">
                    <div className="flex items-center">
                      <p className="minProjectName">
                        {project.info.projectName}
                      </p>
                      <div className="end-days">
                        <p className="end">end in days</p>
                        <p className="end-in">{project.info.startFunding}</p>
                      </div>
                    </div>
                    <div className="main-div">
                      <div className="main-1"></div>
                      <div
                        className="main-2"
                        style={{ width: `${raised}%` }}
                      ></div>
                      <div className="main-3">
                        <p>Total Raise</p>
                        <p>{`$${formatNumber(
                          project.info.totalRaised
                        )} / $${formatNumber(project.info.softCap)}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-part">
                <p className="quote">{project.info.shortDesc}</p>
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
