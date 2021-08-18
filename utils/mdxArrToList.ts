import { parse } from "node-html-parser"

export function mdxArrToList(
  arr: any,
  start: number = 0,
  grabOne: boolean = false
) {
  const list = []
  let listItem: any = { id: "", children: [] }

  const items = arr
  let currentComponent = ""

  for (let i = start; i < items.length; i++) {
    const item = items[i]

    const isHtml = checkBraces(item)

    const isSingleTag = isSingle(item)
    const isOpenTag = isOpen(item)
    const isCloseTag = isClose(item)
    const isInlineTag = isInline(item)
    const tagType = getTagType(isSingleTag, isOpenTag, isCloseTag, isInlineTag)

    console.log("item", item)
    console.log(`tagType (${i})`, tagType)

    const { componentName, properties }: any = parseJSX(item, isHtml, tagType)

    if (isHtml) {
      if (tagType === "single") {
        const id = `👩‍🎨 ${componentName} ${properties}`
        if (!currentComponent)
          // handle a single component
          listItem.id = id
        else listItem.children.push({ id, children: [] })
      } else if (tagType === "open") {
        if (!currentComponent) {
          // handle a composavnent that has children
          currentComponent = componentName
          listItem.id = `👩‍🎨 ${componentName} ${properties}`
        } else {
          // recursively add nested children
          const childrenIsHtml = checkBraces(item)
          if (childrenIsHtml) {
            const nestedChildren = mdxArrToList(arr, i, true)
            listItem.children.push(nestedChildren[0])
            while (!isClose(items[i])) {
              i++ // skip next line
            }
          }
        }
      } else if (tagType === "close" && currentComponent === componentName) {
        // close component (only close for the same opening tag)
        currentComponent = ""

        if (grabOne) {
          list.push(listItem)
          break
        }
      } else if (tagType === "inline") {
        listItem.id = `👩‍🎨 ${componentName} ${properties}`
      }
    } else {
      if (currentComponent) {
        if (!listItem.children) listItem.children = []

        // handle children of the opened component
        listItem.children.push({ id: item, children: [] })
      } else if (!currentComponent) {
        // handle normal markdown texts
        listItem.id = item
      }
    }
    console.log(`listItem (${i})`, listItem)

    // push the list item
    if (!currentComponent && listItem.id) {
      list.push(listItem)
      listItem = { id: "", children: [] }
    }

    function isSingle(item: any) {
      return isHtml && item.includes("/>")
    }
    function isOpen(item: any) {
      return isHtml && item.indexOf("<") === 0 && !item.includes("</")
    }
    function isClose(item: any) {
      return isHtml && item.indexOf("</") === 0
    }
    function isInline(item: any) {
      return (
        isHtml &&
        item.indexOf("<") === 0 &&
        item.includes(">") &&
        item.includes("</")
      )
    }
  }

  return list
}

function parseJSX(jsx: any, isHtml: any, tagType: TagType) {
  if (!isHtml) return { componentName: "", properties: "" }

  if (tagType === "open" || tagType === "single") {
    const parsed = parse(jsx)

    // @ts-ignore
    const { rawTagName, rawAttrs } =
      parsed.childNodes[0].parentNode.childNodes[0]

    return { componentName: rawTagName, properties: objectifiedStr(rawAttrs) }
  } else if (tagType === "close") {
    return {
      componentName: jsx.replace("</", "").replace(">", ""),
      properties: "",
    }
  } else if (tagType === "inline") {
    const parsed = parse(jsx)

    // @ts-ignore
    const { rawTagName, rawAttrs, childNodes } =
      parsed.childNodes[0].parentNode.childNodes[0]
    const inlineTextNode = childNodes[0].rawText

    return {
      componentName: rawTagName,
      properties: objectifiedStr(`${rawAttrs} children="${inlineTextNode}"`),
    }
  }
}

function objectifiedStr(str: string) {
  let res = ""
  res += "{ "

  var regExp = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g
  const found = str.match(regExp)

  if (found) {
    for (let i = 0; i < found.length; i++) {
      res += found[i].replace("=", " : ")
      if (i < found.length - 1) res += ", "
    }
  }

  res += "}"

  return res
}

type TagType = "single" | "open" | "close" | "inline" | undefined

function getTagType(
  isSingleTag: boolean,
  isOpenTag: boolean | null,
  isCloseTag: boolean | null,
  isInlineTag: boolean | null
): TagType {
  if (isSingleTag) return "single"
  else if (isOpenTag) return "open"
  else if (isCloseTag) return "close"
  else if (isInlineTag) return "inline"
}

function checkBraces(item: string) {
  const regExp = /\<([^)]+)\>/
  const matches = regExp.exec(item)

  return matches && matches.length > 0
}
