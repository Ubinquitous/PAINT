export const decodeToJson = (contents: string) => {
  const decodedContents = decodeURI(contents);
  const jsonTokenContents = decodedContents
    .replaceAll("%3A", ":")
    .replaceAll("%2C", ",");
  return JSON.parse(jsonTokenContents);
};
