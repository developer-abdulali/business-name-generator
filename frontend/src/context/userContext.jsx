import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Update totalPollsVotes count locally
  const onUserVoted = () => {
    const totalPollsVotes = user.totalPollsVotes || 0;
    updateUserStats("totalPollsVotes", totalPollsVotes + 1);
  };

  // Function to clear user data
  const clearUser = () => {
    setUser(null);
  };

  const updateUserStats = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Update totalPollsCreated count locally
  const onPollCreateOrDelete = (type = "created") => {
    if (user) {
      const totalPollsCreated = user.totalPollsCreated || 0;
      updateUserStats(
        "totalPollsCreated",
        type === "created" ? totalPollsCreated + 1 : totalPollsCreated - 1
      );
    }
  };

  // Add or Remove poll id from bookmark poll
  const toggleBookmarkId = (id) => {
    const bookmarks = user.bookmarkedPolls || [];

    // Convert all to string for comparison
    const index = bookmarks.findIndex(
      (bookmarkId) => bookmarkId.toString() === id.toString()
    );

    if (index === -1) {
      // Add the ID if it's not in the array
      setUser((prev) => ({
        ...prev,
        bookmarkedPolls: [...bookmarks, id],
        totalPollsBookmarked: (prev.totalPollsBookmarked || 0) + 1,
      }));
    } else {
      // Remove the ID if it's already in the array
      setUser((prev) => ({
        ...prev,
        bookmarkedPolls: bookmarks.filter(
          (item) => item.toString() !== id.toString()
        ),
        totalPollsBookmarked: Math.max((prev.totalPollsBookmarked || 0) - 1, 0),
      }));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onPollCreateOrDelete,
        onUserVoted,
        toggleBookmarkId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
