import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    "
    >
      <div onClick={() => navigate("/")} className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        <span>Spotify</span>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <div className="flex items-center gap-1">
            <Link
              to={"/admin"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <LayoutDashboardIcon className="size-4" />
              <span className="hidden sm:flex">Admin Dashboard</span>
            </Link>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "md:hidden flex items-center gap-2"
              )}
            >
              <MessageCircle className="size-4" />
              <span className="hidden sm:flex">Messages</span>
            </Link>
          </div>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
