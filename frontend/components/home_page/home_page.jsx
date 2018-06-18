import React from "react";

export default () => {
  return (
    <React.Fragment>
      <div className="home-splash">
        <h1>Get organized today with CalendR!</h1>
      </div>
      <div className="home-bg-container">
        <img src={ window.images.homeBackground }
            className="home-bg-img" alt="calendr-bg" />
      </div>
    </React.Fragment>
  );
};
