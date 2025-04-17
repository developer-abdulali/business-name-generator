import Poll from "../models/pollSchema.js";

export const createPoll = async (req, res) => {
  const { question, type, options, creatorId } = req.body;

  // Validate required fields
  if (!question || !type || !creatorId) {
    return res.status(400).json({
      message: "Question, type, and creatorId are required!",
    });
  }

  try {
    let processedOptions = [];

    // Process options based on poll type
    switch (type) {
      case "single-choice":
        if (!options || options.length < 2) {
          return res.status(400).json({
            message: "Single-choice poll must have at least two options",
          });
        }
        processedOptions = options.map((option) => ({ optionText: option }));
        break;

      case "rating":
        processedOptions = [1, 2, 3, 4, 5].map((value) => ({
          optionText: value.toString(),
        }));
        break;

      case "yes/no":
        processedOptions = ["Yes", "No"].map((option) => ({
          optionText: option,
        }));
        break;

      case "image-based":
        if (!options || options.length < 2) {
          return res.status(400).json({
            message: "Image-based poll must hav at least two iamge URLs.",
          });
        }
        processedOptions = options.map((url) => ({ optionText: url }));
        break;

      case "open-ended":
        processedOptions = []; // No options needed for open-ended polls
        break;

      default:
        return res.status(400).json({ message: "Invalid poll type" });
    }

    // Create the poll in the database
    const newPoll = await Poll.create({
      question,
      type,
      options: processedOptions,
      creator: creatorId,
    });

    res.status(201).json({ message: "Poll created successfully.", newPoll });
  } catch (err) {
    res.status(500).json({
      message: "Error while creating poll",
      error: err.message,
    });
  }
};

export const getAllPolls = async (req, res) => {
  const { type, creatorId, page = 1, limit = 30 } = req.query;

  const filter = {};
  const userId = req.user._id;

  if (type) filter.type = type;
  if (creatorId) filter.creator = creatorId;

  try {
    // Calculate pagiantion parameters
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Fetch poll with pagination
    const polls = await Poll.find(filter)
      .populate("creator", "fullName username email profileImageUrl")
      .populate({
        path: "response.voterId",
        select: "username profileImageUrl, fullName",
      })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    // Add userHasVoted flag for each poll
    const updatedPolls = polls.map((poll) => {
      const userHasVoted = poll.voters.some((voterId) =>
        voterId.equals(userId)
      );
      return { ...poll.toObject(), userHasVoted };
    });

    // Get tottal count of polls for pagination metadata
    const totalPolls = await Poll.countDocuments(filter);

    const stats = await Poll.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $project: { type: "$_id", count: 1, _id: 0 } },
    ]);

    // Ensure all type are included in stats, even those with zero count
    const allTypes = [
      { type: "sing-choice", label: "Single Choice" },
      { type: "yes/no", label: "Yes/No" },
      { type: "rating", label: "Rating" },
      { type: "image-based", label: "Image Based" },
      { type: "open-ended", label: "Open Ended" },
    ];

    const statsWithDefaults = allTypes
      .map((pollType) => {
        const stat = stats.find((item) => item.type === pollType.type);
        return {
          label: pollType.label,
          type: pollType.type,
          count: stat ? stat.count : 0,
        };
      })
      .sort((a, b) => b.count - a.count);

    res.status(200).json({
      polls: updatedPolls,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalPolls / pageSize),
      totalPolls,
      stats: statsWithDefaults,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};

export const getVotedPolls = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};

export const getPollById = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};

export const voteOnPoll = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};

export const closePoll = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};

export const bookmarkPoll = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};

export const getBookmarkedPolls = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};

export const deletePoll = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      message: "Error getting all polls",
      error: err.message,
    });
  }
};
