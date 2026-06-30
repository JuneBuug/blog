/* eslint react/prop-types: 0 */
import React from "react"
import { Text } from "@theme-ui/components"
import Code from "../components/code"
import Title from "../components/title"

export default {
  Text: ({ children, ...props }) => <Text {...props}>{children}</Text>,
  Title: ({ children, text, ...props }) => (
    <Title text={text} {...props}>
      {children}
    </Title>
  ),
  // MDX v2에서는 mdxType prop이 없으므로 children.props.className으로 판단
  pre: ({ children, ...preProps }) => {
    const child = children
    if (child && child.props && child.props.className?.startsWith("language-")) {
      const { children: codeString, className = "", ...rest } = child.props
      const match = className.match(/language-([\0-￿]*)/)
      return (
        <Code
          codeString={typeof codeString === "string" ? codeString.trim() : ""}
          className={className}
          language={match != null ? match[1] : ""}
          {...rest}
        />
      )
    }
    return <pre {...preProps}>{children}</pre>
  },
  wrapper: ({ children }) => <>{children}</>,
}
