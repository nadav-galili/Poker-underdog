import React from "react";
import "../src/css/main.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Signup from "./components/signup";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>
      <main style={{ minHeight: 900 }}>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={Home} />
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}

export default App;
