import React, { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SOCKET_PORT } from "../../consts";
import { MySetup } from "../_components/TreeHSortable/Tree.story";
import { isClient, parseMdxItems } from "../../utils";
import { useAtom } from "jotai";
import { mdxItemsAtom } from "../../store";

export function Page({ content, list }: any) {
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

  useEffect(() => {
    console.log("lastMessage", lastMessage);
  }, [lastMessage]);

  const [, setMdxItems] = useAtom(mdxItemsAtom);
  useEffect(() => {
    setMdxItems(list);
  }, [list]);

  return (
    <>
      {/* {jsx} */}
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
      <br />
      {isClient && <MySetup sendMessage={sendMessage} />}
    </>
  );
}
