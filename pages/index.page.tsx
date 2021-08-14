import React, { useState } from "react";
import { navigate } from "vite-plugin-ssr/client/router";
import { Counter } from "./_components/Counter";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SOCKET_PORT } from "../consts";
import { DndExample } from "./_components/dnd-example/DndExample";

export default IndexPage;

function IndexPage() {
  const [value, setValue] = useState("");
  const hostname = typeof window !== "undefined" && window.location.hostname;
  const socketUrl = `ws://${hostname}:${SOCKET_PORT}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log("lastMessage", lastMessage);

  return (
    <>
      <h1>
        Welcome to <code>vite-plugin-ssr</code>
      </h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <p>
        We use <code>useClientRouter()</code> to do Client-side Routing.{" "}
        <button
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * 3);
            navigate(["/markdown", "/star-wars", "/hello/alice"][randomIndex]);
          }}
        >
          Random Page
        </button>
      </p>
      <div>
        editor
        <br />
        connectionStatus : {connectionStatus}
        <br />
        <textarea
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            setValue(newValue);
          }}
        />
        <button
          onClick={() => {
            const json = JSON.stringify({
              filename: "hello-1.page.mdx",
              content: value,
            });
            sendMessage(json);
          }}
        >
          write
        </button>
      </div>
      <DndExample />
    </>
  );
}
