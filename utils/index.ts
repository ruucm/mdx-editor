export * from "./parseMdxItems";
export * from "./mdxToList";
export * from "./mdxArrToList";

export const isClient = typeof window !== "undefined";

export function isEmptyOrSpaces(str: string) {
  return str === null || str.match(/^ *$/) !== null;
}
