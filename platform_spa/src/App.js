import React, { Component } from "react";
import logo from "./logo.svg";
import { BSButton } from "@bigsofa/ui";
import { ApolloProvider } from "react-apollo";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <BSButton>Gotta get that</BSButton>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
