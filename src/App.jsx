import React, { useEffect, useState } from "react";
import "react-chat-elements/dist/main.css";
import { MessageBox, MessageList, SystemMessage } from "react-chat-elements";
import { ChatList } from "react-chat-elements";
import "./App.scss";
function App() {
  const [dataSource, setDataSource] = useState([
    {
      position: "left",
      type: "text",
      text: "Can I help u!",
    },
  ]);

  const [dataInput, setDataInput] = useState("");
  const [dataSuggest, setDataSuggest] = useState("");
  const [isSuggest, setIsSuggest] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [isChat, setIsChat] = useState(true);

  useEffect(() => {
    const length = dataSource?.length;
    if (dataSource[length - 1]?.position === "right") {
      setTimeout(() => {
        setDataSource((prev) => {
          const clone = [...prev];
          clone.push({
            position: "left",
            type: "text",
            text: "Good question",
          });
          return clone;
        });
        setIsAnswer(false);
      }, 2000);
    }

    return () => {};
  }, [dataSource]);

  const handleInput = (e) => {
    setDataInput(e.target.value);
  };

  const handleClick = () => {
    setDataSource((prev) => {
      const clone = [...prev];
      clone.push({
        position: "right",
        type: "text",
        text: dataInput,
      });
      return clone;
    });
    setDataInput("");
    setIsAnswer(true);
  };

  const handleSuggest = () => {
    setDataSource((prev) => {
      const clone = [...prev];
      clone.push({
        position: "right",
        type: "text",
        text: dataSuggest,
      });
      return clone;
    });
    setDataSuggest("");
    setIsSuggest(false);
    setIsAnswer(true);
  };

  const handleKeyDown = (e) => {
    console.log("e.key", e.key);
    if (e.key === "Enter") {
      setDataSource((prev) => {
        const clone = [...prev];
        clone.push({
          position: "right",
          type: "text",
          text: dataInput,
        });
        return clone;
      });
      setDataInput("");
      setIsAnswer(true);
    } else return null;
  };
  return (
    <>
      {isChat ? (
        <div style={{ width: 500, margin: "auto", height: 500 }}>
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
            <button
              onClick={() => {
                alert("close chat");
                setIsChat(false);
              }}
            >
              X
            </button>
          </div>
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={dataSource}
          />
          {isAnswer && (
            <SystemMessage text="The system is processing. Please wait a second..." />
          )}

          <div style={{ display: "flex", gap: 8, position: "relative" }}>
            {isSuggest && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  top: 0,
                  left: -200,
                }}
              >
                <input
                  value={dataSuggest}
                  onChange={(e) => setDataSuggest(e.target.value)}
                />
                <button onClick={handleSuggest}>generate</button>
              </div>
            )}
            <button onClick={() => setIsSuggest(!isSuggest)}>suggest</button>
            <input
              onChange={handleInput}
              value={dataInput}
              onKeyDown={handleKeyDown}
              disabled={isAnswer}
            />
            <button onClick={handleClick}>send</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsChat(true)}>click to chat</button>
      )}
    </>
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
