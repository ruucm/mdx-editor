export * from "./mdxArrToList"
export * from "./parseMdxItems"

export const isClient = typeof window !== "undefined"

export function isEmptyOrSpaces(str: string) {
  return str === null || str.match(/^ *$/) !== null
}
