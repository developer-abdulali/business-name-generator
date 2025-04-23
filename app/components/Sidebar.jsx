import Image from "next/image";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "../context/AppContext";
import ChatLabel from "./ChatLabel";
import { useState } from "react";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [openMenu, setOpenMenu] = useState({ id: 0, open: false });

  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${
        expand ? "p-4 w-64" : "md:w-20 w-0 max-md:overflow-hidden"
      }`}
    >
      <div>
        <div
          className={`flex ${
            expand ? "flex-row gap-10" : "flex-col items-center gap-8"
          }`}
        >
          <Image
            src={expand ? assets.logo_text : assets.logo_icon}
            alt="icon"
            className={expand ? "w-36" : "w-10"}
          />

          <div
            onClick={() => (expand ? setExpand(false) : setExpand(true))}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Image
              src={assets.menu_icon}
              alt="menu icon"
              className="md:hidden"
            />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="sidebar icon"
              className="hidden md:block w-7"
            />
            <div
              className={`absolute w-max ${
                expand ? "left-1/2 -translate-x-1/2 top-12" : "-top-12 left-0"
              } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? "Close Sidebar" : "Open Sidebar"}
              <div
                className={`h-3 w-3 absolute bg-black rotate-45 ${
                  expand
                    ? "left-1/2 -top-1.5 -translate-x-1/2"
                    : "left-4 -bottom-1.5"
                }`}
              ></div>
            </div>
          </div>
        </div>

        <button
          className={`mt-8 flex items-center justify-center cursor-pointer ${
            expand
              ? "bg-blue-400 hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max"
              : "group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <Image
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt="chat icon"
            className={expand ? "w-6" : "w-7"}
          />
          <div
            className={`absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
          >
            New Chat
            <div
              className={`w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5`}
            ></div>
          </div>
          {expand && <p className="text-white font-medium">New Chat</p>}
        </button>

        <div
          className={`mt-8 text-white/25 text-sm ${
            expand ? "block" : "hidden"
          }`}
        >
          <p className="my-1">Recent</p>

          <ChatLabel openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Get App Section */}
        <div className="mb-4">
          <div
            className={`flex items-center cursor-pointer group relative ${
              expand
                ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10"
                : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg"
            }`}
          >
            <Image
              src={expand ? assets.phone_icon : assets.phone_icon_dull}
              alt="phone icon"
              className={expand ? "w-5" : "w-6.5 mx-auto"}
            />
            {expand && (
              <div className="flex items-center gap-1">
                <span>Get App</span>
                <Image
                  src={assets.new_icon}
                  alt="new icon"
                  width={14}
                  height={14}
                />
              </div>
            )}

            <div
              className={`absolute w-max ${
                expand ? "-top-60 left-0" : "-top-60 -right-40"
              } opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none`}
            >
              <div className="relative bg-black text-white text-sm p-3 rounded-lg shadow-lg">
                <Image
                  src={assets.qrcode}
                  alt="qrcode"
                  className="w-44"
                  width={176}
                  height={176}
                />
                <p className="text-center mt-2">Scan to get DeepSeek App</p>
                <div
                  className={`absolute w-3 h-3 bg-black rotate-45 ${
                    expand ? "left-4" : "right-4"
                  } -bottom-1.5`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div
          onClick={user ? null : openSignIn}
          className={`flex items-center ${
            expand ? "p-2 hover:bg-white/10 rounded-lg" : "justify-center py-2"
          } cursor-pointer group relative`}
        >
          <div className="relative">
            {user ? (
              <UserButton />
            ) : (
              <Image
                src={assets.profile_icon}
                alt="profile"
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
          </div>

          {expand && (
            <div className="ml-3 overflow-hidden flex-1">
              <p className="text-white font-medium truncate">
                {user?.fullName || "Unknown User"}
              </p>
              <p className="text-xs text-white/50 truncate">
                {user?.primaryEmailAddress?.emailAddress || "No Email"}
              </p>
            </div>
          )}

          {!expand && user && (
            <div className="absolute left-full ml-2 w-max px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition pointer-events-none">
              <p>{user?.fullName || "Unknown User"}</p>
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
