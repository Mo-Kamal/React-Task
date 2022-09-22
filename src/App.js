import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import PostsList from "./pages/PostsList";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<PostsList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
