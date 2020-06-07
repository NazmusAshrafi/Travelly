import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";
import ProfilePage from "./components/profile/ProfilePage";

import axios from "axios";

import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//components
import Navbar from "./components/Navbar";
import PostFormComment from "./components/posts/comments/PostFormComment";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import { clearCurrentProfile } from "./actions/profileAction";
import PostForm from "./components/posts/PostForm";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd7",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVarients: true,
  },
});

// axios.defaults.baseURL = "http://localhost:5000";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //-----------
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logut user
    store.dispatch(logoutUser());

    //clear current profile
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
                <PrivateRoute exact path="/users/:id" component={ProfilePage} />
                <PrivateRoute
                  exact
                  path="/post/:id"
                  component={PostFormComment}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
