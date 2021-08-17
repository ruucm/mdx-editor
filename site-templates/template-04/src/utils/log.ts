import { LightTheme } from "@harborschool/lighthouse"
import debug from "debug"

const BASE = "log_base"
const COLOURS = {
  trace: "yellowgreen",
  info: LightTheme.colors.primary,
  warn: "yellow",
  error: LightTheme.colors.negative,
} // choose better colours :)

class LogClass {
  generateMessage(level, message, source) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${BASE}:${level}`
    const createDebug = debug(namespace)
    // Set the colour of the message based on the level
    createDebug["color"] = COLOURS[level]
    if (source) {
      createDebug(message, source)
    } else {
      createDebug(message)
    }
  }

  trace(message, source?: any) {
    return this.generateMessage("trace", message, source)
  }

  info(message, source?: any) {
    return this.generateMessage("info", message, source)
  }

  warn(message, source?: any) {
    return this.generateMessage("warn", message, source)
  }

  error(message, source?: any) {
    return this.generateMessage("error", message, source)
  }
}

export const Log = new LogClass()
