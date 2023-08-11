import React from "react";

export default function MessageChat({ data }) {
  return (
    <div
      className={`mc-container${
        data.position === "right" ? " mc-container-right" : ""
      }`}
    >
      {data?.avatar && <img src={data.avatar} />}
      <div className="mc-box">{data.text}</div>
    </div>
  );
}
