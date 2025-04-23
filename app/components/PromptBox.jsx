import { assets } from "../assets/assets";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const PromptBox = ({ isLoading, setIsLoading }) => {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        128
      )}px`;
    }
  }, [prompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    // Handle form submission here
    console.log("Submitting:", prompt);
    setIsLoading(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${
        false ? "max-w-3xl" : "max-w-2xl"
      } bg-[#404045] p-4 rounded-3xl mt-4 transition-all border border-transparent hover:border-gray-500/50 focus-within:border-primary/50`}
    >
      <div className="flex items-start gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={prompt}
          placeholder="Message DeepSeek..."
          required
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 outline-none w-full resize-none overflow-y-auto max-h-32 bg-transparent text-white placeholder-gray-400/80 text-sm leading-5 scrollbar-hide"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </div>

      <div className="mt-8 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-gray-300 border border-gray-300/40 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-500/20 transition active:scale-95"
          >
            <Image
              src={assets.deepthink_icon}
              alt="DeepThink"
              width={16}
              height={16}
              className="opacity-80"
            />
            <span>DeepThink (R1)</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-gray-300 border border-gray-300/40 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-500/20 transition active:scale-95"
          >
            <Image
              src={assets.search_icon}
              alt="Search"
              width={16}
              height={16}
              className="opacity-80"
            />
            <span>Search</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-gray-500/20 transition active:scale-95"
            title="Pin conversation"
          >
            <Image
              src={assets.pin_icon}
              alt="Pin"
              width={16}
              height={16}
              className="opacity-70 hover:opacity-100 transition"
            />
          </button>
          <button
            type="submit"
            disabled={!prompt || isLoading}
            className={`rounded-full p-2 cursor-pointer transition-all ${
              prompt
                ? "bg-blue-400 hover:bg-primary/90 active:scale-95"
                : "bg-[#71717a] cursor-not-allowed opacity-70"
            }`}
            title="Send message"
          >
            <Image
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt="Send"
              width={16}
              height={16}
              className={`transition-opacity ${
                isLoading ? "animate-pulse" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptBox;
