import * as React from "react"
import * as System from "@harborschool/lighthouse"
import { useTheme } from "@harborschool/lighthouse"

export function DesktopOnly({ children, ...props }) {
  const theme = useTheme()
  return (
    <System.Block
      overrides={{
        Block: {
          [theme.mediaQuery.large]: {
            display: "none",
          },
        },
      }}
      {...props}
    >
      {children}
    </System.Block>
  )
}

export function MobileOnly({ children }) {
  const theme = useTheme()
  return (
    <System.Block
      overrides={{
        Block: {
          display: "none",
          [theme.mediaQuery.large]: {
            display: "block",
          },
        },
      }}
    >
      {children}
    </System.Block>
  )
}

export function SharePropsWithAllChildren({ children, ...props }) {
  const fn = child => React.cloneElement(child, { ...props })
  function renderRecursiveChildren(children, fn) {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child
      }
      // @ts-ignore
      if (child.props.children) {
        child = React.cloneElement(child, {
          // @ts-ignore
          children: renderRecursiveChildren(child.props.children, fn),
        })
      }
      return fn(child)
    })
  }
  return <>{renderRecursiveChildren(children, fn)}</>
}

export function ShareFlexPropsWithChildren({ children, ...props }) {
  return React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      ...props,
      key: index,
    })
  )
}

export function PriceCardTitle({ price, salePrice }) {
  return (
    <>
      <span
        style={{
          textDecoration: "line-through",
        }}
      >
        {price}
      </span>
      {" → "}
      <span>{salePrice}</span>
    </>
  )
}

export function AspectRatio({ children, ratio = 4 / 3, style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        paddingBottom: `${(1 / ratio) * 100}%`,
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  )
}
