// Function to generate random gradients
export const generateRandomGradient = () => {
  const colors = [
    "#4F71EA",
    "#1AA1D1",
    "#DA6E7F",
    "#E8AD46",
    "#D56EEE",
    "#A8428A",
    "#B13671",
    "#2D72A4",
    "#28DC9A",
  ];
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  return `linear-gradient(107deg, ${color1} 40%, ${color2} 100%)`;
};
