export const getImageNameUrl = (url) => {
  if (!url) return "No Image Available";
  // Extract the file name from the URL
  const fileName = url.split("/").pop();
  return fileName;
};
