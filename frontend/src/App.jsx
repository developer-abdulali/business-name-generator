import React from "react";
import { Toaster } from "react-hot-toast";
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
      <Toaster />
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
