import React from "react";
import ContentLoader from "react-content-loader";

const FilterLoader = (props) => (
  <ContentLoader
    speed={2}
    width={132}
    height={42}
    viewBox="0 0 132 42"
    backgroundColor="#1C1D2D"
    foregroundColor="#89C6B9"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="132" height="42" />
  </ContentLoader>
);

export default FilterLoader;
