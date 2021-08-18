import { isEmptyOrSpaces } from ".";
import { TreeItems } from "../pages/_components/TreeHSortable/types";

export function parseMdxItems(frontMatter: any, mdxItems: TreeItems) {
  let res = "";
  res += parseFrontMatter(frontMatter);

  for (let i = 0; i < mdxItems.length; i++) {
    const mdxItem = mdxItems[i];
    res += parseMdxItem(mdxItem);
  }

  return res;
}

function parseFrontMatter(frontMatter: any) {
  let res = "---";

  for (const key in frontMatter) {
    if (frontMatter.hasOwnProperty(key)) {
      const element = frontMatter[key];
      res += `\n\n${key}: ${element}`;
    }
  }

  res += "\n\n---";

  return res;
}

function parseMdxItem(mdxItem: any) {
  let res = "";
  const content = mdxItem.id;
  const isComponent = content.includes("👩‍🎨");

  if (isComponent) {
    const propertyString = getContentBetweenCurly(content);
    console.log("propertyString", propertyString);
    const componentName = content
      .replace(propertyString, "")
      .replace("{", "")
      .replace("}", "")
      .replace(/ /g, "")
      .replace("👩‍🎨", "");
    const hasChild = mdxItem.children.length > 0;

    res += `\n\n<${componentName}`;

    if (!isEmptyOrSpaces(propertyString)) {
      const splited = propertyString.split(",");

      for (let j = 0; j < splited.length; j++) {
        if (j === 0) res += " ";

        const property = splited[j].split(":");
        const propertyKey = property[0].trim();
        const propertyValue = property[1].trim();
        res += `${propertyKey}=${propertyValue}`;

        if (j < splited.length - 1) res += " ";
      }
    }

    if (hasChild) res += ">";
    else res += "/>";

    // handle children of the component
    const children = mdxItem.children;
    if (hasChild) {
      for (let k = 0; k < children.length; k++) {
        const childItem = children[k];
        res += parseMdxItem(childItem);
      }
    }

    if (hasChild) res += `\n\n</${componentName}>\n\n`;
  } else {
    res += "\n\n";
    res += content;
    res += "\n\n";
  }

  return res;
}

function getContentBetweenCurly(str: string) {
  let found = [], // an array to collect the strings that are found
    rxp = /{([^}]+)}/g,
    curMatch;

  while ((curMatch = rxp.exec(str))) {
    found.push(curMatch[1]);
  }

  return found[0];
}
