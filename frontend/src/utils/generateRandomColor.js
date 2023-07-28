const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateBackgroundColors = (data) => {
  const colors = [];
  for (let i = 0; i < data?.length; i++) {
    colors.push(generateRandomColor());
  }
  return colors;
};
