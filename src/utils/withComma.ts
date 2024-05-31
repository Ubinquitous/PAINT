const withComma = (num: number) => {
  const locale = navigator.language;
  return num.toLocaleString(locale);
};

export default withComma;
