"use client";

import { createContext, useContext, useState, useEffect } from "react";

const QueryContext = createContext();

export const BusinessNameContext = ({ children }) => {
  const [query, setQuery] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const sessionQuery = sessionStorage.getItem("query");
    if (sessionQuery) {
      setQuery(JSON.parse(sessionQuery));
    } else {
      setQuery({});
    }
  }, []);

  const updateQuery = (newQuery) => {
    setQuery((prev) => {
      const updated = { ...prev, ...newQuery };
      sessionStorage.setItem("query", JSON.stringify(updated));
      return updated;
    });
  };

  if (query === null) return null;

  return (
    <QueryContext.Provider
      value={{ query, updateQuery, sidebarOpen, setSidebarOpen }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export const useQueryContext = () => useContext(QueryContext);
