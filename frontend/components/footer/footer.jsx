import React from "react";

export default () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-blurb">
          <p>CalendR was built by James Yoo using React/Redux for the frontend and Ruby on Rails/PostgreSQL for the backend.</p>
        </div>
        <ul className="site-footer-links">
          <li><a href="http://www.james-yoo.com/" target="_blank"><i className="fa fa-laptop"></i><span>Portfolio</span></a></li>
          <li><a href="https://github.com/ixjamesyoo" target="_blank"><i className="fab fa-github"></i><span>Github</span></a></li>
          <li><a href="https://www.linkedin.com/in/jameshkyoo/" target="_blank"><i className="fab fa-linkedin"></i><span>LinkedIn</span></a></li>
        </ul>
      </div>
    </footer>
  );
};
