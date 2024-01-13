import withStyles from '@mui/styles/withStyles';

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Copyright from "./copyright";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@mui/material/Typography";
import * as firebase from "firebase/app";
//////////////////////////////////////
//FireBaseの初期化
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

import "firebase/auth";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer
} from "@react-firebase/auth";
import { config } from "../config";

firebase.initializeApp(config);

const useStyles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// A basic login page using firebase.
class SignIn extends React.Component {

  email = "";
  password = "";

  // クラスメソッドとしてサインインを定義
  static signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  handleSignIn = () => {
    SignIn.signInWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        // サインイン成功時の処理
        var user = userCredential.user;
        console.log("Signed in user:", user);
      })
      .catch((error) => {
        // サインインエラー時の処理
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Sign in error:", errorCode, errorMessage);
      });
  };
    /*signinwithEandP = new firebase.auth.createUserWithEmailAndPassword();

    signwithEandP(email,password).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
    //書き加えた
    
    
    /*state = {
        email: "",
        password: "",
    };*/

    /*static propTypes = {
        auth: PropTypes.object.isRequired // Auth service
    };

    loginGoogle = () => {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleAuthProvider);
    }*/

    render() {
        const { classes, auth } = this.props;

        return (
            <FirebaseAuthProvider {...config} firebase={firebase}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  {/* EmailとPasswordの入力フォーム */}
                  <form className={classes.form}>
                    <Typography>
                      <label>Email:</label>
                      <input
                        type="email"
                        onChange={(e) => (this.email = e.target.value)}
                      />
                      {<br />}
                        <label>Password:</label>
                        <input
                          type="password"
                          onChange={(e) => (this.password = e.target.value)}
                        />
                      <br />
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleSignIn}
                    >
                      Sign in
                    </Button>
                  </form>
                </div>
                <Box mt={8}></Box>
              </Container>
              <FirebaseAuthConsumer>
                {({ isSignedIn }) => {
                  console.log(`Firebase login: isSignedIn: ${isSignedIn}`);
                  if (isSignedIn) {
                    firebase.auth().currentUser.getIdToken().then(function (token) {
                      auth.setToken(`Bearer ${token}`);
                    });
                  }
                }}
              </FirebaseAuthConsumer>
            </FirebaseAuthProvider>

        /*return (
            <FirebaseAuthProvider {...config} firebase={firebase}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">Sign in</Typography>
                        <Box mt={8}>
                            <Button variant="contained" color="primary" onClick={this.loginGoogle} >Sign in with Google</Button>
                        </Box>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
                <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => {
                        console.log(`Firebase login: isSignedId: ${isSignedIn}`)
                        if (isSignedIn) {
                            firebase.auth().currentUser.getIdToken().then(function (token) {
                                auth.setToken(`Bearer ${token}`);
                            });
                        }
                    }}
                </FirebaseAuthConsumer>
            </FirebaseAuthProvider>*/

        );
    }
}

SignIn.propTypes = {
    auth: PropTypes.object.isRequired, // Auth service
  };

export default withStyles(useStyles)(SignIn);
