import React from "react";
import ContentLoader from "react-content-loader";

const PresaleLoader = (props) => (
  <ContentLoader
    speed={2}
    width={330}
    height={500}
    viewBox="0 0 330 500"
    backgroundColor="#1C1D2D"
    foregroundColor="#89C6B9"
    {...props}
  >
    <rect x="1" y="-1" rx="20" ry="20" width="330" height="500" />
  </ContentLoader>
);

export default PresaleLoader;
