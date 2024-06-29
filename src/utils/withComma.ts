const withComma = (num: number) => {
  if (isNaN(num)) return 0;
  const locale = navigator.language;
  return num.toLocaleString(locale);
};

export default withComma;
