/** @jsxImportSource theme-ui */
import { AppProps } from "next/dist/shared/lib/router/router";
import { Themed, ThemeProvider } from "theme-ui";
import theme from "../src/theme";
import React from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../src/store";
import { ModalProvider } from "react-modal-hook";
import { TransitionGroup } from "react-transition-group";

export const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ModalProvider rootComponent={TransitionGroup}>
        <Themed.root>
          <Component {...pageProps} />
        </Themed.root>
      </ModalProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
