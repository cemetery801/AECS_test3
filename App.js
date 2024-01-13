import React, { useState, useEffect } from "react";
import { TokenProviderService } from "./service/auth_service";
import EmulatorScreen from "./components/emulator_screen";
import LoginPage from "./components/login_firebase";
import { ThemeProvider,  makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';

import "./App.css";

const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

var EMULATOR_GRPC =
  window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  // For some reason, process.env.NODE_ENV either doesn't exist or is equal to "development", causing EMULATOR_GRPC to equal/point to "localhost:" verus "localhost:8080" which is where Envoy is listening for gRPC-Web requests. Hard-coding the appendation of ":8080" as we've done here restores some functionality, as now both the WebRTC and PNG views return a status of "connecting" and the JavaScript console no longer logs any 'JWT is missing' errors. However, the WebRTC and PNG views never return a status of "connected" so video and audio of the emulator cannot be seen/heard.
  "8080";
  // window.location.port;
if (development) {
  EMULATOR_GRPC = window.location.protocol + "//" +
  window.location.hostname + ":8080";
}


console.log(`Connecting to grpc at ${EMULATOR_GRPC}`);

const useStyles = makeStyles((theme) => ({
  root: {
    // some CSS that accesses the theme
  }
}));

const theme = createTheme({

});

const auth = new TokenProviderService();

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [emulatorGrpcConfigured, setEmulatorGrpcConfigured] = useState(false);

  useEffect(() => {
    const handleAuthorization = (a) => {
      setAuthorized(a);
    };


    if (EMULATOR_GRPC) {
      // Set the flag to true indicating that EMULATOR_GRPC is configured
      setEmulatorGrpcConfigured(true);

      // Register the callback only if EMULATOR_GRPC is configured
      auth.on("authorized", handleAuthorization);
    }
    //auth.on("authorized", handleAuthorization);

    // WebRTC initialization code//
    //const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    //const peerConnection = new RTCPeerConnection(configuration);

    // Generate and handle ICE candidate
    /*peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send the ICE candidate to the server
        sendIceCandidateToServer(event.candidate);
      }
    };*/

    // Start WebRTC communication
    //initiateWebRTCCommunication();
  }, [/*auth, EMULATOR_GRPC, setEmulatorGrpcConfigured*/]);

  /*const sendIceCandidateToServer = (iceCandidate) => {
    // Send the ICE candidate to the server using a suitable mechanism (e.g., WebSocket or HTTP request)
    // Example:
    fetch('/android.emulation.control.EmulatorController', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ iceCandidate }),
    });
  };*/

  /*const initiateWebRTCCommunication = () => {
    // Start WebRTC communication logic
    // ...
  };*/


  return (
    <ThemeProvider theme={theme}>
      {authorized ? (
        <EmulatorScreen uri={EMULATOR_GRPC} auth={auth} />
      ) : (
        <LoginPage auth={auth} />
      )}
    </ThemeProvider>
  );
}
