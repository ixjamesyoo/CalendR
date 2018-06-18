import React from "react";
// import { Route } from "react-router-dom";
import SessionFormContainer from "../session_form/session_form_container";

export default ({ modal, reviewId, closeModal }) => {
  if (!modal) {
    return null;
  }

  switch(modal) {
    case "login":
    case "signup":
      return (
        <div className="modal-background" onClick={ closeModal }>
          <div className="modal-child" onClick={ e => e.stopPropagation() }>
            <SessionFormContainer formType={ modal }/>
          </div>
        </div>
      );
  }
};
