import React from "react";

const PageHeader = ({ titleText }) => {
  return (
    <div className="row">
      <div className="col-12 mt-4 mb-0">
        <h1 className="m-0 pb-2 pt-2">{titleText}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
