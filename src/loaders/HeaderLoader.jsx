import React from "react";
import ContentLoader from "react-content-loader";

const HeaderLoader = (props) => (
  <ContentLoader
    speed={3}
    width={1400}
    height={300}
    viewBox="0 0 1400 300"
    backgroundColor="#1C1D2D"
    foregroundColor="#89C6B9"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1400" height="300" />
  </ContentLoader>
);

export default HeaderLoader;
