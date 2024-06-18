const flattenArray = (twoDimArray: any) => {
  return twoDimArray.reduce((acc: any, curr: any) => acc.concat(curr), []);
};

export default flattenArray;
