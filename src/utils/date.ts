export function getCurrentDate() {
  const date = new Date();

  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  return {
    currentDay,
    currentMonth,
    currentYear,
  };
}
