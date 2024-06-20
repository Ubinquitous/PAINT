const round = (number: number) => {
  const lastDigit = number % 10;
  if (lastDigit >= 5) {
    return Math.ceil(number / 10) * 10;
  } else {
    return Math.floor(number / 10) * 10;
  }
};

export default round;
