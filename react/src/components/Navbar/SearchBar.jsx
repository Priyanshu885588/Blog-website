import React from "react";
import { searchPosts } from "../services/Api";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const [searchResults, setSearchResults] = useState();
  const [searchBox, setSearchBox] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (event) => {
    setSearchBox(true);
    setisLoading(true);
    setSearchResults(null);
    try {
      if (event.target.value) {
        const results = await searchPosts(event.target.value);
        setSearchResults(results);
      } else {
        setSearchBox(false);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="w-full relative flex flex-col h-full justify-center">
      <div className="w-full flex gap-2 items-center md:h-2/3 h-5/6 p-2 rounded-full border bg-transparent dark:border-gray-50 border-gray-800">
        <svg
          className="w-4 h-4 text-gray-900 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          type="search"
          id="default-search"
          className="w-full text-base text-gray-900 bg-transparent focus:outline-none dark:text-gray-100"
          placeholder="Search..."
          onChange={handleSearch}
        />
      </div>
      {searchBox && (
        <div className="w-full overflow-auto max-h-72 absolute flex flex-col justify-start items-center gap-2 bg-white dark:bg-gray-300 rounded-b-xl top-10 md:top-16 text-sm text-black p-3">
          {searchResults && searchResults.results.length > 0 ? (
            searchResults.results.map((post) => (
              <Link
                to={`/searched-blogs/${post._id}`}
                key={post._id}
                className="border w-full p-2 flex flex-col gap-1 border-gray-400 cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-100 rounded-xl transition-all duration-200"
                onClick={() => setSearchBox((prev) => !prev)}
              >
                <h6 className="playfair">{post.title}</h6>
                <p className="pl-1 border-l w-fit text-xs border-black capitalize nunito">
                  {post.tags}
                </p>
              </Link>
            ))
          ) : isLoading ? (
            <div aria-label="Loading..." role="status">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin w-6 h-6 stroke-slate-500"
              >
                <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
              </svg>
            </div>
          ) : isError ? (
            <div className="text-red-500 text-lg open-sans capitalize">
              Error fetching data ...
            </div>
          ) : (
            <div className="text-base merriweather">No data found</div>
          )}
        </div>
      )}
    </div>
  );
};
