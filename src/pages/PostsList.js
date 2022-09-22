import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/PostsList.scss";
import EditModal from "./components/EditModal";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";
import { fetchPosts } from "../actions";

let PageSize = 16;
const PostsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modalDisplay, setModalDisplay] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  // check if user is signed in
  useEffect(() => {
    if (!user.isSignedIn) {
      history("/login");
    }
    dispatch(fetchPosts());
  }, []);
  const posts = useSelector((state) => state.posts);

  const editPostId = useRef(0);

  // filter data based upon search field
  let searchItems;
  searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = posts.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(posts);
    }
  };
  useEffect(() => {
    searchItems(searchInput);
  }, [modalDisplay]);

  // display posts/filtered data
  let displayData = [];
  const displayPosts = useMemo(() => {
    searchInput != "" ? (displayData = filteredResults) : (displayData = posts);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return displayData.slice(firstPageIndex, lastPageIndex)?.map((post) => {
      return (
        <div
          className="post-card"
          key={post.id}
          onClick={() => {
            setModalDisplay(true);
            editPostId.current = post.id;
          }}
        >
          {" "}
          <Card
            sx={{ maxWidth: 500, height: 200, backgroundColor: "ghostwhite" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paddingTop={1}>
                {post.body}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    });
  }, [currentPage, posts, filteredResults, modalDisplay]);

  return (
    <div className="posts-page">
      <Header dataCount={displayData.length} />

      <div className="posts-input-container">
        <h2 className="posts-input-title">Search bar:</h2>
        <div className="posts-input">
          <Input
            icon="search"
            placeholder="Search..."
            onChange={(e) => {
              searchItems(e.target.value);
            }}
          />
        </div>
      </div>
      {modalDisplay ? (
        <EditModal
          modalDisplay={modalDisplay}
          setModalDisplay={setModalDisplay}
          editPostId={editPostId.current}
        />
      ) : (
        <div></div>
      )}
      <div className="posts-container">{displayPosts}</div>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={displayData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PostsList;
