import React from "react";

import NotFoundAnimation from "../../public/not-found.gif";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img className="w-2/12" src={NotFoundAnimation.src} alt="not found" />
    </div>
  );
};

export default NotFound;
