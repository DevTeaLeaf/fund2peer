const copyText = (text) => {
  navigator.clipboard.writeText(text);

  /*.then(() => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  })
  .catch((error) => {
  });*/
};

export default copyText;
