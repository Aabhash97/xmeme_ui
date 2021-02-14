import "./App.css";
import { lightTheme, darkTheme } from "./Components/Themes";
import { useDarkMode } from "./Components/useDarkMode";
import { GlobalStyles } from "./Components/Globalstyle";
import { ThemeProvider } from "styled-components";
import Toggle from "./Components/Toggler";
import Typical from "react-typical";
import Navbar from "react-bootstrap/Navbar";
import logo from "./meme2.png";
import Grid from "@material-ui/core/Grid";
import FormComponenet from "./Components/FormComponent";
import React from "react";
import Divider from "@material-ui/core/Divider";
import "semantic-ui-css/semantic.min.css";
import ImageFeed from "./Components/ImageFeed";
import FooterComponenet from "./Components/FooterComponenet";
import UpdateComponent from "./Components/UpdateComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;

  return (
    <ToastProvider>
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="App">
          <>
            <Navbar>
              <Navbar.Brand href="#home">
                <img
                  src={logo}
                  width="80"
                  height="60"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
              </Navbar.Brand>
              <Grid container item xs={4} sm={3} alignItems="flex-end">
                <Typical
                  steps={["Hey👋", 1000, "Hey Meme Lover👋", 500]}
                  loop={2}
                  wrapper="p"
                />
              </Grid>
              <Grid
                container
                item
                xs={6}
                sm={3}
                alignItems="flex-end"
                spacing={16}
              ></Grid>
              <Grid container item xs={4} sm={3} alignItems="flex-end">
                XMEME STREAMER
              </Grid>

              <Grid container item xs={4}></Grid>
              <Grid container item xs={4}>
                <FormComponenet />
                <Toggle theme={theme} toggleTheme={themeToggler} />
              </Grid>
            </Navbar>
          </>
          <Divider />
          <ImageFeed />
        </div>

        <FooterComponenet />
      </>
    </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
