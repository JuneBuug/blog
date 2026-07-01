import { tailwind } from "@theme-ui/presets"
import "../gatsby-plugin-theme-ui/fonts.css"

const headingStyles = {
  h1: {
    ...tailwind.styles.h1,
    color: `heading`,
    fontSize: [5, 5, 5],
    mt: 2,
  },
  h2: {
    ...tailwind.styles.h2,
    color: `heading`,
    fontSize: [4, 4, 4],
    mt: 2,
  },
  h3: {
    ...tailwind.styles.h3,
    color: `heading`,
    fontSize: [3, 3, 3],
    mt: 3,
  },
  h4: {
    ...tailwind.styles.h4,
    color: `heading`,
    fontSize: [2, 2, 2],
  },
  h5: {
    ...tailwind.styles.h5,
    color: `heading`,
    fontSize: [1, 1, 1],
  },
  h6: {
    ...tailwind.styles.h6,
    color: `heading`,
    fontSize: 1,
    mb: 2,
  },
}

export default {
  ...tailwind,
  initialColorMode: `light`,
  useColorSchemeMediaQuery: false,
  useCustomProperties: true,
  // @theme-ui/presets v0.17 uses named-key objects; restore arrays for numeric index access
  fontSizes: [`0.75rem`, `0.875rem`, `1rem`, `1.25rem`, `1.5rem`, `2rem`, `3rem`, `4rem`, `4.5rem`],
  space: [0, `0.25rem`, `0.5rem`, `1rem`, `2rem`, `4rem`, `8rem`, `16rem`, `32rem`],
  sizes: {
    container: `1024px`,
  },
  // Container component uses theme.layout.container (not styles.Container)
  layout: {
    container: {
      padding: [3, 4],
      maxWidth: `container`,
    },
  },
  colors: {
    ...tailwind.colors,
    primary: `#2ec40d`,
    secondary: `#5f6c80`,
    toggleIcon: tailwind.colors.gray[8],
    heading: tailwind.colors.black,
    divide: tailwind.colors.gray[4],
  },
  fonts: {
    ...tailwind.fonts,
    body: `'Pretendard', -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", sans-serif`,
    display: `'Outfit', 'Pretendard', sans-serif`,
  },
  styles: {
    ...tailwind.styles,
    root: {
      ...tailwind.styles.root,
      color: `text`,
      backgroundColor: `background`,
    },
    p: {
      fontSize: [2, 2, 3],
      letterSpacing: `-0.02em`,
      lineHeight: 1.75,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
    },
    ...headingStyles,
    blockquote: {
      borderLeftColor: `primary`,
      borderLeftStyle: `solid`,
      borderLeftWidth: `6px`,
      mx: 0,
      pl: 4,
      p: {
        fontStyle: `italic`,
      },
    },
    listItem: {
      fontSize: [2, 2, 3],
      letterSpacing: `-0.003em`,
      lineHeight: 1.85,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
    }
  },
  text: {
    ...headingStyles,
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
  dividers: {
    bottom: {
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
    },
    top: {
      borderTopStyle: `solid`,
      borderTopWidth: `1px`,
      borderTopColor: `divide`,
      pt: 3,
    },
  },
  links: {
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      ":hover": {
        color: `heading`,
        textDecoration: `underline`,
      },
      ":focus": {
        color: `heading`,
      },
    },
    listItem: {
      fontSize: [1, 2, 3],
      color: `text`,
    },
  },

}
