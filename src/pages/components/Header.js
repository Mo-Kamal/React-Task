import React from "react";
import { useSelector } from "react-redux";
import "../../css/components/Header.scss";
export default function Header(props) {
  const user = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);

  return (
    <div className="header-component">
      <div className="header-container">
        <div className="user-data"> {user.username}</div>
        <div className="posts-count">Post Count : {props.dataCount}</div>
      </div>
    </div>
  );
}
