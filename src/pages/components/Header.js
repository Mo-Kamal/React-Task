import React from "react";
import { useSelector } from "react-redux";
export default function Header() {
  const user = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);

  return (
    <div className="header-component">
      <div className="header-container">
        <div>
          {user.userId}
          {user.username}
          {posts?.length}
        </div>
      </div>
    </div>
  );
}
