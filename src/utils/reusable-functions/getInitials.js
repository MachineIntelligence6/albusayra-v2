export const getInitials = (fullName) => {
  if (!fullName) return ""; // Handle empty or undefined names

  const nameParts = fullName.trim().split(" ");
  const firstInitial = nameParts[0]?.[0]?.toUpperCase() || ""; // First name initial
  const lastInitial = nameParts[1]?.[0]?.toUpperCase() || ""; // Last name initial

  return `${firstInitial}${lastInitial}`;
};
