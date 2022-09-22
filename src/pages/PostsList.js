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
import SearchInput from "./components/SearchInput";
import { Input } from "@mui/material";
let PageSize = 16;
const PostsList = () => {
  const history = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    // console.log(!user.isSignedIn);
    // if (!user.isSignedIn) {
    //   history("/login");
    // }
    // dispatch(fetchPosts());
  }, []);
  const [modalDisplay, setModalDisplay] = useState(false);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth);
  // console.log(posts);
  const editPostId = useRef(0);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      console.log(searchValue);
      const filteredData = posts.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      console.log(filteredData);
      setFilteredResults(filteredData);
    } else {
      console.log("123");
      setFilteredResults(posts);
    }
  };
  let displayData;
  const displayPosts = useMemo(() => {
    searchInput != "" ? (displayData = filteredResults) : (displayData = posts);
    console.log(searchInput);
    console.log(filteredResults);
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
          <Card sx={{ maxWidth: 500, height: 270 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    });
  }, [currentPage, posts, filteredResults]);

  // const displayPosts = posts?.map((post) => {
  //   return (
  //     <div
  //       className="post-card"
  //       key={post.id}
  //       onClick={() => {
  //         setModalDisplay(true);
  //         editPostId.current = post.id;
  //       }}
  //     >
  //       <h2>{post.title}</h2>
  //       <h3>{post.body}</h3>
  //     </div>
  //   );
  // });

  return (
    <div className="posts-page">
      <Header />
      {/* <SearchInput /> */}
      <div>
        <Input
          icon="search"
          placeholder="Search..."
          onChange={(e) => {
            searchItems(e.target.value);
          }}
        />
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
// console.log(contents);

export default PostsList;
