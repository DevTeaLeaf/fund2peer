const getGasPrice = async (provider) => {
  let gasPrice = await provider.getGasPrice();
  gasPrice = BigInt(String(gasPrice));
  gasPrice = gasPrice + (gasPrice * 1000n) / 10000n;
  return gasPrice;
};

export default getGasPrice;
