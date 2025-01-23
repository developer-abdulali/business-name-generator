import Footer from "@/components/Footer";
import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

// Layout Component
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
