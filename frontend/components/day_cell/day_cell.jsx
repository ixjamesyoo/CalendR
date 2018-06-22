import React from "react";

export default ({ date }) => {
  const text = date ? date.toString() : "null";
  return (
    <div>
      { text }
    </div>
  );
};
