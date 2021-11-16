/* global google */
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [token, setToken] = useState("");

  const userSignedIn = (response) => {
    console.log(response);
    fetch("http://192.168.1.37:9990/oauth/social-login", {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ idToken: response["credential"] })
    })
      .then(res => res.json())
      .then(t => {
        console.log(t);
        setSignedIn(true)
        setToken(t.data.accessToken);
      })
  }
  useEffect(() => {
    console.log("Runing use effect");
    google.accounts.id.initialize({
      client_id: "128562256000-57eho2kph8j21ckj4f6prd518dtoa3q2.apps.googleusercontent.com",
      callback: userSignedIn
    });
    google.accounts.id.prompt(notification => {
      console.log("No prompt notification", notification);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isSignedIn ? <div style={{ wordWrap: 'break-word', width: "90%" }}>You are signedIn  and your token: <br /> {token}</div> : <p>You are not signedIn</p>}
      </header>
    </div>
  );
}

export default App;
