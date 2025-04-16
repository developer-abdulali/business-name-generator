// import React from "react";
// import { Navigate, Route, Router, Routes } from "react-router-dom";
// import LoginForm from "./pages/Auth/LoginForm";
// import SignUpForm from "./pages/Auth/SignUpForm";
// import Home from "./pages/Dashboard/Home";
// import CreatePoll from "./pages/Dashboard/CreatePoll";
// import MyPolls from "./pages/Dashboard/MyPolls";
// import Bookmarks from "./pages/Dashboard/Bookmarks";
// import VotedPolls from "./pages/Dashboard/VotedPolls";

// const App = () => {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route pathname="/" element={<Root />} />
//           <Route pathname="/login" element={<LoginForm />} />
//           <Route pathname="/signup" element={<SignUpForm />} />
//           <Route pathname="/dashboard" element={<Home />} />
//           <Route pathname="/create-poll" element={<CreatePoll />} />
//           <Route pathname="/my-polls" element={<MyPolls />} />
//           <Route pathname="/voted-polls" element={<VotedPolls />} />
//           <Route pathname="/bookmarked-polls" element={<Bookmarks />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;

// const Root = () => {
//   // Check if token exists in localStorage
//   const isAuthenticated = !localStorage.getItem("token");

//   // Redirect to dashbord if authenticated
//   return isAuthenticated ? (
//     <Navigate to="/dashboard" />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/Auth/LoginForm";
import SignUpForm from "./pages/Auth/SignUpForm";
import Home from "./pages/Dashboard/Home";
import CreatePoll from "./pages/Dashboard/CreatePoll";
import MyPolls from "./pages/Dashboard/MyPolls";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import VotedPolls from "./pages/Dashboard/VotedPolls";
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        <Route path="/my-polls" element={<MyPolls />} />
        <Route path="/voted-polls" element={<VotedPolls />} />
        <Route path="/bookmarked-polls" element={<Bookmarks />} />
      </Routes>
    </UserProvider>
  );
};

const Root = () => {
  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
