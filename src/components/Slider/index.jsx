import { useEffect, useState } from "react";
import "./slider.css";

import { timeDifference } from "../../utils";

import { withTranslation } from "react-i18next";

import { sliderArrow } from "../../assets/img";

import { formatNumber } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { setProjectAction } from "../../store";

import Button from "../Button";

const Slider = ({ t }) => {
  const rxProjects = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const [projects, setProjects] = useState(rxProjects.info);

  const [currentIndex, setCurrentIndex] = useState(0);

  const setStoreProject = (project) => {
    dispatch(setProjectAction(project));
  };

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
    const now = Math.floor(Date.now() / 1000);
    const filtredProjects = rxProjects.info.filter(
      (project) =>
        now < project.info.startFunding ||
        (now > project.info.startFunding && now < project.info.endFunding)
    );
    setProjects(filtredProjects);
  }, [rxProjects]);
  return (
    <section className="section">
      <div className="section-center">
        {projects.map((project, projectIndex) => {
          //slider settings
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
          //days
          const currentTime = Math.floor(Date.now() / 1000);
          let days;
          let startState = "start";
          if (currentTime < project.info.startFunding) {
            let timeDiff = timeDifference(project.info.startFunding);
            days = timeDiff.days;
          }
          if (
            currentTime > project.info.startFunding &&
            currentTime < project.info.endFunding
          ) {
            let timeDiff = timeDifference(project.info.endFunding);
            days = timeDiff.days;
            startState = "end";
          }
          if (project.info.startFunding == 0) {
            days = 0;
          }
          //raised funds
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
                        <p className="end">{startState} in days</p>
                        <p className="end-in">{days}</p>
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
                  <div  onClick={() => {
                      setStoreProject(project);
                    }} className="mb-5">
                    <Button
                      filled={false}
                      text={t("launchpad_explore")}
                      to="project"
                    />
                  </div>
                  <div
                    onClick={() => {
                      setStoreProject(project);
                    }}
                  >
                    <Button
                      filled={true}
                      text={t("launchpad_invest")}
                      to="project"
                    />
                  </div>
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
