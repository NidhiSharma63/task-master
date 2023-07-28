export const getCurrentDate = () => {
  const date = new Date().toString().substring(0, 10);
  return date;
};
