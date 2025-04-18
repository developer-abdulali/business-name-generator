import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const PollActions = ({
  pollId,
  isVoteComplete,
  inputCaptured,
  onVoteSubmit,
  isBookmarked,
  toggleBookmark,
  isMyPoll,
  pollClosed,
  onClosePoll,
  onDeletePoll,
}) => {
  const [loading, setLoading] = useState(false);

  const handleVoteClick = async () => {
    setLoading(true);
    try {
      await onVoteSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {(isVoteComplete || pollClosed) && (
        <div className="text-[11px] font-medium text-slate-600 bg-sky-700/10 px-3 py-1 rounded-md">
          {pollClosed ? "Closed" : "Voted"}
        </div>
      )}

      <button onClick={toggleBookmark} className="icon-btn">
        {isBookmarked ? (
          <FaBookmark className="text-primary" />
        ) : (
          <FaRegBookmark />
        )}
      </button>

      {inputCaptured && !isVoteComplete && (
        <button
          onClick={handleVoteClick}
          disabled={loading}
          className="btn-small ml-auto"
        >
          {loading ? "Submitting" : "Submit"}
        </button>
      )}
    </div>
  );
};

export default PollActions;
