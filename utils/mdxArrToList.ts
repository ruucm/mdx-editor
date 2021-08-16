import { parse } from "node-html-parser";

export function mdxArrToList(arr: any) {
  const list = [];
  let listItem: any = { id: "", children: [] };

  const items = arr;
  let componentOpened = false;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    var regExp = /\<([^)]+)\>/;
    var matches = regExp.exec(item);
    const isHtml = matches && matches.length > 0;

    if (isHtml) {
      componentOpened = true;

      const isSingleComponentTag = item.includes("/>");
      const isComponentOpenTag =
        item.indexOf("<") === 0 && !item.includes("</");
      const isComponentCloseTag = item.indexOf("</") === 0;

      if (isSingleComponentTag) {
        // handle a single component
        listItem.id = item;
      } else if (isComponentOpenTag) {
        // handle a component that has children

        const { componentName, properties } = parseJSX(item);
        listItem.id = `👩‍🎨 ${componentName} ${properties}`;
      } else if (isComponentCloseTag) {
        // close component
        componentOpened = false;
      }
    } else {
      if (componentOpened) {
        if (!listItem.children) listItem.children = [];
        // handle children of the opened component
        listItem.children.push({ id: item, children: [] });
      } else if (!componentOpened) {
        // handle normal markdown texts
        listItem.id = item;
      }
    }
    console.log(`listItem (${i})`, listItem);
    console.log("componentOpened", componentOpened);

    if (!componentOpened) {
      console.log("listItem!", listItem);
      list.push(listItem);
      listItem = { id: "", children: [] };
    }
  }

  return list;
}

function parseJSX(jsx: any) {
  const parsed = parse(jsx);

  // @ts-ignore
  const { rawTagName, rawAttrs } =
    parsed.childNodes[0].parentNode.childNodes[0];

  const properties = objectifiedStr(rawAttrs);

  return { componentName: rawTagName, properties };
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
