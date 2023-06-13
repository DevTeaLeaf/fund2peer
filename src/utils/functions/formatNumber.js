const formatNumber = (number) => {
  const roundedNumber = Math.round(number * 1000) / 1000;

  const formattedNumber = roundedNumber.toLocaleString();

  return formattedNumber;
};
export default formatNumber;
