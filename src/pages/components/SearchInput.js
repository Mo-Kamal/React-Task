// import React from "react";
// import { Input } from "@mui/material";
// export default function SearchInput() {
//   const searchItems = (searchValue) => {
//     setSearchInput(searchValue);
//     console.log(searchValue);
//     if (searchInput !== "") {
//       const filteredData = posts.filter((item) => {
//         return Object.values(item)
//           .join("")
//           .toLowerCase()
//           .includes(searchInput.toLowerCase());
//       });
//       console.log(filteredData);
//       setFilteredResults(filteredData);
//     } else {
//       setFilteredResults(posts);
//     }
//   };
//   return (
//     <div>
//       {" "}
//       <Input
//         icon="search"
//         placeholder="Search..."
//         onChange={(e) => {
//           searchItems(e.target.value);
//         }}
//       />
//     </div>
//   );
// }
