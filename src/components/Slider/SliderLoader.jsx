import React from "react";
import ContentLoader from "react-content-loader";

const SliderLoader = (props) => (
  <ContentLoader
    speed={3}
    width={800}
    height={600}
    viewBox="0 0 800 600"
    backgroundColor="#1C1D2D"
    foregroundColor="#89C6B9"
    {...props}
  >
    <rect x="0" y="30" rx="0" ry="0" width="200" height="30" />
    <rect x="0" y="71" rx="0" ry="0" width="350" height="495" />
    <rect x="361" y="71" rx="0" ry="0" width="250" height="320" />
    <rect x="361" y="399" rx="4" ry="4" width="250" height="50" />
    <rect x="361" y="460" rx="4" ry="4" width="250" height="50" />
    <circle cx="381" cy="537" r="20" />
    <circle cx="436" cy="537" r="20" />
  </ContentLoader>
);

export default SliderLoader;
