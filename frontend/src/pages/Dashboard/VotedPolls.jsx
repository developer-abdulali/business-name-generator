import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../components/PollCard/PollCard";

import InfiniteScroll from "react-infinite-scroll-component";
import EmptyCard from "../../components/PollCard/EmptyCard";
import CREATE_ICON from "../../assets/images/my-poll-icon.png";

const PAGE_SIZE = 3;

const VotedPolls = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [votedPolls, setVotedPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async (overridePage = page) => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.POLLS.VOTED_POLLS}?page=${overridePage}&limit=${PAGE_SIZE}`
      );
      console.log("VOTED_POLLS", res.data);

      if (res.data?.polls?.length > 0) {
        setVotedPolls((prevPolls) =>
          overridePage === 1
            ? res.data.polls
            : [...prevPolls, ...res.data.polls]
        );
        setHasMore(res.data.polls.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePolls = () => setPage((prevPage) => prevPage + 1);

  useEffect(() => {
    setVotedPolls([]); // Clear the state when the component mounts
    fetchAllPolls(1);
  }, []);

  useEffect(() => {
    if (page !== 1) {
      fetchAllPolls();
    }
  }, [page]);

  return (
    <DashboardLayout activeMenu="Voted Polls">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Voted Polls</h2>

        {votedPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={CREATE_ICON}
            message="You have not voted any polls yet! Start exploring and share your opinion by voting on polls now."
            btnText="Explore"
            onClick={() => navigate("/dashboard")}
          />
        )}

        <InfiniteScroll
          dataLength={votedPolls.length}
          next={loadMorePolls}
          hasMore={hasMore}
          loader={<h4 className="info-text">Loading...</h4>}
          endMessage={<p className="info-text">No more poll to display.</p>}
        >
          {votedPolls?.map((poll) => (
            <PollCard
              key={poll._id} // Use a unique key
              pollId={poll._id}
              question={poll.question}
              type={poll.type}
              options={poll.options}
              voters={poll.voters.length || 0}
              response={poll.response || []}
              creatorImageProfile={poll.creator.profileImageUrl || null}
              creatorName={poll.creator.fullName}
              creatorUsername={poll.creator.username}
              userHasVoted={poll.userHasVoted || false}
              isPollClosed={poll.closed || false}
              createdAt={poll.createdAt || false}
              isMyPoll
            />
          ))}
        </InfiniteScroll>
      </div>
    </DashboardLayout>
  );
};

export default VotedPolls;
