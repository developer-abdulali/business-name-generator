import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import { POLL_TYPE } from "../../utils/data";
import OptionInput from "../../components/input/OptionInput";
import OptionImageSelector from "../../components/input/OptionImageSelector";

const CreatePoll = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],
    error: "",
  });

  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Create poll function
  const handleCreatePoll = async () => {
    const { question, type, options, imageOptions, error } = pollData;

    if (!question || !type) {
      console.log("CREATE:", { question, type, options, error });
      handleValueChange("error", "Question & Type are required!");
      return;
    }

    if (type === "single-choice" && options.length < 2) {
      handleValueChange("error", "Enter at least two options!");
      return;
    }

    if (type === "image-based" && imageOptions.length < 2) {
      handleValueChange("error", "Enter at least two image options!");
      return;
    }

    handleValueChange("error", "");
    console.log("NO_ERR", { pollData });
  };

  return (
    <DashboardLayout activeMenu="Create Poll">
      <div className="bg-gray-100/80 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Create Poll</h2>

        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600 uppercase">
            question
          </label>

          <textarea
            placeholder="What's in your mind"
            rows={4}
            value={pollData.question} // Corrected from 'questions' to 'question'
            onChange={
              ({ target }) => handleValueChange("question", target.value) // Corrected from 'questions' to 'question'
            }
            className="w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2"
          />
        </div>

        <div className="mt-3">
          <label className="text-xs font-medium text-slate-600 uppercase">
            poll type
          </label>

          <div className="flex gap-4 flex-wrap mt-3">
            {POLL_TYPE?.map((item) => (
              <div
                key={item.value}
                className={`option-chip ${
                  pollData.type === item.value
                    ? "text-white bg-primary border-primary"
                    : "border-sky-100"
                }`}
                onClick={() => {
                  handleValueChange("type", item.value);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {pollData.type === "single-choice" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600 uppercase">
              options
            </label>

            <div className="mt-3">
              <OptionInput
                optionList={pollData.options}
                setOptionList={(value) => {
                  handleValueChange("options", value);
                }}
              />
            </div>
          </div>
        )}

        {pollData.type === "image-based" && (
          <div className="mt-5">
            <label className="text-xs font-medium text-slate-600 uppercase">
              image options
            </label>

            <div className="mt-3">
              <OptionImageSelector
                imageList={pollData.imageOptions}
                setImageList={(value) => {
                  handleValueChange("imageOptions", value);
                }}
              />
            </div>
          </div>
        )}

        {pollData.error && (
          <p className="text-xs font-medium text-red-500 mt-5">
            {pollData.error}
          </p>
        )}

        <button
          onClick={handleCreatePoll}
          className="btn-primary py-2 mt-6 uppercase"
        >
          create
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
