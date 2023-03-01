export const getCurrentDate = (): string => {
  const [_, month, day, year] = new Date().toDateString().split(" ");
  return `${day} ${month}, ${year}`;
};
