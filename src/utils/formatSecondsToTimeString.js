export default (seconds) => {
  const minutesToShow = Math.floor(seconds / 60);
  const secondsToShow = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
  return `${minutesToShow}:${secondsToShow}`;
};
