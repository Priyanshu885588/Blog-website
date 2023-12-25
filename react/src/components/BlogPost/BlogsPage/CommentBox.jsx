import React from "react";

export const CommentBox = ({ handleCommentBox }) => {
  return (
    <>
      <div className="z-51 h-screen w-screen bg-transparent absolute top-0 left-0 backdrop-blur-md"></div>
      <div className="fixed bottom-2 md:w-1/3 z-51 right-2 w-9/12 overflow-auto h-screen-90 rounded-lg border border-gray-400 flex flex-col justify-center gap-2 items-center bg-gray-100 dark:bg-gray-700">
        <div className="text-gray-500 flex w-full p-2 gap-2 items-center">
          <button
            className="uppercase text-black dark:text-white"
            onClick={handleCommentBox}
          >
            ✕
          </button>
          <p className="dark:text-gray-300 text-black flex-grow text-center">
            Comment Section
          </p>
        </div>

        <div className="w-full overflow-auto h-11/12">
          <article class="p-6 text-base bg-gray-100 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-700">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Helene Engels"
                  />
                  Helene Engels
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <time dateTime="2022-06-23" title="June 23rd, 2022">
                    Jun. 23, 2022
                  </time>
                </p>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">
              Thanks for sharing this. I do came from the Backend development
              and explored some of the tools to design my Side Projects.
            </p>
          </article>
          <article class="p-6 text-base bg-gray-100 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-700">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Helene Engels"
                  />
                  Helene Engels
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <time pubdate datetime="2022-06-23" title="June 23rd, 2022">
                    Jun. 23, 2022
                  </time>
                </p>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">
              Thanks for sharing this. I do came from the Backend development
              and explored some of the tools to design my Side Projects.
            </p>
          </article>
          <article class="p-6 text-base bg-gray-100 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-700">
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                    alt="Helene Engels"
                  />
                  Helene Engels
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <time pubdate datetime="2022-06-23" title="June 23rd, 2022">
                    Jun. 23, 2022
                  </time>
                </p>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">
              Thanks for sharing this. I do came from the Backend development
              and explored some of the tools to design my Side Projects.
            </p>
          </article>
        </div>
        <form
          action=""
          className="w-full flex gap-1 justify-center items-center"
        >
          <label htmlFor="comment" className="w-full m-2">
            <input
              type="text"
              id="first_name"
              class="bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your comment"
            />
          </label>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};
