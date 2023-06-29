const timeDifference = (unix) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const targetTime = unix;

  const differenceInSeconds = targetTime - currentTime;

  const days = Math.floor(differenceInSeconds / (60 * 60 * 24));
  const hours = Math.floor((differenceInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((differenceInSeconds % (60 * 60)) / 60);
  //const seconds = differenceInSeconds % 60;

  return { days: days, hours: hours, minutes: minutes };
};
export default timeDifference;
