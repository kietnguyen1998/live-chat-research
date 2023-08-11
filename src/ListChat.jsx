import React, { useEffect, useRef } from "react";
import MessageChat from "./MessageChat";

export default function ListChat({ width, height, dataSource }) {
  const myRef = useRef(null)
  useEffect(() => {
    myRef.current.scrollTo(0, myRef.current.scrollHeight)
  }, [dataSource])
  return (
    <div className="list-chat" style={{ width, height }} ref={myRef}>
      {dataSource.map((item) => (
        <MessageChat key={item.id} data={item} />
      ))}
    </div>
  );
}
