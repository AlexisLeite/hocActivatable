/** @jsxImportSource theme-ui */
import { AppProps } from "next/dist/shared/lib/router/router";
import { Themed, ThemeProvider } from "theme-ui";
import theme from "../src/theme";
import React from "react";
import "../styles/globals.css";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";

export const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <ModalProvider rootComponent={TransitionGroup}>
      <Themed.root>
        <Component {...pageProps} />
      </Themed.root>
    </ModalProvider>
  </ThemeProvider>
);

export default App;
