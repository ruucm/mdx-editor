import { parse } from "node-html-parser";

export function mdxArrToList(arr: any) {
  const list = [];
  let listItem: any = {};
  let compStart = 0;

  const items = arr;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    var regExp = /\<([^)]+)\>/;
    var matches = regExp.exec(item);
    const isHtml = matches && matches.length > 0;

    if (isHtml) {
      if (item.includes("/>")) {
        // handle a single component
        listItem.id = item;
      } else if (!item.includes("</")) {
        // handle a component that has children
        listItem.id = jsxToCompStr(item);
        compStart = i;
        listItem.children = [];

        for (let j = compStart + 1; j < items.length; j++) {
          const childItem = items[j];

          if (childItem.includes("</")) break;

          if (!childItem.includes("</"))
            listItem.children.push({ id: childItem, children: [] });
        }
      } else if (item.includes("</")) {
        // do nothing
      }
    }
    if (Object.keys(listItem).length > 0) {
      console.log("listItem!", listItem);
      list.push(listItem);
      listItem = {};
    }
  }

  return list;
}

function jsxToCompStr(jsx: any) {
  const parsed = parse(jsx);
  // @ts-ignore
  const rawAttrs = parsed.childNodes[0].parentNode.childNodes[0].rawAttrs;
  const componentName = jsx
    .replace(rawAttrs, "")
    .replace("<", "")
    .replace(">", "")
    .replace(" ", "");
  console.log("componentName", componentName);
  const propertiesObjStr = propertiesStrToObj(rawAttrs);

  console.log("propertiesObjStr", propertiesObjStr);

  return `👩‍🎨 ${componentName} ${propertiesObjStr}`;
}

function propertiesStrToObj(str: string) {
  let res = "";
  res += "{ ";

  const trimed = str.replace(/=/g, " : ");
  res += trimed;

  res += "}";

  return res;
}
