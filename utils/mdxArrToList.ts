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

    console.log(`tagType (${i})`, tagType);
    console.log("item", item);

    if (isHtml) {
      if (isSingleTag) {
        // handle a single component
        listItem.id = item;
      } else if (isOpenTag) {
        if (!currentComponent) {
          // handle a component that has children
          currentComponent = componentName;
          listItem.id = `👩‍🎨 ${componentName} ${properties}`;
        } else {
          // recursively add nested children
          const childrenIsHtml = checkBraces(item);
          if (childrenIsHtml) {
            const nestedChildren = mdxArrToList(arr, i, true);
            listItem.children.push(nestedChildren[0]);
            i++; // skip next line
          }
        }
      } else if (isCloseTag && currentComponent === componentName) {
        // close component (only close for the same opening tag)
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

    // push the list item
    if (!currentComponent && listItem.id) {
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
