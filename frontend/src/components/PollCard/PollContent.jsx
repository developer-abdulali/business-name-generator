import ImageOptionInputTile from "../input/ImageOptionInputTile";
import OptionInputTile from "../input/OptionInputTile";
import Rating from "../input/Rating";

const PollContent = ({
  type,
  options,
  selectedOptionIndex,
  onOptionSelect,
  rating,
  onRatingChange,
  onResponseChange,
  userResponse,
}) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
      return (
        <>
          {options.map((option, index) => (
            <OptionInputTile
              key={option._id}
              isSelected={selectedOptionIndex === index}
              label={option.optionText || ""}
              onSelect={() => onOptionSelect(index)}
            />
          ))}
        </>
      );

    case "rating":
      return <Rating value={rating} onChange={onRatingChange} />;

    case "open-ended":
      return (
        <div className="-mt-3">
          <textarea
            rows={5}
            value={userResponse}
            placeholder="Your Response..."
            className="w-full text-[13px] text-black outline-none bg-slate-200/80 rounded-md p-2 mt-2"
            onChange={({ target }) => onResponseChange(target.value)}
          />
        </div>
      );

    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <ImageOptionInputTile
              key={option._id}
              isSelected={selectedOptionIndex === index}
              imgUrl={option.optionText || ""}
              onSelect={() => onOptionSelect(index)}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default PollContent;
