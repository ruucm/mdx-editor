import { isEmptyOrSpaces } from ".";

export function parseMdxItems(mdxItems: any) {
  let res = "";

  for (let i = 0; i < mdxItems.length; i++) {
    const mdxItem = mdxItems[i];
    res += parseMdxItem(mdxItem);
  }

  return res;
}

function parseMdxItem(mdxItem: any) {
  let res = "";
  const content = mdxItem.id;
  const isComponent = content.includes("👩‍🎨");

  if (isComponent) {
    const propertyString = getContentBetweenCurly(content);
    const componentName = content
      .replace(propertyString, "")
      .replace("{", "")
      .replace("}", "")
      .replace(/ /g, "")
      .replace("👩‍🎨", "");
    const hasChild = mdxItem.children.length > 0;

    if (hasChild) res += `<${componentName}`;
    else res += `<${componentName} />`;

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

    // handle children of the component
    const children = mdxItem.children;
    if (hasChild) {
      for (let k = 0; k < children.length; k++) {
        const childItem = children[k];
        res += parseMdxItem(childItem);
      }
    }

    if (hasChild) res += `</${componentName}>`;
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
