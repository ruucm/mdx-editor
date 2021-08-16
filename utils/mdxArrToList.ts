import { parse } from "node-html-parser";

export function mdxArrToList(
  arr: any,
  start: number = 0,
  grabOne: boolean = false
) {
  const list = [];
  let listItem: any = { id: "", children: [] };

  const items = arr;
  let currentComponent = "";

  for (let i = start; i < items.length; i++) {
    const item = items[i];

    const isHtml = checkBraces(item);

    const isSingleTag = isHtml && item.includes("/>");
    const isOpenTag = isHtml && item.indexOf("<") === 0 && !item.includes("</");
    const isCloseTag = isHtml && item.indexOf("</") === 0;
    const tagType = getTagType(isSingleTag, isOpenTag, isCloseTag);

    const { componentName, properties }: any = parseJSX(item, isHtml, tagType);

    console.log("currentComponent", currentComponent);

    if (isHtml) {
      currentComponent = componentName;

      if (isSingleTag) {
        // handle a single component
        listItem.id = item;
      } else if (isOpenTag) {
        // handle a component that has children
        listItem.id = `👩‍🎨 ${componentName} ${properties}`;
      } else if (isCloseTag) {
        // close component
        currentComponent = "";

        if (grabOne) {
          list.push(listItem);
          break;
        }
      }
    } else {
      if (currentComponent) {
        if (!listItem.children) listItem.children = [];

        // handle children of the opened component
        listItem.children.push({ id: item, children: [] });
      } else if (!currentComponent) {
        // handle normal markdown texts
        listItem.id = item;
      }
    }
    console.log(`listItem (${i})`, listItem);

    if (!currentComponent) {
      console.log("listItem!", listItem);
      list.push(listItem);
      listItem = { id: "", children: [] };
    }
  }

  return list;
}

function parseJSX(jsx: any, isHtml: any, tagType: TagType) {
  if (!isHtml) return { componentName: "", properties: "" };

  if (tagType === "open") {
    const parsed = parse(jsx);

    // @ts-ignore
    const { rawTagName, rawAttrs } =
      parsed.childNodes[0].parentNode.childNodes[0];

    return { componentName: rawTagName, properties: objectifiedStr(rawAttrs) };
  } else if (tagType === "close") {
    return {
      componentName: jsx.replace("</", "").replace(">", ""),
      properties: "",
    };
  }
}

function objectifiedStr(str: string) {
  let res = "";
  res += "{ ";

  var regExp = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
  const found = str.match(regExp);

  if (found) {
    for (let i = 0; i < found.length; i++) {
      res += found[i].replace("=", " : ");
      if (i < found.length - 1) res += ", ";
    }
  }

  res += "}";

  return res;
}

type TagType = "single" | "open" | "close" | undefined;

function getTagType(
  isSingleTag: boolean,
  isOpenTag: boolean | null,
  isCloseTag: boolean | null
): TagType {
  if (isSingleTag) return "single";
  else if (isOpenTag) return "open";
  else if (isCloseTag) return "close";
}

function checkBraces(item: string) {
  const regExp = /\<([^)]+)\>/;
  const matches = regExp.exec(item);

  return matches && matches.length > 0;
}
