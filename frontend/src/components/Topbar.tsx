import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInAuthBtn from "./SignInAuthBtn";

const Topbar = () => {
  const isAdmin = false;

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center text-white font-semibold text-lg">
        Spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className="flex items-center text-white hover:underline"
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedIn>
          <SignOutButton>
            <button className="text-white px-3 py-1 rounded-md hover:bg-zinc-800 transition">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInAuthBtn />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
