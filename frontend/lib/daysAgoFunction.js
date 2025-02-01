const daysAgoFunction = (dbTime) => {
  if (!dbTime) return NaN;
  const createdAt = new Date(dbTime);
  const currentTime = new Date();
  const diffTime = currentTime - createdAt;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Fixed time calculation
};

export default daysAgoFunction;
