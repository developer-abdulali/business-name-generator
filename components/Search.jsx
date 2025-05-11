"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import QueryDialog from "./QueryDialog";
import { useQueryContext } from "@/context/BusinessNameContext";

const Search = () => {
  const { query, updateQuery } = useQueryContext();
  const [keyword, setKeyword] = useState("");
  const [queryDialog, setQueryDialog] = useState(false);

  const handleKeyword = (e) => setKeyword(e.target.value);

  const showQueryDialog = () => {
    if (!keyword.trim()) {
      return toast("Keyword is required!");
    }
    updateQuery({ keyword });
    setQueryDialog(true);
  };

  return (
    <div className="flex justify-center w-full pt-5">
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-4">
        <Input
          placeholder="Enter keyword..."
          value={keyword}
          onChange={handleKeyword}
          className="h-14 text-white border-primary text-md w-full"
        />
        <Button
          onClick={showQueryDialog}
          className="h-14 text-lg px-5 w-full sm:w-auto"
        >
          Generate
        </Button>
      </div>

      <QueryDialog
        queryDialog={queryDialog}
        setQueryDialog={setQueryDialog}
        keyword={keyword}
      />
    </div>
  );
};

export default Search;
