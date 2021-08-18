import { useAtom } from "jotai"
import React, { useEffect } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { SOCKET_PORT, testMdxFileBase, testMdxFileName } from "../../consts"
import { mdxItemsAtom } from "../../store"
import { isClient } from "../../utils"
import { MySetup } from "../_components/TreeHSortable/Tree.story"

export function Page({ frontMatter, list }: any) {
  const hostname = typeof window !== "undefined" && window.location.hostname
  const socketUrl = `ws://${hostname}:${SOCKET_PORT}`
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl)

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState]

  useEffect(() => {
    console.log("lastMessage", lastMessage)
  }, [lastMessage])

  // sync written mdx content
  const [, setMdxItems] = useAtom(mdxItemsAtom)
  useEffect(() => {
    setMdxItems({ frontMatter, body: list })
  }, [list])

  return (
    <>
      connectionStatus : {connectionStatus}
      <br />
      editing (now) : {`${testMdxFileBase}${testMdxFileName}`}
      <div
        style={{ background: "hsl(0, 0%, 90%)", marginTop: 40, padding: 12 }}
      >
        frontMatter : {JSON.stringify(frontMatter, null, 2)}
      </div>
      {isClient && <MySetup sendMessage={sendMessage} />}
    </>
  )
}
