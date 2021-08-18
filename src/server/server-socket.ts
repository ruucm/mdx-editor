import { testMdxFileBase } from "../consts"

const path = require("path")
const WebSocket = require("ws")
const { SOCKET_PORT } = require("../consts")
const fs = require("fs")
const ansiHTML = require("ansi-html")
const { AllHtmlEntities } = require("html-entities")

const entities = new AllHtmlEntities()
ansiHTML.setColors({
  reset: [, "transparent"],
  black: "000",
  red: "f00",
  green: "0f0",
  yellow: "ff0",
  blue: "00f",
  magenta: "f0f",
  cyan: "0ff",
  lightgrey: "eee",
  darkgrey: "444",
})

export function serverSocket() {
  const socketServer = new WebSocket.Server({ port: SOCKET_PORT })

  const noop = (err: any) => {}
  const updateFile =
    () =>
    ({ filename, content }: any, cb = noop) => {
      const POSTS_PATH = path.join(process.cwd(), testMdxFileBase)
      const filepath = path.join(POSTS_PATH, filename)
      if (!fs.existsSync(filepath)) return
      try {
        fs.writeFile(filepath, content, cb)
      } catch (e) {
        const err = {
          text: e.toString(),
          code: ansiHTML(entities.encode(e.codeFrame)),
        }
        cb(err)
      }
    }
  const update = updateFile()

  socketServer.on("connection", (socket: any) => {
    socket.on("message", (msg: any) => {
      const data = JSON.parse(msg)
      // console.log("on message data", data)
      if (data.filename) {
        update(data, (err) => {
          if (err) {
            const json = JSON.stringify({
              error: err,
            })
            socket.send(json)
            return
          }
          socket.send(JSON.stringify({ message: "saved" }))
        })
      }
    })
    socket.send(JSON.stringify({ message: "beep" }))
  })
}
