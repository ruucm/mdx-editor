export function mdxToList(tree: any) {
  const list = [];
  let listItem: any = {};
  let compStart = 0;

  if (tree.type === "root") {
    const items = tree.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.type === "html") {
        if (item.value.includes("/>")) {
          // handle a single component
          listItem.id = item.value;
          list.push(listItem);
          listItem = {};
        } else if (!item.value.includes("</")) {
          // handle a component that has children
          listItem.id = item.value;

          compStart = i;
          listItem.children = [];

          for (let j = compStart + 1; j < items.length; j++) {
            const childItem = items[j];

            if (childItem.type === "html" && childItem.value.includes("</")) {
              console.log("BREAK!");
              break;
            }

            if (!item.value.includes("</")) {
              // console.log("childItem", childItem);
              listItem.children.push(handleBasicMdx(childItem));
            }
          }
        } else if (item.value.includes("</")) {
        }
      }

      // console.log("item", item);
      if (Object.keys(listItem).length > 0) {
        console.log("listItem!", listItem);
        list.push(listItem);
        listItem = {};
      }
    }
  }

  return list;
}

function handleBasicMdx(item: any) {
  const res: any = { id: "", children: [] };
  if (item.type === "heading") {
    res.id = item.children[0].value;
  } else if (item.type === "paragraph") {
    res.id = item.children[0].value;
  }
  return res;
}
