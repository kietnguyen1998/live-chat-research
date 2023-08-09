import React, { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox, MessageList } from "react-chat-elements";
import { ChatList } from "react-chat-elements";
function App() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    let flag = false;
    const timerId = setInterval(() => {
      setDataSource((prev) => {
        const clone = [...prev];
        clone.push({
          position: flag ? "left" : "right",
          type: "text",
          title: flag ? "Kursat" : "Emre",
          text: "Give me a message list example !",
        });
        console.log("clone", clone);
        return clone;
      });
      flag = !flag;
    }, 10000);

    return () => clearInterval(timerId);
  }, []);
  return (
    <div style={{ width: 500, margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 8,
          borderBottom: "1px solid #000",
        }}
      >
        <div>test</div>
        <button>X</button>
      </div>
      <MessageList
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={dataSource}
      />
    </div>
  );
  // <MessageBox
  //     position={"left"}
  //     type={"text"}
  //     title={"Message Box Title"}
  //     text="Here is a text type message box"
  //   />
  // );
}

export default App;
