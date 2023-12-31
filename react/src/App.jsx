import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { BlogPostForm } from "./components/BlogPost/BlogPostForm";
import { BlogPostList } from "./components/BlogPost/BlogsPage/BlogPostList";
import { Home } from "./components/Home/Home";
import { SignIn } from "./components/UserAuth/SignIn";
import { HorizontalNavbar } from "./components/Navbar/HorizontalNavbar";
import { UserProfile } from "./components/UserAuth/UserProfile";
import { PrivateRoute } from "./components/UserAuth/PrivateRoute";
import { UserPostList } from "./components/BlogPost/UserBlogsPage/UserPostList";
import { SearchedPost } from "./components/BlogPost/SearchedPost/SearchedPost";

function App() {
  return (
    <Router>
      <HorizontalNavbar />
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogPostList />} />
        <Route path="/searched-blogs/:id" element={<SearchedPost />} />
        <Route path="" element={<PrivateRoute />}>
          {/* {privateRoute} */}
          <Route path="/add-blog" element={<BlogPostForm />} />
          <Route path="/profile" element={<UserProfile />}></Route>
          <Route path="/userblogs" element={<UserPostList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
