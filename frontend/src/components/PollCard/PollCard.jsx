import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { getPollBookmarked } from "../../utils/helper";
import UserProfileInfo from "../cards/UserProfileInfo";
import PollActions from "./PollActions";
import PollContent from "./PollContent";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import PollingResultContent from "./PollingResultContent";

const PollCard = ({
  pollId,
  question,
  type,
  options,
  voters,
  response,
  creatorImageProfile,
  creatorName,
  creatorUsername,
  userHasVoted,
  isPollClosed,
  isMyPoll,
  createdAt,
}) => {
  const { user, onUserVoted, toggleBookmarkId } = useContext(UserContext);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [userResponse, setUserResponse] = useState("");

  const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted);

  const [pollResult, setPollResult] = useState({ options, voters, response });

  const isPollBookmarked = getPollBookmarked(
    pollId,
    user.bookmarkedPolls || []
  );

  const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
  const [pollClosed, setPollClosed] = useState(isPollClosed || false);
  const [pollDeleted, setPollDeleted] = useState(false);

  // Handle user input based on the poll type
  const handleInput = (value) => {
    if (type === "rating") setRating(value);
    else if (type === "open-ended") setUserResponse(value);
    else setSelectedOptionIndex(value);
  };

  // Generates post data based on the poll type
  const getPostData = useCallback(() => {
    if (type === "open-ended") {
      return { responseText: userResponse, voterId: user._id };
    }
    if (type === "rating") {
      return { rating: rating, voterId: user._id }; // Send rating instead of optionIndex
    }
    return { optionIndex: selectedOptionIndex, voterId: user._id };
  }, [type, userResponse, rating, selectedOptionIndex, user._id]);

  const getPollDetail = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.POLLS.GET_BY_ID(pollId));

      if (res.data) {
        const pollDetails = res.data;
        setPollResult({
          options: pollDetails.options || [],
          voters: pollDetails.voters.length || 0,
          response: pollDetails.response || [],
        });
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Error submitting vote");
    }
  };

  // Handles the submisstion of votes
  const handleVoteSubmit = async () => {
    try {
      // Add validation for rating polls
      if (type === "rating" && rating === 0) {
        toast.error("Please select a rating");
        return;
      }
      if (
        type !== "rating" &&
        type !== "open-ended" &&
        selectedOptionIndex === -1
      ) {
        toast.error("Please select an option");
        return;
      }
      if (type === "open-ended" && !userResponse.trim()) {
        toast.error("Please enter your response");
        return;
      }

      const res = await axiosInstance.post(
        API_PATHS.POLLS.VOTE(pollId),
        getPostData()
      );

      getPollDetail();
      setIsVoteComplete(true);
      onUserVoted();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Vote error:", error);
      toast.error(error.response?.data?.message || "Error submitting vote.");
    }
  };

  const toggleBookmark = async () => {
    try {
      const res = await axiosInstance.post(API_PATHS.POLLS.BOOKMARK(pollId));

      toggleBookmarkId(pollId);
      setPollBookmarked((prev) => !prev);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.response?.data?.message || "Error bookmarking poll.");
      toast.error(error.response?.data?.message || "Error bookmarking poll.");
    }
  };

  // Close poll function
  const closePoll = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.POLLS.CLOSE(pollId));
      if (res.data) {
        setPollClosed(true);
        toast.success(res.data.message || "Poll Closed Successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong, Please try again.");
      console.log("Something went wrong. Please try again.", error);
    }
  };

  return (
    !pollDeleted && (
      <div className="bg-slate-100/50 my-5 p-5 rounded-lg border border-slate-100 mx-auto">
        <div className="flex items-start justify-between">
          <UserProfileInfo
            imgUrl={creatorImageProfile}
            fullname={creatorName}
            username={creatorUsername}
            createdAt={createdAt}
          />

          <PollActions
            pollId={pollId}
            isVoteComplete={isVoteComplete}
            inputCaptured={
              !!(userResponse || selectedOptionIndex >= 0 || rating)
            }
            onVoteSubmit={handleVoteSubmit}
            isBookmarked={pollBookmarked}
            toggleBookmark={toggleBookmark}
            isMyPoll={isMyPoll}
            pollClosed={pollClosed}
            onClosePoll={closePoll}
            onDeletePoll={() => {}}
          />
        </div>

        <div className="ml-14 mt-3">
          <p className="text-[15px] text-black leading-8">{question}</p>
          <div className="mt-4">
            {isVoteComplete || isPollClosed ? (
              <PollingResultContent
                type={type}
                options={pollResult.options || []}
                voters={pollResult.voters}
                response={pollResult.response || []}
              />
            ) : (
              <PollContent
                type={type}
                options={options}
                selectedOptionIndex={selectedOptionIndex}
                onOptionSelect={handleInput}
                rating={rating}
                onRatingChange={handleInput}
                userResponse={userResponse}
                onResponseChange={handleInput}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default PollCard;
