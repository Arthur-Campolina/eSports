export function convertMinutesToHourString(minutesQuantity: number) {
  const hours = Math.floor(minutesQuantity / 60);
  const minutes = minutesQuantity % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}`;
}
