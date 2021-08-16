import React, { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { SOCKET_PORT } from "../../consts";
import { MySetup } from "../_components/TreeHSortable/Tree.story";
import { isClient } from "../../utils";
import { useAtom } from "jotai";
import { mdxItemsAtom } from "../../store";

export function Page({ list }: any) {
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

  // sync written mdx content
  const [, setMdxItems] = useAtom(mdxItemsAtom);
  useEffect(() => {
    setMdxItems(list);
  }, [list]);

  return (
    <>
      connectionStatus : {connectionStatus}
      {isClient && <MySetup sendMessage={sendMessage} />}
    </>
  );
}
