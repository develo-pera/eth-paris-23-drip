import { Inter } from "next/font/google";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import "@/styles/globals.scss"

const inter = Inter({
  subsets: ["latin"],
});

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
  styles: {
    global: {
      body: {
        background: "#fff"
      },
      p: {
        color: "#464646"
      },
      ul: {
        color: "#464646"
      },
      heading: {
        color: "black"
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "2px",
        fontSize: "14px"
      },
      sizes: {
        lg: {
          fontSize: "16px"
        }
      }
    },
    Heading: {
      baseStyle: {
        color: "black"
      }
    },
    Link: {
      baseStyle: {
        color: "black"
      }
    },
  }
})


export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <style jsx global>
        {`
            :root {
              --inter: ${inter.style.fontFamily};
            }
          `}
      </style>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
