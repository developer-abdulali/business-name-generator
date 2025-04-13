const Loading = ({ loadingText = "" }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="loader w-20 h-20 relative" />
        {loadingText && <p className="text-lg font-medium">{loadingText}</p>}
      </div>
    </div>
  );
};

export default Loading;
