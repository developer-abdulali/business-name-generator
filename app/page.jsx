"use client";
import Image from "next/image";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PromptBox from "./components/PromptBox";
import { assets } from "./assets/assets";
import Message from "./components/Message";

const Home = () => {
  const [expend, setExpend] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        {/* sidebar */}
        <Sidebar expand={expend} setExpand={setExpend} />

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute top-6 px-4 flex items-center justify-between w-full">
            <Image
              onClick={() => (expend ? setExpend(false) : setExpend(true))}
              src={assets.menu_icon}
              alt=""
              className="rotate-180"
            />
            <Image src={assets.chat_icon} alt="" className="opacity-70" />
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="logo" className="h-16" />
                <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ) : (
            <div>
              <Message role="user" content="What is next js?" />
            </div>
          )}

          {/* prompt box */}
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />

          <p className="text-xs absolute bottom-1 text-gray-500">
            AI-generated, for reference only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
