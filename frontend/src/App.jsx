import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Layout from "./layout/Layout";
import BrowseJobs from "./components/BrowseJobs";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";

const appRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/job/:id", element: <JobDescription /> },
      { path: "/browse", element: <BrowseJobs /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
