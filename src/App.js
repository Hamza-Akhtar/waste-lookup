import React, { Component } from "react";
import Banner from "./components/Banner";
import Search from "./components/Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Banner />
          <Search />
        </header>
      </div>
    );
  }
}

export default App;
