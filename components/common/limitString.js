export const limitString = (str, maxLength) => {
  if (!str || typeof str !== "string") return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};
