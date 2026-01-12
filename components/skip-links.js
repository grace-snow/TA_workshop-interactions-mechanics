import React from "react";

import "./styles/skip-links.scss";

const SkipLinks = ({ children }) => {
  return (
    <>
      <ul className='skip-links'>{children}</ul>
    </>
  );
};

export default SkipLinks;
