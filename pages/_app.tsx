/** @jsxImportSource theme-ui */
import { AppProps } from "next/dist/shared/lib/router/router";
import { Themed, ThemeProvider } from "theme-ui";
import theme from "../src/theme";
import React from "react";
import "../styles/globals.css";

export const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Themed.root>
      <Component {...pageProps} />
    </Themed.root>
  </ThemeProvider>
);

export default App;
