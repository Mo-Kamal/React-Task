import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { fetchPosts } from "./actions";
import "./App.css";
import Login from "./pages/Login";
import PostsList from "./pages/PostsList";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
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
